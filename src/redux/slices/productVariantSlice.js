import { createSlice } from "@reduxjs/toolkit";
import axios from "../../common";

const initialState = {
    isLoading: false,
    productVariants: [],
    productVariant: {},
    error: null,
    productVariantsCount: 0,
    resultsPerPage: 0,
    success: false,
    isUpdated: false,
    isDeleted: false,
}
const slice = createSlice({
    name: "productVariant",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        adminProductVariantLoading(state) {
            state.isLoading = true;
            state.productVariants = [];
        },
        allProductVariantSuccess(state, action) {
            state.isLoading = false;
            state.productVariants = action.payload.productVariants;
            state.productVariantsCount = action.payload.productVariantsCount;
            state.resultsPerPage = action.payload.resultPerPage;
        },
        adminProductVariantSuccess(state, action) {
            state.isLoading = false;
            state.productVariants = action.payload;
        },
        productVariantDetailsSuccess(state, action) {
            state.isLoading = false;
            state.productVariants = action.payload.productVariants;
        },
        newProductVariantSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.productVariant = action.payload.productVariant;
        },

        deleteProductVariantSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        updateProductVariantSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.productVariant = action.payload.productVariant
        },
        deleteProductVariantReset(state) {
            state.isDeleted = false;
        },
        updateProductVariantReset(state) {
            state.isUpdated = false;
        },
        productVariantDetailsReset(state) {
            state.success = false;
        },
        newProductVariantReset(state) {
            state.success = false;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearErrors(state) {
            state.error = null;
        },
    }
});

// Reducer
export default slice.reducer;
export const getProductVariant = (
    keyword = "",
    currentPage = 1,
    price = [0, 40000000],
    category,
) => async (dispatch) => {

    try {
        // initial state :
        dispatch(slice.actions.startLoading());
        let link = `/api/productVariant/productVariant?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        // when category selected by user then using another link
        if (category) {
            link = `/api/productVariant/productVariant?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
        }
        const { data } = await axios.get(link);
        dispatch(slice.actions.allProductVariantSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Get productVariants details
export const getProductVariantDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/productVariant/productVariant/${id}`);
        dispatch(slice.actions.productVariantDetailsSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Admin productVariant request
export const getAdminProductVariants = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/productVariant/admin/productVariants");
        dispatch(slice.actions.adminProductVariantSuccess(data.productVariants));
    } catch (error) {
        dispatch(slice.actions.startLoading(error.response.data.message));
    }
};

// Create ProductVariant
export const createProductVariant = (productVariantData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.post(
            `/api/productVariant/admin/productVariant/new`,
            productVariantData,
            config
        );
        dispatch(slice.actions.newProductVariantSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Delete productVariant request
export const deleteProductVariant = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/productVariant/admin/productVariant/${id}`);
        dispatch(slice.actions.deleteProductVariantSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update product variant
export const updateProductVariant = (id, productVariantData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/productVariant/admin/productVariant/${id}`,
            productVariantData,
            config
        );
        dispatch(slice.actions.updateProductVariantSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};


export const newProductVariantReset = () => async (dispatch) => {
    dispatch(slice.actions.newProductVariantReset());
}

export const deleteProductVariantReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteProductVariantReset());
}

export const updateProductVariantReset = () => async (dispatch) => {
    dispatch(slice.actions.updateProductVariantReset());
}

export const productVariantDetailsReset = () => async (dispatch) => {
    dispatch(slice.actions.productVariantDetailsReset());
}

// clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
