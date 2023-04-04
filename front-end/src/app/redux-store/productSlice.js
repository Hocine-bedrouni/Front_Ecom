// import { createSlice } from '@reduxjs/toolkit';
// import { createApi } from '@reduxjs/toolkit/dist/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const productSlice = createApi({
   reducerPath: "productSlice",
   baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9000/api/shopping-online/no-role/"}),
   endpoints: (builder) => ({
    getAllProducts: builder.query({
        query: () => "all-product-dto",
    }),
    getProduct: builder.query({
        query:(categ) => `get-by-category-id/${categ}`
    }),
   }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productSlice;




// const initialState = {
//     product: []
// };

// export const productSlice = createSlice({
//    name: 'product',
//    initialState,
//    reducers: {
//        productStore: (state, action) => {
//            state.product = action.payload;
//        }
//    },
  
// });

// export const { productStore } = productSlice.actions;
// export default productSlice.reducer;