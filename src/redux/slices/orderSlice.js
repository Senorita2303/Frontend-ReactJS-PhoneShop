import { createSlice } from "@reduxjs/toolkit";
import axios from "../../common";
import { cleanCart } from './cartSlice';
const initialState = {
    orders: [],
    order: {},
    isLoading: false,
    orderCreated: null,
    error: null,
    isUpdated: false,
    isDeleted: false,
    activeStep: 0,
    orderInfo: {},
    fee: {
        subTotal: 0,
        saveMoney: 0,
        discount: 0,
        shipping: 0,
        total: 0
    },
    discountApplied: {}
}
const calculateShippingFee = (orderInfo, currentFee) => {
    let shipping;
    if (currentFee.subTotal > 500000 || orderInfo?.isReceiveAtStore) {
        shipping = 0;
    } else {
        shipping = 30000;
    }
    const total = currentFee.subTotal + shipping - currentFee.discount;
    return { ...currentFee, total, shipping };
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        createOrderSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.orderCreated = action.payload;
            // state.order = action.payload;
        },
        myOrdersSuccess(state, action) {
            state.isLoading = false;
            state.orders = action.payload;
        },
        allOrdersSuccess(state, action) {
            state.isLoading = false;
            state.orders = action.payload;
        },
        updateOrderSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload;
        },
        deleteOrderSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        orderDetailsSuccess(state, action) {
            state.isLoading = false;
            state.order = action.payload;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateOrderReset(state) {
            state.isUpdated = false;
        },
        deleteOrderReset(state) {
            state.isDeleted = false;
        },
        clearErrors(state) {
            state.error = null;
        },
        setOrderInfo(state, action) {
            state.orderInfo = action.payload;
            state.fee = calculateShippingFee(action.payload, state.fee);
        },
        setAppliedDiscount(state, action) {
            state.fee = {
                ...state.fee,
                total: state.fee.subTotal + state.fee.shipping - action.payload.amount,
                discount: action.payload.amount
            };
            state.discountApplied = action.payload.info;
        },
        backStepOrder(state) {
            state.activeStep -= 1;
        },
        nextStepOrder(state) {
            state.activeStep += 1;
        },
        updateFee(state, action) {
            state.fee = { ...action.payload };
        },
    }
});

// Reducer
export default slice.reducer;
export const { setOrderInfo, backStepOrder, nextStepOrder, setAppliedDiscount } = slice.actions;

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(slice.actions.startLoading());

        const { orderInfo } = getState().order;
        const { allItems, fee: { subTotal, discount, shipping, total }, voucherApplied } = getState().cart;
        order.append("orderInfo", JSON.stringify(orderInfo));
        order.append("allItems", JSON.stringify(allItems));
        order.append("voucherApplied", JSON.stringify(voucherApplied));
        order.append("total", total);
        order.append("subTotal", subTotal);
        order.append("discount", discount);
        order.append("shipping", shipping);
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/orders/create", order, config);
        console.log(data);
        dispatch(slice.actions.createOrderSuccess(data));
        dispatch(cleanCart());
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Get all orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/orders/myOrders");
        dispatch(slice.actions.myOrdersSuccess(data.userOrders));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Get single order
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch(slice.actions.orderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Get single admin order
export const getAdminOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/orders/admin/order/${id}`);
        dispatch(slice.actions.orderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/orders/admin/orders`);
        dispatch(slice.actions.allOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};


// Delete order admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/orders/admin/order/${id}`);
        dispatch(slice.actions.deleteOrderSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Update order admin (Update status)
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            `/api/orders/admin/order/${id}`,
            orderData,
            config
        );
        dispatch(slice.actions.updateOrderSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const deleteReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteOrderReset());
};

export const updateReset = () => async (dispatch) => {
    dispatch(slice.actions.updateOrderReset());
};

// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};

export const updateFeeFromCart = () => async (dispatch, getState) => {
    const { fee } = getState().cart;
    dispatch(slice.actions.updateFee(fee));
};
