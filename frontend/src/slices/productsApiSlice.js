import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber  }) => ({
        url: PRODUCTS_URL, //'api/products'
        params: {
          keyword,
          pageNumber,
          
        }
      }),
      providesTags: ['Products'], //Esta opcion evita que tengamos que refrescar manualmente la pagina
      keepUnusedDataFor: 5,
    }),
/*     getProducts: builder.query({
      query: ({ keyword, pageNumber  }) => ({
        url: PRODUCTS_URL, //'api/products'
        params: {
          keyword,
          pageNumber,
          
        }
      }),
      providesTags: ['Products'], //Esta opcion evita que tengamos que refrescar manualmente la pagina
      keepUnusedDataFor: 5,
    }), */
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, //'api/products'
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => {
        const token = localStorage.getItem('token');

        return{
          url: PRODUCTS_URL,
          method: 'POST',
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
      invalidatesTags: ['Product'] //Frena el cacheo para tener la data fresca
    }),
/*     createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'] //Frena el cacheo para tener la data fresca
    }), */
    updateProduct: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('token');

        return{
          url: `${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data,
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
      invalidatesTags: ['Products'] //Frena el cacheo para tener la data fresca
    }),
/*     updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Products'] //Frena el cacheo para tener la data fresca
    }), */
    uploadProductImage: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('image', data); // Asegúrate de que 'data' contenga la imagen

        return{
          url: `${UPLOADS_URL}`,
          method: 'POST',          
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          mode: 'cors',
/*           headers: {
              'Authorization': `Bearer ${token}`,
          }, */
        }

      },
/*       query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data
      }) */
    }),
    deleteProduct: builder.mutation({
      query: (productId) => {
        const token = localStorage.getItem('token');

        return{
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'DELETE',
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
/*       query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }) */
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Product']
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`
      }),
      keepUnusedDataFor: 5
    }),
    getProductsByCategory: builder.query({
      query: ({ category, pageNumber  }) => ({
        url: `${PRODUCTS_URL}/category/${category}`, //'api/products'
        params: {
          category,
          pageNumber,          
        }
      }),
      providesTags: ['Products'], //Esta opcion evita que tengamos que refrescar manualmente la pagina
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery, useGetProductsByCategoryQuery } =
  productsApiSlice;
