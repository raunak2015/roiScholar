import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/ui/uiSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.themeMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2.5 rounded-2xl bg-surface-container-high border border-outline-variant/10 shadow-sm hover:bg-primary/10 hover:text-primary transition-all active:scale-90 flex items-center justify-center group"
      title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="material-symbols-outlined text-2xl transition-transform group-hover:rotate-12">
        {themeMode === 'light' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  );
}
