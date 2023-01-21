import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      headers.set("API-KEY",  process.env.REACT_APP_API_KEY);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    forgot: builder.mutation({
      query: (body) => ({
        url: "/user/forgotpassword",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/user/resetpassword/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/editprofile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserFunction: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    verifyEmail: builder.mutation({
      query: (id) => ({
        url: `/user/verify-email/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useUpdateUserMutation,
  useGetUserFunctionMutation,
  useGetUserQuery,
  useForgotMutation,
  useResetPasswordMutation,
  
} = userApi;
export default userApi;
