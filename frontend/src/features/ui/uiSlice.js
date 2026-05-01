import { createSlice } from '@reduxjs/toolkit';
import { getStorageItem, setStorageItem } from '../../services/storage';

const THEME_KEY = 'themePreference';

const initialState = {
	themeMode: getStorageItem(THEME_KEY, 'light', 'localStorage'),
	isLoading: false,
	notifications: [],
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setThemeMode: (state, action) => {
			state.themeMode = action.payload || 'light';
			setStorageItem(THEME_KEY, state.themeMode, 'localStorage');
		},
		toggleThemeMode: (state) => {
			state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
			setStorageItem(THEME_KEY, state.themeMode, 'localStorage');
		},
		setUiLoading: (state, action) => {
			state.isLoading = Boolean(action.payload);
		},
		pushNotification: (state, action) => {
			const notification = action.payload;

			if (!notification) {
				return;
			}

			state.notifications = [...state.notifications, notification];
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter((item) => item?.id !== action.payload);
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const { setThemeMode, toggleThemeMode, setUiLoading, pushNotification, removeNotification, clearNotifications } = uiSlice.actions;
export default uiSlice.reducer;
