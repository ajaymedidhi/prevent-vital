import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    mrp?: number;
    images: string[];
    image?: string;
    category: string;
    stock: number;
    allowedRegions: string[];
    specs?: { label: string; value: string }[];
    supportedVitals?: string[];
}

interface CartItem extends Product {
    quantity: number;
}

export interface ShopState {
    cart: CartItem[];
    total: number;
}

const loadCartFromStorage = (): ShopState => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { cart: [], total: 0 };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { cart: [], total: 0 };
    }
};

const saveCartToStorage = (state: ShopState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch {
        // Ignore write errors
    }
};

const initialState: ShopState = loadCartFromStorage();

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const itemIndex = state.cart.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cart[itemIndex].quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            state.total += action.payload.price;
            saveCartToStorage(state);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemIndex = state.cart.findIndex(item => item._id === action.payload);
            if (itemIndex >= 0) {
                state.total -= state.cart[itemIndex].price * state.cart[itemIndex].quantity;
                state.cart.splice(itemIndex, 1);
                saveCartToStorage(state);
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.total = 0;
            saveCartToStorage(state);
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = shopSlice.actions;
export default shopSlice.reducer;
