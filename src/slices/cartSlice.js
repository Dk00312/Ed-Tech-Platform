import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
}

const cartSlice = createSlice({
    name:"cartSlice",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        addToCart(state, value){
            state.totalItems++;
        },
        removeFromCart(state,value){
            state.totalItems--;
        },
        resetCart(state, value){
            state.totalItems = 0
        }
    }

})

export const {setTotalItems, addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;