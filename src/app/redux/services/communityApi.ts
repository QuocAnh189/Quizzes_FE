import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import CommunityType from 'src/app/types/communityType';
import { RootState } from '../store';
import MessageType from 'src/app/types/messageType';

export const apiCommunity = createApi({
    reducerPath: 'apiCommunity',
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
        getCommunity: builder.query<CommunityType, { id: string }>({
            query: ({ id }) => ({
                url: `/communities/${id}`,
                method: 'GET'
            })
        }),

        getCommunities: builder.query<CommunityType[], void>({
            query: () => ({
                url: '/communities',
                method: 'GET'
            })
        }),

        createCommunity: builder.mutation<CommunityType, { formData: Omit<CommunityType, '_id'> }>({
            query: ({ formData }) => ({
                url: '/communities',
                method: 'POST',
                body: formData
            })
        }),

        deleteCommunity: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/communities/${id}`,
                method: 'DELETE'
            })
        }),

        addQuizCommunity: builder.mutation<CommunityType, { id: string; quizId: string }>({
            query: ({ id, quizId }) => ({
                url: `/communities/${id}/add-quiz/${quizId}`,
                method: 'PUT'
            })
        }),

        deleteQuizCommunity: builder.mutation<CommunityType, { id: string; quizId: string }>({
            query: ({ id, quizId }) => ({
                url: `/communities/${id}/delete-quiz/${quizId}`,
                method: 'PUT'
            })
        }),

        addMessageBox: builder.mutation<CommunityType, { id: string; message: Omit<MessageType, '_id'> }>({
            query: ({ id, message }) => ({
                url: `/communities/add-message/${id}`,
                method: 'PUT',
                body: { message }
            })
        })
    })
});

export const {
    useGetCommunityQuery,
    useGetCommunitiesQuery,
    useCreateCommunityMutation,
    useDeleteCommunityMutation,
    useAddQuizCommunityMutation,
    useDeleteQuizCommunityMutation,
    useAddMessageBoxMutation
} = apiCommunity;
