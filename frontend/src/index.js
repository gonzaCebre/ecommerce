import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {HelmetProvider} from 'react-helmet-async';
import "./styles/bootstrap.min.css";
import "./styles/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippinScreen from "./screens/ShippinScreen";
import PrivateRoute from './components/PrivateRoute'
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrdersListScreen from "./screens/admin/OrdersListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ProductsScreen from "./screens/ProductsScreen";


const router = createBrowserRouter(
  //crea el enrutador
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<ProductsScreen />} />
      <Route path='/category/:category' element={<ProductsScreen />} />
      <Route path='/page/:pageNumber' element={<ProductsScreen />} />
      <Route path='/category/:category/page/:pageNumber' element={<ProductsScreen />} />
      <Route path='/search/:keyword/category/:category/page/:pageNumber' element={<ProductsScreen />} />
      <Route path='/products' element={<ProductsScreen />} />
      <Route path='/products/page/:pageNumber' element={<ProductsScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippinScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/order/:id/ordenPaga' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrdersListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>

      
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();