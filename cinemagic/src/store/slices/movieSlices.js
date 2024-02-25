import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counterSLice',
    initialState:{
        selectedSeats:[],
    },
    reducers:{
        addselectedSeats: (state, action)=>{
            state.selectedSeats = action.payload
        }
    }
})
export default counterSlice.reducer;
export const {addselectedSeats} = counterSlice.actions
export const getSelectedSeat = (state)=>(state.selectedSeats)