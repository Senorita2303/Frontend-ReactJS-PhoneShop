import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// import authReducer from "./slices/userSlice";
import brandReducer from "./slices/brandSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import reviewReducer from "./slices/reviewSlice";
import specificationReducer from "./slices/specificationSlice";
import colorReducer from "./slices/colorSlice";
import memoryReducer from "./slices/memorySlice";
import productVariantReducer from "./slices/productVariantSlice";
const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
}

const rootReducer = combineReducers({
    // auth: authReducer,
    brand: brandReducer,
    cart: cartReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    user: userReducer,
    // comment: commentReducer,
    review: reviewReducer,
    specification: specificationReducer,
    memory: memoryReducer,
    color: colorReducer,
    productVariant: productVariantReducer,
});

export { rootPersistConfig, rootReducer }