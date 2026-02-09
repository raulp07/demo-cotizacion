import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../../domain/entities/Product';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'demo-cotizacion-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(
                item => item.product.id === action.payload.product.id
            );

            if (existingItem) {
                const updatedItems = state.items.map(item =>
                    item.product.id === action.payload.product.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
                return { ...state, items: updatedItems };
            }

            return {
                ...state,
                items: [...state.items, { product: action.payload.product, quantity: action.payload.quantity }],
            };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.product.id !== action.payload),
            };

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.product.id !== action.payload.id),
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        }

        case 'CLEAR_CART':
            return { ...state, items: [] };

        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };

        case 'CLOSE_CART':
            return { ...state, isOpen: false };

        case 'LOAD_CART':
            return { ...state, items: action.payload };

        default:
            return state;
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        isOpen: false,
    });

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const items = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: items });
            } catch (e) {
                console.error('Failed to parse cart from localStorage');
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }, [state.items]);

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const addItem = (product: Product, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    };

    const removeItem = (productId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                totalItems,
                totalPrice,
                isOpen: state.isOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                toggleCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
