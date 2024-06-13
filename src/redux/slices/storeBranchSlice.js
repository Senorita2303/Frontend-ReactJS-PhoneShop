import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    storeBranches: [],
    storeBranch: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'storeBranch',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allStoreBranchSuccess(state, action) {
            state.isLoading = false;
            state.storeBranches = action.payload.storeBranches;
            state.storeBranch = {}
        },
        storeBranchDetailSuccess(state, action) {
            state.isLoading = false;
            state.storeBranch = action.payload;
        },
        newStoreBranchSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.storeBranch = action.payload.storeBranch;
        },
        updateStoreBranchSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.storeBranch = action.payload.storeBranch;
        },
        deleteStoreBranchSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        storeBranchDetailReset(state) {
            state.success = false;
        },
        updateStoreBranchReset(state) {
            state.isUpdated = false;
        },
        deleteStoreBranchReset(state) {
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
// Get all store branches
export const getAllStoreBranches = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/storeBranch/admin/storeBranches");
        dispatch(slice.actions.allStoreBranchSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get store branches details
export const getStoreBranchDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/storeBranch/admin/${id}`);
        dispatch(slice.actions.storeBranchDetailSuccess(data.storeBranch));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create store branch
export const createStoreBranch = (storeBranchData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/storeBranch/admin/new`,
            storeBranchData,
            config
        );
        dispatch(slice.actions.newStoreBranchSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete store branch
export const deleteStoreBranch = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/storeBranch/admin/${id}`);
        dispatch(slice.actions.deleteStoreBranchSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update store branch
export const updateStoreBranch = (id, storeBranchData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/storeBranch/admin/${id}`,
            storeBranchData,
            config
        );
        dispatch(slice.actions.updateStoreBranchSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateStoreBranchReset = () => async (dispatch) => {
    dispatch(slice.actions.updateStoreBranchReset());
};

export const deleteStoreBranchReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteStoreBranchReset());
};

export const newStoreBranchReset = () => async (dispatch) => {
    dispatch(slice.actions.storeBranchDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
