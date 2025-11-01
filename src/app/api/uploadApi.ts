import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UploadedImage {
  url: string;
  filename: string;
  objectUrl?: string;
  size?: number;
}

export interface UploadImageResponse {
  imageData: string;
  message: string;
}

export interface MultipleImagesResponse {
  images: UploadedImage[];
  message: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  images?: File[];
}

export interface Post {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  images: UploadedImage[];
  createdAt: string;
}

export interface CreatePostResponse {
  post: Post;
  message: string;
}

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? 'Token exists' : 'No token found');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      // Don't set Content-Type for FormData uploads
      if (endpoint.includes('upload') || endpoint.includes('posts')) {
        headers.delete('content-type');
      }
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: '/api/upload/profile-image',
        method: 'POST',
        body: formData,
      }),
    }),
    uploadPostImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: '/api/upload/post-image',
        method: 'POST',
        body: formData,
      }),
    }),
    uploadMultipleImages: builder.mutation<MultipleImagesResponse, FormData>({
      query: (formData) => ({
        url: '/api/upload/images',
        method: 'POST',
        body: formData,
      }),
    }),
    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: (formData) => ({
        url: '/api/posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Post'],
    }),
    getAllPosts: builder.query<{ posts: Post[] }, void>({
      query: () => '/api/posts',
      providesTags: ['Post'],
    }),
    getPostById: builder.query<{ post: Post }, string>({
      query: (id) => `/api/posts/${id}`,
      providesTags: ['Post'],
    }),
    updatePost: builder.mutation<CreatePostResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/api/posts/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { 
  useUploadProfileImageMutation, 
  useUploadPostImageMutation, 
  useUploadMultipleImagesMutation,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = uploadApi;