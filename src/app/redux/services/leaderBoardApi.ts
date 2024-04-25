import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import LeaderBoardType, { AnswerLeaderBoardResultType } from 'src/app/types/leaderboardType';
import { RootState } from '../store';

export const apiLeaderBoard = createApi({
    reducerPath: 'apiLeaderBoard',
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
    keepUnusedDataFor: 2,
    endpoints: (builder) => ({
        getLeaderBoard: builder.query<LeaderBoardType, { leaderBoardId: string }>({
            query: ({ leaderBoardId }) => ({
                url: `/leaderboards/${leaderBoardId}`,
                method: 'GET'
            })
        }),

        createLeaderBoard: builder.mutation<LeaderBoardType, { newLeaderBoard: Omit<LeaderBoardType, '_id'> }>({
            query: ({ newLeaderBoard }) => ({
                url: `/leaderboards`,
                method: 'POST',
                body: newLeaderBoard
            })
        }),

        deleteLeaderBoard: builder.mutation<void, { leaderBoardId: string }>({
            query: ({ leaderBoardId }) => ({
                url: `/leaderboards/${leaderBoardId}`,
                method: 'DELETE'
            })
        }),

        updateQuestionLeaderBoard: builder.mutation<LeaderBoardType, { leaderBoardId: string; update: LeaderBoardType }>({
            query: ({ leaderBoardId, update }) => ({
                url: `/leaderboards/${leaderBoardId}/questionLeaderBoard`,
                method: 'PATCH',
                body: update
            })
        }),

        updateCurrentLeaderBoard: builder.mutation<
            LeaderBoardType,
            { leaderBoardId: string; questionIndex: number; formUpdate: AnswerLeaderBoardResultType[] }
        >({
            query: ({ leaderBoardId, questionIndex, formUpdate }) => ({
                url: `/leaderboards/${leaderBoardId}/current-leaderBoard`,
                method: 'PATCH',
                body: { questionIndex, formUpdate }
            })
        }),

        addLeaderBoardPlayerResult: builder.mutation<void, { leaderBoardId: string; playerResultId: string }>({
            query: ({ leaderBoardId, playerResultId }) => ({
                url: `/leaderboards/${leaderBoardId}/add-player-result`,
                method: 'PATCH',
                body: { playerResultId }
            })
        })
    })
});

export const {
    useGetLeaderBoardQuery,
    useCreateLeaderBoardMutation,
    useDeleteLeaderBoardMutation,
    useUpdateQuestionLeaderBoardMutation,
    useUpdateCurrentLeaderBoardMutation,
    useAddLeaderBoardPlayerResultMutation
} = apiLeaderBoard;
