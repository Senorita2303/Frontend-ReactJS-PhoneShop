import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: true,
    error: null,
    specifications: [],
    specification: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'specification',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allSpecificationSuccess(state, action) {
            state.isLoading = false;
            state.specifications = action.payload.specifications;
            state.specification = {};
        },
        specificationDetailSuccess(state, action) {
            state.isLoading = false;
            state.specification = action.payload;
        },
        newSpecificationSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.specification = action.payload.specification;
        },
        updateSpecificationSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.specification = action.payload.specification;
        },
        deleteSpecificationSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        specificationDetailReset(state) {
            state.success = false;
        },
        updateSpecificationReset(state) {
            state.isUpdated = false;
        },
        deleteSpecificationReset(state) {
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
// Get all specifications
export const getAllSpecifications = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/specification/admin/specifications");
        dispatch(slice.actions.allSpecificationSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get specifications details
export const getSpecificationDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/specification/specification/${id}`);
        dispatch(slice.actions.specificationDetailSuccess(data.specification));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create specification
export const createSpecification = (specificationData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/specification/admin/specification/new`,
            specificationData,
            config
        );
        console.log(data);
        dispatch(slice.actions.newSpecificationSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete specification
export const deleteSpecification = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/specification/admin/specification/${id}`);
        dispatch(slice.actions.deleteSpecificationSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update specification
export const updateSpecification = (id, specificationData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/specification/admin/specification/${id}`,
            specificationData,
            config
        );
        dispatch(slice.actions.updateSpecificationSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateSpecificationReset = () => async (dispatch) => {
    dispatch(slice.actions.updateSpecificationReset());
};

export const deleteSpecificationReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteSpecificationReset());
};

export const newSpecificationReset = () => async (dispatch) => {
    dispatch(slice.actions.specificationDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
