import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface storeAction {
  isPlay: boolean
  //   data: null | string[] | number[] | any[];
}

const initialState: storeAction = {
  isPlay: false
};

export const storeSlice = createSlice({
  name: 'storeAction',
  initialState,
  reducers: {
    // increment: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // decrement: (state, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    togglePlayVideo : (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { togglePlayVideo } = storeSlice.actions;

export default storeSlice.reducer;
