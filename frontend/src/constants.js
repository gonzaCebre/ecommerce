/* export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://staychill-ecommerce-api.vercel.app/"; */
/* export const BASE_URL = "http://localhost:5000"; */ //Para desarrollo
export const BASE_URL = process.env.REACT_APP_API_URL; //Para produccion
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const MERCADOPAGO_URL_PUBLIC_KEY = "/api/config/mercadopago";
export const MERCADOPAGO_URL = "/api/payment";
export const UPLOADS_URL = "/api/upload";
export const INSTAGRAM_URL = "/api/config/instagram";
