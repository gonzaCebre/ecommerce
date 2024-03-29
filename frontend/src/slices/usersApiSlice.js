import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      //es mutation porque es un POST REQ
      query: (data) => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}/auth`, //'api/users'
        method: "POST",
        /* credentials: "include", */
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}`, //'api/users'
        method: "POST",                
        /* credentials: "include", */
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('token');

        return{
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data,
          /* credentials: 'include', */
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
    }),
    getUsers: builder.query({
      query: () => {
        const token = localStorage.getItem('token');

        return{
          url: USERS_URL,
          /* credentials: 'include', */
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    deleteUser: builder.mutation({
      query: (userId) => {
        const token = localStorage.getItem('token');

        return{
          url: `${USERS_URL}/${userId}`,
          method: "DELETE",
          /* credentials: 'include', */
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
    }),
    getUserDetails: builder.query({
      query: (userId) => {
        const token = localStorage.getItem('token');

        return{
          url: `${USERS_URL}/${userId}`,
          /* credentials: 'include', */
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('token');

        return{
          url: `${USERS_URL}/${data.userId}`,
          method: "PUT",
          body: data,
          /* credentials: 'include', */
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        }

      },
      invalidatesTags: ['Users']    
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } =
  usersApiSlice;
