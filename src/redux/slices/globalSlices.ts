import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
    isLoading: boolean;
    error: boolean;
}

/* 
    Default state object with initial values
*/
const initialState: GlobalState = {
  isLoading: false,
  error: false,
} as const;

/* 
    Create a slice as a reducer containing actions
*/
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isLoading>
    ) => {
      state.isLoading = action.payload;
    },
    setError: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.error>
    ) => {
      state.error = action.payload;
    },
  },
});

export const getGlobalState = (state: { global: GlobalState }) => state.global;

export const { setIsLoading, setError } = globalSlice.actions;

export default globalSlice.reducer;