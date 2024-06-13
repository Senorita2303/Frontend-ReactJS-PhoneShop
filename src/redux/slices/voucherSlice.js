import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    vouchers: [],
    voucher: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allVoucherSuccess(state, action) {
            state.isLoading = false;
            state.vouchers = action.payload.vouchers;
            state.voucher = {}
        },
        voucherDetailSuccess(state, action) {
            state.isLoading = false;
            state.voucher = action.payload.voucher;
            state.error = action.payload.errMessage;
        },
        newVoucherSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.voucher = action.payload.voucher;
        },
        updateVoucherSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.voucher = action.payload.voucher;
        },
        deleteVoucherSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        voucherDetailReset(state) {
            state.success = false;
        },
        updateVoucherReset(state) {
            state.isUpdated = false;
        },
        deleteVoucherReset(state) {
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
// Get all vouchers
export const getAllVouchers = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/voucher/admin/vouchers");
        dispatch(slice.actions.allVoucherSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get vouchers details
export const getVoucherDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/voucher/${id}`);
        dispatch(slice.actions.voucherDetailSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create voucher
export const createVoucher = (voucherData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/voucher/admin/new`,
            voucherData,
            config
        );
        dispatch(slice.actions.newVoucherSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete voucher
export const deleteVoucher = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/voucher/admin/${id}`);
        dispatch(slice.actions.deleteVoucherSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update voucher
export const updateVoucher = (id, voucherData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/voucher/admin/${id}`,
            voucherData,
            config
        );
        dispatch(slice.actions.updateVoucherSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateVoucherReset = () => async (dispatch) => {
    dispatch(slice.actions.updateVoucherReset());
};

export const deleteVoucherReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteVoucherReset());
};

export const newVoucherReset = () => async (dispatch) => {
    dispatch(slice.actions.voucherDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
