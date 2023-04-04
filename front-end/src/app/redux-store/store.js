import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './authenticationSlice';
// import productReducer from './productSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import deliveryReducer from './deliverySlice';
import { productSlice  } from './productSlice';

/**
 * To configure the store redux.
 *
 * @author Ibrahim BUYOYA
 */
export const store = configureStore({

    reducer: {
        auth: authenticationReducer,
        [productSlice.reducerPath]: productSlice.reducer,
        // product: productReducer,
        user: userReducer,
        cart: cartReducer,
        delivery: deliveryReducer,
    },
});
