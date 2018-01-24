import { createStore } from 'redux';

const reducer = (state, action) => {
    if (action.type === "SET_PRODUCT_LIST") {
        //console.log(action.type);
        //console.dir(action.products);
        return {
            ...state,
            products: action.products
        };
    } else if (action.type === "SET_OUTSTANDING_LIST") {
        //console.log(action.type);
        //console.dir(action.categories);
        return {
            ...state,
            outstandingProducts: action.outstandingProducts
        };
    } else if (action.type === "SET_CATEGORY_LIST") {
        //console.log(action.type);
        //console.dir(action.categories);
        return {
            ...state,
            categories: action.categories
        };
    } else if (action.type === "SET_PRODUCT_FILTER") {
        //console.log(action.type);
        //console.dir(action.filterProducts);
        return {
            ...state,
            filterProducts: action.filterProducts
        };
    } else if (action.type === "SET_AUTH_USER") {
        //console.log(action.type);
        //console.dir(action.user);
        return {
            ...state,
            user: action.user
        };
    } else if (action.type === "SET_ADMIN_USER") {  
        //console.log(action.type);
        //console.dir(action.isAdmin);
        return {
            ...state,
            isAdmin: action.isAdmin
        };
    }
    return state;
}


export default createStore(reducer, {
    products: [], outstandingProducts: [], categories: [], filterProducts: { order: 'price', category: '', searchString: '' }, user: null, isAdmin: false
});