import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AuthType from 'src/app/types/authType';
import UserType from 'src/app/types/userType';
import { SignUpType, LoginType } from 'src/app/variable';

export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL
    }),
    keepUnusedDataFor: 20,
    endpoints: (builder) => ({
        checkEmail: builder.mutation<any, any>({
            query: (formData) => ({
                url: '/auths/check-email',
                method: 'POST',
                body: formData
            })
        }),

        checkUserName: builder.mutation<any, any>({
            query: (formData) => ({
                url: '/auths/check-username',
                method: 'POST',
                body: formData
            })
        }),

        signUp: builder.mutation<AuthType, SignUpType>({
            query: (formData) => ({
                url: '/auths/sign-up',
                method: 'POST',
                body: formData
            })
        }),

        signIn: builder.mutation<AuthType, LoginType>({
            query: (formData) => ({
                url: '/auths/sign-in',
                method: 'POST',
                body: formData
            })
        }),

        signInSocial: builder.mutation<AuthType, Partial<UserType>>({
            query: (formData) => ({
                url: '/auths/sign-in-social',
                method: 'POST',
                body: formData
            })
        }),

        signOut: builder.mutation<any, string>({
            query: (id) => ({
                url: `/auths/sign-out/${id}`,
                method: 'POST'
            })
        })
    })
});

export const { useCheckEmailMutation, useCheckUserNameMutation, useSignUpMutation, useSignInMutation, useSignInSocialMutation, useSignOutMutation } = apiAuth;
