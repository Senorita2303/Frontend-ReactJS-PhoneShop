import { createSlice } from "@reduxjs/toolkit";
import axios from "../../common";

const initialState = {
    isLoading: false,
    products: [],
    product: {},
    error: null,
    productsCount: 0,
    resultsPerPage: 0,
    success: false,
    isUpdated: false,
    isDeleted: false,
    detailSpec: []
}
const slice = createSlice({
    name: "product",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        adminProductLoading(state) {
            state.isLoading = true;
            state.products = [];
        },
        allProductSuccess(state, action) {
            state.isLoading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultsPerPage = action.payload.resultPerPage;
        },
        adminProductSuccess(state, action) {
            state.isLoading = false;
            state.products = action.payload;
        },
        productDetailsSuccess(state, action) {
            state.isLoading = false;
            state.product = action.payload.product;
            state.detailSpec = action.payload.detailSpec;
        },
        newProductSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.product = action.payload.product;
        },

        deleteProductSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload;
        },
        updateProductSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.product = action.payload.product
        },
        deleteProductReset(state) {
            state.isDeleted = false;
        },
        updateProductReset(state) {
            state.isUpdated = false;
        },
        productDetailsReset(state) {
            state.success = false;
        },
        newProductReset(state) {
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
export const getProduct = (
    keyword = "",
    currentPage = 1,
    price = [0, 50000000],
    category,
    brand
) => async (dispatch) => {

    try {
        // initial state :
        dispatch(slice.actions.startLoading());
        let link = `/api/product/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        // when category selected by user then using another link
        if (category && brand) {
            link = `/api/product/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&brand=${brand}`;
        } else if (category) {
            link = `/api/product/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
        } else if (brand) {
            link = `/api/product/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&brand=${brand}`;
        }
        const { data } = await axios.get(link);
        dispatch(slice.actions.allProductSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Get products details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/product/product/${id}`);
        dispatch(slice.actions.productDetailsSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Admin product request
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/product/admin/products");
        dispatch(slice.actions.adminProductSuccess(data.products));
    } catch (error) {
        dispatch(slice.actions.startLoading(error.response.data.message));
    }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.post(
            `/api/product/admin/product/new`,
            productData,
            config
        );
        dispatch(slice.actions.newProductSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// Delete product request
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/product/admin/product/${id}`);
        dispatch(slice.actions.deleteProductSuccess(data.success));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// Update product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(
            `/api/product/admin/product/${id}`,
            productData,
            config
        );
        dispatch(slice.actions.updateProductSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const newProductReset = () => async (dispatch) => {
    dispatch(slice.actions.newProductReset());
}

export const deleteProductReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteProductReset());
}

export const updateProductReset = () => async (dispatch) => {
    dispatch(slice.actions.updateProductReset());
}

export const productDetailsReset = () => async (dispatch) => {
    dispatch(slice.actions.productDetailsReset());
}

// clear error
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearErrors());
};
