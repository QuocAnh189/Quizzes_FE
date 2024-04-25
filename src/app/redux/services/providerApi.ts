import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const apiProvider = createApi({
    reducerPath: 'apiProvider',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.authData?.accessToken;

            headers.set('Content-Type', 'application/json');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    keepUnusedDataFor: 20,
    endpoints: (builder) => ({
        deleteImage: builder.mutation<any, string>({
            query: (public_id) => ({
                url: `/providers/delete-image`,
                method: 'PATCH',
                body: { public_id }
            })
        })
    })
});

export const { useDeleteImageMutation } = apiProvider;
