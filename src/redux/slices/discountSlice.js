import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    discounts: [],
    discount: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allDiscountSuccess(state, action) {
            state.isLoading = false;
            state.discounts = action.payload.discounts;
            state.discount = {}
        },
        discountDetailSuccess(state, action) {
            state.isLoading = false;
            state.discount = action.payload.discount;
            state.error = action.payload.errMessage;
        },
        newDiscountSuccess(state, action) {
            state.isLoading = false;
            state.discount = action.payload.data;
            state.error = action.payload.message;
            state.success = action.payload.success;
        },
        updateDiscountSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.discount = action.payload.discount;
        },
        deleteDiscountSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        discountDetailReset(state) {
            state.success = false;
        },
        updateDiscountReset(state) {
            state.isUpdated = false;
        },
        deleteDiscountReset(state) {
            state.isDeleted = false;
        },
        hasError(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearErrors(state) {
            state.error = null;
        }
    }
});

// Reducer
export default slice.reducer;
// Get all discounts
export const getAllDiscounts = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/discount/admin/discounts");
        dispatch(slice.actions.allDiscountSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get discounts details
export const getDiscountDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/discount/${id}`);
        dispatch(slice.actions.discountDetailSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create discount
export const createDiscount = (discountData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/discount/admin/new`,
            discountData,
            config
        );
        dispatch(slice.actions.newDiscountSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete discount
export const deleteDiscount = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/discount/admin/${id}`);
        dispatch(slice.actions.deleteDiscountSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update discount
export const updateDiscount = (id, discountData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/discount/admin/${id}`,
            discountData,
            config
        );
        dispatch(slice.actions.updateDiscountSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateDiscountReset = () => async (dispatch) => {
    dispatch(slice.actions.updateDiscountReset());
};

export const deleteDiscountReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteDiscountReset());
};

export const newDiscountReset = () => async (dispatch) => {
    dispatch(slice.actions.discountDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
