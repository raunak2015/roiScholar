import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedDegree: '',
	selectedCountry: '',
	expectedSalary: 0,
	projectedSalary: 0,
	stayBackYears: 0,
	breakEvenYears: 0,
	netGain: 0,
};

const roiSlice = createSlice({
	name: 'roi',
	initialState,
	reducers: {
		setRoiInputs: (state, action) => {
			const { selectedDegree, selectedCountry, expectedSalary, stayBackYears } = action.payload || {};
			state.selectedDegree = selectedDegree || state.selectedDegree;
			state.selectedCountry = selectedCountry || state.selectedCountry;
			state.expectedSalary = Number(expectedSalary) || 0;
			state.stayBackYears = Number(stayBackYears) || 0;
		},
		setRoiResults: (state, action) => {
			const { projectedSalary = 0, breakEvenYears = 0, netGain = 0 } = action.payload || {};
			state.projectedSalary = Number(projectedSalary) || 0;
			state.breakEvenYears = Number(breakEvenYears) || 0;
			state.netGain = Number(netGain) || 0;
		},
		resetRoiState: () => initialState,
	},
});

export const { setRoiInputs, setRoiResults, resetRoiState } = roiSlice.actions;
export default roiSlice.reducer;
