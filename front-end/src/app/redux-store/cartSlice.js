import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsByIdIn } from "../api/backend/product";

const initialState = {
    loadingProducts: true,
    errorLoadingProducts: '', 
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const saveCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems?.map(({idProduct, cartQuantity}) => ({idProduct, cartQuantity})) ?? []));
}

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async (cartItems) => {
    const response = await getAllProductsByIdIn(cartItems.map(({ idProduct }) => idProduct))
    return response.data
})

const cartSlice =  createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex((item) => item.idProduct === action.payload.idProduct);
            
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1;
            }else{
                state.cartItems.push({idProduct: action.payload.idProduct, cartQuantity: 1});
            }
            
            saveCartItems(state.cartItems)
        },

        removeFromCart(state, action){
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.idProduct !== action.payload.idProduct);
            saveCartItems(state.cartItems)
        },

        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex((item) => item.idProduct === action.payload.idProduct);
            
            if(state.cartItems[itemIndex].cartQuantity <= 1){
                state.cartItems = state.cartItems.filter((cartItem) => cartItem.idProduct !== action.payload.idProduct);
                saveCartItems(state.cartItems)
                // removeFromCart(state, action)
            } else if (state.cartItems[itemIndex].cartQuantity > 1   ) {
               
                state.cartItems[itemIndex].cartQuantity -= 1;
            }
             
            
            saveCartItems(state.cartItems)
        },

        clearCart(state){
            state.cartItems = [];
            saveCartItems(state.cartItems)
        },

        getTotals(state){
            const { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { priceTTC, cartQuantity } = cartItem;
                const itemTotal = priceTTC * cartQuantity;
                
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity
                
                return cartTotal;
            }, {
                total:0,
                quantity:0,
            });
            
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        
        loadCart(state) {
            try {
                const savedCartItems = localStorage.getItem('cartItems')
                state.cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
            } catch(ex) {
                state.cartItems = [];
            }
        }
    }, 
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
          state.loadingProducts = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
          state.loadingProducts = false
          const newCartItems = action.payload
            ?.map(product => ({
                ...product,
                cartQuantity: (state.cartItems.find(p => product.idProduct === p.idProduct)?.cartQuantity ?? 1)
            })) ?? [];
          state.cartItems = newCartItems
          state.errorLoadingProducts = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
          state.loadingProducts = false
          state.cartItems = state.cartItems 
          state.errorLoadingProducts = action.error.message
        })
    },
});

export const {addToCart,removeFromCart,decreaseCart,clearCart,getTotals,loadCart} = cartSlice.actions;
export default cartSlice.reducer;