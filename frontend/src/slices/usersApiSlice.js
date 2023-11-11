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
        credentials: "include",
        body: data,
      }),
    }),
    register: builder.mutation({
      //es mutation porque es un POST REQ
      query: (data) => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}`, //'api/users'
        method: "POST",                
        credentials: "include",
        body: data,
      }),
    }),
    logout: builder.mutation({
      //es mutation porque es un POST REQ
      query: () => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URL}/profile`,
        method: "PUT",        
        credentials: "include",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({        
        url: USERS_URL,
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({        
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data
      }),  
      invalidatesTags: ['Users']    
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } =
  usersApiSlice;
