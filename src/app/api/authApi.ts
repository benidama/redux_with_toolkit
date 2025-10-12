import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface GoogleAuthRequest {
  token: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/auth',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<{ message: string }, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<{ message: string }, VerifyOtpRequest>({
      query: (data) => ({
        url: '/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation<{ message: string }, ResendOtpRequest>({
      query: (data) => ({
        url: '/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    requestPasswordReset: builder.mutation<{ message: string }, RequestPasswordResetRequest>({
      query: (data) => ({
        url: '/request-password-reset',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    googleLogin: builder.mutation<AuthResponse, GoogleAuthRequest>({
      query: (data) => ({
        url: '/google-login',
        method: 'POST',
        body: data,
      }),
    }),
    googleRegister: builder.mutation<AuthResponse, GoogleAuthRequest>({
      query: (data) => ({
        url: '/google-register',
        method: 'POST',
        body: data,
      }),
    }),
    googleAuth: builder.query<string, void>({
      query: () => ({
        url: '/google',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation, useRequestPasswordResetMutation, useResetPasswordMutation, useGoogleLoginMutation, useGoogleRegisterMutation, useGoogleAuthQuery } = authApi;