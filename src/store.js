import { createStore } from 'redux';

const reducer = (state, action) => {
    if (action.type === "SET_PRODUCT_LIST") {
        return {
            ...state,
            products: action.products
        };
    } else if (action.type === "SET_FILTERED_LIST") {
        return {
            ...state,
            filteredProducts: action.filteredProducts
        };
    } else if (action.type === "SET_OUTSTANDING_LIST") {
        return {
            ...state,
            outstandingProducts: action.outstandingProducts
        };
    } else if (action.type === "SET_CATEGORY_LIST") {
        return {
            ...state,
            categories: action.categories
        };
    } else if (action.type === "SET_CATEGORY_ARRAY") {
        return {
            ...state,
            categoriesArray: action.categoriesArray
        };
    } else if (action.type === "SET_PRODUCT_FILTER") {
        return {
            ...state,
            filter: action.filter
        };
    } else if (action.type === "SET_AUTH_USER") {
        return {
            ...state,
            user: action.user
        };
    } else if (action.type === "SET_ADMIN_USER") {
        return {
            ...state,
            isAdmin: action.isAdmin
        };
    } else if (action.type === "SET_CART_ID") {
        return {
            ...state,
            cartId: action.cartId
        };
    } else if (action.type === "ADD_TO_CART") {
        return {
            ...state,
            cart: state.cart.concat(action.product)
        };
    } else if (action.type === "REMOVE_FROM_CART") {
        state.cart.splice(state.cart.indexOf(action.product), 1);
        return {
            ...state,
            cart: state.cart
        };
        console.log(state.cart)
    } else if (action.type === "INITIALIZE_CART") {
        return {
            ...state,
            cart: action.cart
        };
    } else if (action.type === "CREATE_NEW_ORDER") {
        return {
            ...state,
            order: action.order
        };
    } else if (action.type === "SET_USER_PROFILE") {
        return {
            ...state,
            userProfile: action.userProfile
        }; 
    }

    return state;
}


export default createStore(reducer, {
    userProfile: null, order: null, cart: [], cartId: null, products: [], filteredProducts: [], outstandingProducts: [], categories: [], categoriesArray: [], filter: { order: 'name', category: '', searchString: '' }, user: null, isAdmin: false
});