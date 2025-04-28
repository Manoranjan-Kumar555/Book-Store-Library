import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        clearCart(state) {
            return []; // 🧹 Clear all cart items
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
