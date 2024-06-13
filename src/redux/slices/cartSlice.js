import { createSlice } from "@reduxjs/toolkit";
import axios from "../../common";

const calculateFee = (allItems) => {
    let saveMoney = 0;
    let subTotal = 0;
    const discount = 0;
    const shipping = 0;
    allItems
        .forEach((item) => {
            subTotal += parseInt(item.productVariant.price) * parseInt(item.quantity);
            saveMoney += (item.productVariant.marketPrice - item.productVariant.price) * item.quantity;
        });

    saveMoney += discount;

    return { subTotal, saveMoney, discount, shipping, total: subTotal - discount + shipping };
};

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
    allItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    selectedItems: [],
    itemsCount: 0,
    fee: {
        subTotal: 0,
        saveMoney: 0,
        discount: 0,
        shipping: 0,
        total: 0
    },
    voucherApplied: {},
}
const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        addToCart(state, action) {
            state.allItems = action.payload.cart
            state.itemsCount = state.allItems.length;
            state.isLoading = false;
            state.error = null;
            state.fee = calculateFee(state.allItems);
            localStorage.setItem('cart', JSON.stringify(state.allItems));
        },
        removeCartItem(state, action) {
            const { cartId } = action.payload;
            state.allItems = state.allItems.filter((item) => item.id !== parseInt(cartId));
            state.itemsCount = state.allItems.length;
            state.isLoading = false;
            state.error = null;
            state.fee = calculateFee(state.allItems);
            localStorage.setItem('cart', JSON.stringify(state.allItems));
        },
        updateItem(state, action) {
            const { cartId, quantity } = action.payload;
            const updateIndex = state.allItems.findIndex((item) => item.id === cartId);
            state.allItems[updateIndex].quantity = quantity;
            state.isLoading = false;
            state.error = null;
            state.fee = calculateFee(state.allItems);
            localStorage.setItem('cart', JSON.stringify(state.allItems));
        },
        getAllItems(state) {
            state.fee = calculateFee(state.allItems);
        },
        applyVoucher(state, action) {
            state.fee.discount = action.payload.voucher.voucherValue;
            state.fee.total = state.fee.subTotal - action.payload.voucher.voucherValue;
            state.error = action.payload.errMessage;
            state.voucherApplied = action.payload.voucher;
        },
        hasError(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearErrors(state) {
            state.error = null;
        },
        cleanCart(state) {
            state.allItems = [];
            state.fee = calculateFee([]);
            window.localStorage.removeItem('cart');
        }
    }
});

// Reducer
export default slice.reducer;
export const { cleanCart } = slice.actions;
// Add to Cart
export const addItemToCart = (item) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/carts/add`,
            item,
            config
        );
        dispatch(slice.actions.addToCart(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response));
    }
};

// Remove item from Cart
export const removeItemFromCart = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/carts/${id}`);
        dispatch(slice.actions.removeCartItem(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response));
    }
};

export const increaseItemQuantity = (item) => async (dispatch) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.patch(
            `/api/carts/update`,
            { ...item, delta: 1 },
            config
        );
        if (data) {
            dispatch(slice.actions.updateItem({ ...item, quantity: item.quantity + 1 }));
        }
    } catch (error) {
        dispatch(dispatch(slice.actions.hasError(error.response)));
    }
};

export const decreaseItemQuantity = (item) => async (dispatch) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.patch(
            `/api/carts/update`,
            { ...item, delta: -1 },
            config
        );
        if (data) {
            dispatch(slice.actions.updateItem({ ...item, quantity: item.quantity - 1 }));
        }
    } catch (error) {
        dispatch(dispatch(slice.actions.hasError(error.response)));
    }
};

export const applyVoucher = (item) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.get(`/api/voucher/apply/${item}`);
        dispatch(slice.actions.applyVoucher(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response));
    }
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};

export const getAllItems = () => async (dispatch) => {
    dispatch(slice.actions.getAllItems());
}
