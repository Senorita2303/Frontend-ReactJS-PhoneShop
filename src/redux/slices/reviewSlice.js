import { createSlice } from '@reduxjs/toolkit';
import axios from "../../common";

const initialState = {
    isLoading: true,
    error: null,
    reviews: [],
    review: {},
    message: "",
};

const slice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        allReview(state, action) {
            state.isLoading = false;
            state.reviews = action.payload.reviews;
        },
        newReviewSuccess(state, action) {
            state.isLoading = false;
            state.success = true;
            state.review = action.payload.review;
            state.message = action.payload.message;
        },
        newReviewReset(state) {
            state.success = false;
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
// Get all reviews
export const getAllReviews = (product) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/review/reviews/${product}`);
        dispatch(slice.actions.allReview(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse));
    }
}

// Create review
export const createReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/review/new`,
            reviewData,
            config
        );
        dispatch(slice.actions.newReviewSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.repsonse.data.message));
    }
};

export const newReviewReset = () => async (dispatch) => {
    dispatch(slice.actions.newReviewReset());
};

export const clearMessage = () => async (dispatch) => {
    dispatch(slice.actions.clearMessage());
};

// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
