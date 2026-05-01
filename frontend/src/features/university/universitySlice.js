import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	universities: [],
	selectedUniversities: [],
	filters: {
		country: '',
		degree: '',
		maxTuition: '',
	},
};

const universitySlice = createSlice({
	name: 'university',
	initialState,
	reducers: {
		setUniversities: (state, action) => {
			state.universities = Array.isArray(action.payload) ? action.payload : [];
		},
		setSelectedUniversities: (state, action) => {
			state.selectedUniversities = Array.isArray(action.payload) ? action.payload : [];
		},
		updateUniversityFilters: (state, action) => {
			state.filters = {
				...state.filters,
				...(action.payload || {}),
			};
		},
		clearUniversitySelection: (state) => {
			state.selectedUniversities = [];
		},
	},
});

export const { setUniversities, setSelectedUniversities, updateUniversityFilters, clearUniversitySelection } = universitySlice.actions;
export default universitySlice.reducer;
