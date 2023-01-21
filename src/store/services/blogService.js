import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const blogApi = createApi({
  reducerPath: "blogApi",
  tagTypes: ["Blog"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_HOST}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      headers.set("API-KEY", process.env.REACT_APP_API_KEY);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    getBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    getUserBlogs: builder.query({
      query: (id) => ({
        url: `/userblogs/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    createBlog: builder.mutation({
      query: (body) => ({
        url: "/user/createblog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: (body) => ({
        url: `/user/updateblog`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/user/deleteblog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetUserBlogsQuery,
  useGetCategoriesQuery
} = blogApi;

export default blogApi;
