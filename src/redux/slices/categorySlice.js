import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    categories: [],
    category: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allCategorySuccess(state, action) {
            state.isLoading = false;
            state.categories = action.payload.categories;
        },
        adminCategorySuccess(state, action) {
            state.isLoading = false;
            state.categories = action.payload;
            state.category = {};
        },
        categoryDetailSuccess(state, action) {
            state.isLoading = false;
            state.category = action.payload.category;
            state.error = action.payload.errMessage;
        },
        newCategorySuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.category = action.payload.category;
        },
        updateCategorySuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.category = action.payload.category;
        },
        deleteCategorySuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
            state.category = {};
        },
        categoryDetailReset(state) {
            state.success = false;
        },
        updateCategoryReset(state) {
            state.isUpdated = false;
        },
        deleteCategoryReset(state) {
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
// Get all categories
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/category/admin/categories");
        dispatch(slice.actions.allCategorySuccess(data.categories));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get categories details
export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/category/category/${id}`);
        dispatch(slice.actions.categoryDetailSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Admin category request 
export const getAdminCategories = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/category/admin/categories");
        dispatch(slice.actions.adminCategorySuccess(data.categories));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create category
export const createCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.post(
            `/api/category/admin/category/new`,
            categoryData,
            config
        );
        dispatch(slice.actions.newCategorySuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/category/admin/category/${id}`);
        dispatch(slice.actions.deleteCategorySuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update category
export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.put(
            `/api/category/admin/category/${id}`,
            categoryData,
            config
        );
        dispatch(slice.actions.updateCategorySuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const newCategoryReset = () => async (dispatch) => {
    dispatch(slice.actions.categoryDetailReset());
};

export const updateCategoryReset = () => async (dispatch) => {
    dispatch(slice.actions.updateCategoryReset());
};


export const deleteCategoryReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteCategoryReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
