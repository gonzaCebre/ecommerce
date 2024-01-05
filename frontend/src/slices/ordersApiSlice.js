import {apiSlice} from './apiSlice'
import { MERCADOPAGO_URL_PUBLIC_KEY, ORDERS_URL, PAYPAL_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => {
            //Obtengo el token desde localstorage
            const token = localStorage.getItem('token');

                return {
                    url: ORDERS_URL,
                    method: 'POST',
                    body: {...order},
                    /* credentials: 'include', */
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            }
        }),
        getOrderDetails: builder.query({
            query: (orderId) => {
                //Obtengo el token desde localstorage
                const token = localStorage.getItem('token');

                return {
                    url: `${ORDERS_URL}/${orderId}`,
                    /* credentials: 'include', */
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            },
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => {
                //Obtengo el token desde localstorage
                const token = localStorage.getItem('token');
                return{
                    url: `${ORDERS_URL}/${orderId}/pay`,
                    method: 'PUT',
                    body: {...details},
                    /* credentials: 'include', */
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            }
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMercadopagoPublicKey: builder.query({
            query: () => ({
                url: MERCADOPAGO_URL_PUBLIC_KEY,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => {
                //Obtengo el token desde localstorage
                const token = localStorage.getItem('token');

                return{
                    url: `${ORDERS_URL}/mine`,
                    /* credentials: 'include', */
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            },
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => {
                //Obtengo el token desde localstorage
                const token = localStorage.getItem('token');

                return{
                    url: ORDERS_URL,
                    /* credentials: 'include', */
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            },
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => {
                //Obtengo el token desde localstorage
                const token = localStorage.getItem('token');

                return{
                    url: `${ORDERS_URL}/${orderId}/deliver`,
                    method: 'PUT',
                    /* credentials: 'include', */
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            },
        }),
    }),
});

export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation, useGetMercadopagoPublicKeyQuery} = ordersApiSlice;