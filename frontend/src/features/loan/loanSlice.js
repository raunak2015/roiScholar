import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getStorageItem, setStorageItem, removeStorageItem } from '../../services/storage';

const SAVED_LOANS_KEY = 'savedLoans';

export const persistLoanScenario = createAsyncThunk(
	'loan/persistLoanScenario',
	async (scenarioData, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/scenarios', scenarioData);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || 'Failed to persist scenario');
		}
	}
);

const initialState = {
	// ... (initialState unchanged)
	principal: 0,
	annualInterestRate: 0,
	termInMonths: 60,
	monthlyPayment: 0,
	totalInterest: 0,
	totalRepayment: 0,
	amortizationSchedule: [],
	savedScenarios: getStorageItem(SAVED_LOANS_KEY, [], 'localStorage'),
};

const loanSlice = createSlice({
	name: 'loan',
	initialState,
	reducers: {
		setLoanInputs: (state, action) => {
			const { principal, annualInterestRate, termInMonths } = action.payload || {};
			state.principal = Number(principal) || 0;
			state.annualInterestRate = Number(annualInterestRate) || 0;
			state.termInMonths = Number(termInMonths) || state.termInMonths;
		},
		setLoanResults: (state, action) => {
			const { monthlyPayment = 0, totalInterest = 0, totalRepayment = 0, amortizationSchedule = [] } = action.payload || {};
			state.monthlyPayment = Number(monthlyPayment) || 0;
			state.totalInterest = Number(totalInterest) || 0;
			state.totalRepayment = Number(totalRepayment) || 0;
			state.amortizationSchedule = Array.isArray(amortizationSchedule) ? amortizationSchedule : [];
		},
		saveLoanScenario: (state, action) => {
			const scenario = action.payload;

			if (!scenario) {
				return;
			}

			state.savedScenarios = [...state.savedScenarios, scenario];
			setStorageItem(SAVED_LOANS_KEY, state.savedScenarios, 'localStorage');
		},
		removeLoanScenario: (state, action) => {
			state.savedScenarios = state.savedScenarios.filter((scenario) => scenario?.id !== action.payload);
			setStorageItem(SAVED_LOANS_KEY, state.savedScenarios, 'localStorage');
		},
		clearLoanScenarios: (state) => {
			state.savedScenarios = [];
			removeStorageItem(SAVED_LOANS_KEY, 'localStorage');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(persistLoanScenario.fulfilled, (state, action) => {
				state.savedScenarios = [...state.savedScenarios, action.payload];
				setStorageItem(SAVED_LOANS_KEY, state.savedScenarios, 'localStorage');
			});
	},
});

export const { setLoanInputs, setLoanResults, saveLoanScenario, removeLoanScenario, clearLoanScenarios } = loanSlice.actions;
export default loanSlice.reducer;
