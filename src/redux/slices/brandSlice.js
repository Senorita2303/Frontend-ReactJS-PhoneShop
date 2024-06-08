import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: true,
    error: null,
    brands: [],
    brand: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allBrandSuccess(state, action) {
            state.isLoading = false;
            state.brands = action.payload.brands;
            state.brand = {};
        },
        adminBrandSuccess(state, action) {
            state.isLoading = false;
            state.brands = action.payload;
            state.brand = {};
        },
        brandDetailSuccess(state, action) {
            state.isLoading = false;
            state.brand = action.payload.brand;
            state.error = action.payload.errMessage;
        },
        newBrandSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.brand = action.payload.brand;
        },
        updateBrandSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.brand = action.payload.brand;
        },
        deleteBrandSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        brandDetailReset(state) {
            state.success = false;
        },
        updateBrandReset(state) {
            state.isUpdated = false;
        },
        deleteBrandReset(state) {
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
// Get all brands
export const getAllBrands = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/brand/admin/brands");
        dispatch(slice.actions.allBrandSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get brands details
export const getBrandDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/brand/brand/${id}`);
        dispatch(slice.actions.brandDetailSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Admin brand request 
export const getAdminBrands = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/brand/admin/brands");
        dispatch(slice.actions.adminBrandSuccess(data.brands));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create brand
export const createBrand = (brandData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.post(
            `/api/brand/admin/brand/new`,
            brandData,
            config
        );
        dispatch(slice.actions.newBrandSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete brand
export const deleteBrand = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/brand/admin/brand/${id}`);
        dispatch(slice.actions.deleteBrandSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update brand
export const updateBrand = (id, brandData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.put(
            `/api/brand/admin/brand/${id}`,
            brandData,
            config
        );
        dispatch(slice.actions.updateBrandSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateBrandReset = () => async (dispatch) => {
    dispatch(slice.actions.updateBrandReset());
};

export const deleteBrandReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteBrandReset());
};

export const newBrandReset = () => async (dispatch) => {
    dispatch(slice.actions.brandDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
