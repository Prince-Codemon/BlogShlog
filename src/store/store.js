import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import userApi from './services/userService';
import blogApi from './services/blogService';
export const store = configureStore({
    reducer: {
        'user':userSlice,
        [userApi.reducerPath]: userApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, blogApi.middleware),
})