import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: false,
    error: null,
    comments: [],
    comment: {},
    success: false,
    isUpdated: false,
    isDeleted: false,
    message: "",
};

const slice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allComment(state, action) {
            state.isLoading = false;
            state.comments = action.payload.comments;
        },
        commentDetail(state, action) {
            state.isLoading = false;
            state.comment = action.payload;
        },
        newCommentSuccess(state, action) {
            state.isLoading = false;
            state.success = true;
            state.comment = action.payload.comment;
            state.message = action.payload.message;
        },
        updateCommentSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = true;
            state.comment = action.payload.comment;
            state.message = action.payload.message;
        },
        deleteCategorySuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = true;
            state.comment = {};
            state.message = action.payload.message;
        },
        newCommentReset(state) {
            state.success = false;
        },
        updateCommentReset(state) {
            state.isUpdated = false;
        },
        deleteCommentReset(state) {
            state.isDeleted = false;
        },
        clearMessage(state) {
            state.message = "";
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearErrors(state) {
            state.error = null;
        }
    }
});

// Reducer
export default slice.reducer;
// Get all comments
export const getAllComments = (product) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/comment/comments/${product}`);
        dispatch(slice.actions.allComment(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse));
    }
}

// Create comment
export const createComment = (commentData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/comment/new`,
            commentData,
            config
        );
        dispatch(slice.actions.newCommentSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

// Update comment
export const updateComment = (id, commentData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/comment/${id}`,
            commentData,
            config
        );
        dispatch(slice.actions.updateCommentSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Delete comment
export const deleteComment = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/comment/${id}`);
        dispatch(slice.actions.deleteCommentSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

export const newCommentReset = () => async (dispatch) => {
    dispatch(slice.actions.newCommentReset());
};

export const updateCommentReset = () => async (dispatch) => {
    dispatch(slice.actions.updateCommentReset());
};

export const deleteCommentReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteCommentReset());
};

export const clearMessage = () => async (dispatch) => {
    dispatch(slice.actions.clearMessage());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
