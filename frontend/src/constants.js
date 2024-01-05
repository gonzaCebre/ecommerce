/* export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://staychill-ecommerce-api.vercel.app/"; */
export const BASE_URL = "http://localhost:5000";  //Para desarrollo
/* export const BASE_URL = process.env.REACT_APP_API_URL;  //Para produccion */
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const UPLOADS_URL = "/api/upload";

//Para produccion
/* export const PAYPAL_URL = "https://staychill-ecommerce-api.vercel.app/api/config/paypal";
export const MERCADOPAGO_URL_PUBLIC_KEY = "https://staychill-ecommerce-api.vercel.app/api/config/mercadopago";
export const MERCADOPAGO_URL = "https://staychill-ecommerce-api.vercel.app/api/payment";
export const INSTAGRAM_URL = "https://staychill-ecommerce-api.vercel.app/api/config/instagram"; */

//Para desarrollo
export const PAYPAL_URL = "http://localhost:5000/api/config/paypal";
export const MERCADOPAGO_URL_PUBLIC_KEY = "http://localhost:5000/api/config/mercadopago";
export const MERCADOPAGO_URL = "http://localhost:5000/api/payment";
export const INSTAGRAM_URL = "http://localhost:5000/api/config/instagram";
