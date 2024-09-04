import { getBanner, getAllHomeCategory, getDetailMovie } from "@/service"
import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export interface storeState {
  isLoading: boolean
  data: {
    banner: null | any
    category: any[]
    detail: null | any
  }
}

// tao store => store : call api
// tao store => store : call luu data

const initialState: storeState = {
  isLoading: true,
  data: {
    banner: null,
    category: [],
    detail: null,
  },
}

export const storeSlice = createSlice({
  name: "storeApi",
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearDataCategory: (state, action: PayloadAction<[]>) => {
      // state.data.banner = null;
      // state.data.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBanner.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.data.banner = action.payload
    })
    builder.addCase(getBanner.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getAllHomeCategory.fulfilled, (state, action) => {
      state.data.category = action.payload
      state.isLoading = false
    })
    //details
    builder.addCase(getDetailMovie.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getDetailMovie.fulfilled, (state, action) => {
      state.data.detail = action.payload
      state.isLoading = false
    })
  },
})

// Action creators are generated for each case reducer function
export const { clearDataCategory, setIsLoading } = storeSlice.actions

export default storeSlice.reducer
