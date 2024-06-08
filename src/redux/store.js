import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }),
});

export default store;

// export const persistor = persistStore(store);

// const { dispatch } = store;

// const useSelector = useAppSelector;

// const useDispatch = () => useAppDispatch();

// export { store, persistor, dispatch, useSelector, useDispatch };