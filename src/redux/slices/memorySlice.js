import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    memories: [],
    memory: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
};

const slice = createSlice({
    name: 'memory',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allMemorySuccess(state, action) {
            state.isLoading = false;
            state.memories = action.payload.memories;
            state.memory = {};
        },
        memoryDetailSuccess(state, action) {
            state.isLoading = false;
            state.memory = action.payload;
        },
        newMemorySuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.memory = action.payload.memory;
        },
        updateMemorySuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.memory = action.payload.memory;
        },
        deleteMemorySuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        memoryDetailReset(state) {
            state.success = false;
        },
        updateMemoryReset(state) {
            state.isUpdated = false;
        },
        deleteMemoryReset(state) {
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
// Get all memories
export const getAllMemories = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/memory/admin/memories");
        dispatch(slice.actions.allMemorySuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
}

// Get memory details
export const getMemoryDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/memory/memory/${id}`);
        dispatch(slice.actions.memoryDetailSuccess(data.memory));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Create memory
export const createMemory = (memoryData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/memory/admin/memory/new`,
            memoryData,
            config
        );
        console.log(data);
        dispatch(slice.actions.newMemorySuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Delete memory
export const deleteMemory = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/memory/admin/memory/${id}`);
        dispatch(slice.actions.deleteMemorySuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update memory
export const updateMemory = (id, memoryData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/memory/admin/memory/${id}`,
            memoryData,
            config
        );
        dispatch(slice.actions.updateMemorySuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const updateMemoryReset = () => async (dispatch) => {
    dispatch(slice.actions.updateMemoryReset());
};

export const deleteMemoryReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteMemoryReset());
};

export const newMemoryReset = () => async (dispatch) => {
    dispatch(slice.actions.memoryDetailReset());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
