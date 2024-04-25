import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import PlayerResultType, { AnswerPlayerType } from 'src/app/types/playerResultType';
import { RootState } from '../store';

export const apiPlayerResult = createApi({
    reducerPath: 'apiPlayerResult',
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
        createPlayerResult: builder.mutation<PlayerResultType, { newPlayerResult: Omit<PlayerResultType, '_id'> }>({
            query: ({ newPlayerResult }) => ({
                url: `/player-results`,
                method: 'POST',
                body: newPlayerResult
            })
        }),

        updatePlayerResult: builder.mutation<PlayerResultType, { id: string; answers: AnswerPlayerType[]; score: number }>({
            query: ({ id, answers, score }) => ({
                url: `/player-results/${id}`,
                method: 'PATCH',
                body: { answers, score }
            })
        }),

        removePlayerResult: builder.mutation<PlayerResultType, { playerId: string }>({
            query: ({ playerId }) => ({
                url: `/player-results/${playerId}`,
                method: 'DELETE'
            })
        }),

        addPlayerResult: builder.mutation<PlayerResultType, { playerId: string; gameId: string; results: any }>({
            query: ({ playerId, gameId, results }) => ({
                url: `/player-results/${playerId}/results/${gameId}`,
                method: 'PATCH',
                body: results
            })
        })
    })
});

export const { useCreatePlayerResultMutation, useUpdatePlayerResultMutation, useAddPlayerResultMutation, useRemovePlayerResultMutation } = apiPlayerResult;
