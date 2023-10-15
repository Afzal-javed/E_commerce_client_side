// productSlice.js
// productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
    productList: [],
    cartItem: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        },
        addCartItem: (state, action) => {
            const check = state.cartItem.some((el) => el.id === action.payload.id);
            if (check) {
                toast("Item already added in cart");
            } else {
                toast("Item added to cart successfully");
                const totalValue = action.payload.price
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, totalValue: totalValue }]
                console.log(state.cartItem);
            }
        },
        deleteCartItem: (state, action) => {
            toast("Item Deleted");
            const index = state.cartItem.findIndex((el) => el.id === action.payload);
            state.cartItem.splice(index, 1);
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el.id === action.payload);
            let qty = state.cartItem[index].qty
            toast("Item added")
            const totalQty = ++qty
            state.cartItem[index].qty = totalQty;
            const price = state.cartItem[index].price;
            const totalPrice = price * totalQty;
            state.cartItem[index].totalValue = totalPrice;
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el.id === action.payload);
            let qty = state.cartItem[index].qty
            if (qty > 1) {
                toast("Item removed")
                const totalQty = --qty
                state.cartItem[index].qty = totalQty;
                state.cartItem[index].qty = totalQty;
                const price = state.cartItem[index].price;
                const totalPrice = price * totalQty;
                state.cartItem[index].totalValue = totalPrice;
            } else {
                toast('Only one item leftover')
            }
        },
        searchProduct: (state, action) => {
            console.log(action.payload);

        }
    }
});

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty, searchProduct } = productSlice.actions;

// Named export for the reducer
export const productSliceReducer = productSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     productList: []
// }

// export const productSlice = createSlice({
//     name: "product",
//     initialState,
//     reducers: {
//         setDataProduct: (state, action) => {

//             state.productList = [...action.payload]
//         }
//     }
// })
// export const { setDataProduct } = productSlice.actions

// export default productSlice.reducer