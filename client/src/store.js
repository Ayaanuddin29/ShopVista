import { addProductReducer, addProductReviewReducer, deleteProductReducer, getAllProductsReducers, getProductByIdReducer, updateProductReducer } from "./screens/reducers/productReducer"
import {combineReducers} from 'redux';
import {legacy_createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { cartReducer } from "./screens/reducers/cartReducer";
import { deleteUserReducer, getAllUsersReducer, loginReducer, registerNewUserReducer, updateReducer } from "./screens/reducers/userReducer";
import { getAllOrdersReducer, getOrdersByUserIdReducer, placeOrderReducer } from "./screens/reducers/orderReducer";
import { getOrderByIdReducer } from "./screens/reducers/orderReducer";

const finalReducer=combineReducers({
   getAllProductsReducers:getAllProductsReducers,
   getProductByIdReducer:getProductByIdReducer,
   cartReducer:cartReducer,
   registerNewUserReducer:registerNewUserReducer,
   loginReducer:loginReducer,
   placeOrderReducer:placeOrderReducer,
   getOrdersByUserIdReducer:getOrdersByUserIdReducer,
   getOrderByIdReducer:getOrderByIdReducer,
   addProductReviewReducer:addProductReviewReducer,
   updateReducer:updateReducer,
   getAllUsersReducer:getAllUsersReducer,
   deleteUserReducer:deleteUserReducer,
   deleteProductReducer:deleteProductReducer,
   addProductReducer:addProductReducer,
   updateProductReducer:updateProductReducer,
   getAllOrdersReducer:getAllOrdersReducer
})
const cartItems=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const currentUser=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null
const initialState={
    cartReducer:{cartItems:cartItems},
    loginReducer:{currentUser:currentUser}
}
const composeEnhancers=composeWithDevTools({

})
const store=legacy_createStore(finalReducer,initialState,composeEnhancers(
    applyMiddleware(thunk)
))
export default store;