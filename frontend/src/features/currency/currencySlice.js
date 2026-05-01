import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLatestRates } from '../../services/currencyService';

export const getLatestRates = createAsyncThunk(
  'currency/getLatestRates',
  async (baseCurrency) => {
    const data = await fetchLatestRates(baseCurrency);
    return data;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: 'USD',
    targetCurrency: 'INR',
    rates: {
      USD: 1,
      INR: 83.5,
    },
    lastUpdate: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setTargetCurrency: (state, action) => {
      state.targetCurrency = action.payload;
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLatestRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLatestRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload.rates;
        state.lastUpdate = action.payload.lastUpdate;
      })
      .addCase(getLatestRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setTargetCurrency, setBaseCurrency } = currencySlice.actions;

export default currencySlice.reducer;
