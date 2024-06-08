import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    colors: [],
    color: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allColorSuccess(state, action) {
            state.isLoading = false;
            state.colors = action.payload.colors;
            state.color = {}
        },
        colorDetailSuccess(state, action) {
            state.isLoading = false;
            state.color = action.payload;
        },
        newColorSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.color = action.payload.color;
        },
        updateColorSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.color = action.payload.color;
        },
        deleteColorSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        colorDetailReset(state) {
            state.success = false;
        },
        updateColorReset(state) {
            state.isUpdated = false;
        },
        deleteColorReset(state) {
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
// Get all colors
export const getAllColors = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/color/admin/colors");
        dispatch(slice.actions.allColorSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get colors details
export const getColorDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/color/color/${id}`);
        dispatch(slice.actions.colorDetailSuccess(data.color));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create color
export const createColor = (colorData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/color/admin/color/new`,
            colorData,
            config
        );
        dispatch(slice.actions.newColorSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete color
export const deleteColor = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/color/admin/color/${id}`);
        dispatch(slice.actions.deleteColorSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update color
export const updateColor = (id, colorData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/color/admin/color/${id}`,
            colorData,
            config
        );
        dispatch(slice.actions.updateColorSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateColorReset = () => async (dispatch) => {
    dispatch(slice.actions.updateColorReset());
};

export const deleteColorReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteColorReset());
};

export const newColorReset = () => async (dispatch) => {
    dispatch(slice.actions.colorDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
