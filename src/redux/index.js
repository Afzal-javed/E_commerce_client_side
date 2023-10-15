// redux/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { userSliceReducer } from './userSlice';
import { productSliceReducer } from './productSlice';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    user: userSliceReducer,
    product: productSliceReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);




// export const store = configureStore({
//     reducer: {
//         user: userSliceReducer,
//         product: productSliceReducer
//     },
// })