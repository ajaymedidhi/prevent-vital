import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    mrp?: number;
    images: string[];
    image?: string;
    description?: string;
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
            // Recalculate total
            state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            saveCartToStorage(state);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const itemIndex = state.cart.findIndex(item => item._id === id);

            if (itemIndex >= 0) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    state.cart.splice(itemIndex, 1);
                } else {
                    state.cart[itemIndex].quantity = quantity;
                }
                // Recalculate total
                state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                saveCartToStorage(state);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemIndex = state.cart.findIndex(item => item._id === action.payload);
            if (itemIndex >= 0) {
                state.cart.splice(itemIndex, 1);
                // Recalculate total
                state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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

export const { addToCart, updateQuantity, removeFromCart, clearCart } = shopSlice.actions;
export default shopSlice.reducer;
