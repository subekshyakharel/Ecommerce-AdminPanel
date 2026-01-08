import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import adminReducer from "../features/admin/adminSlice.js";
import categoryReducer from "../features/category/categorySlice.js";
import systemReducer from "../features/system/systemSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import productReducer from "../features/product/productSlice.js";
import reviewReducer from "../features/review/reviewSlice.js";
import storage from "redux-persist/lib/storage";

const categoryPersistConfig = {
  key: "category",
  storage,
};

const rootReducer = combineReducers({
  adminInfo: adminReducer,
  systemInfo: systemReducer,
  productInfo: productReducer,
  orderInfo: orderReducer,
  reviewInfo: reviewReducer,
  // categoryInfo: categoryReducer,
  categoryInfo: persistReducer(categoryPersistConfig, categoryReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
