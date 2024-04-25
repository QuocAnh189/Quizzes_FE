import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import GradeType from 'src/app/types/gradeType';
import QuestionType from 'src/app/types/questionType';

export const apiQuestion = createApi({
    reducerPath: 'apiQuestion',
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
        getAllquestions: builder.query<GradeType[], void>({
            query: () => ({
                url: `/questions`,
                method: 'GET'
            })
        }),

        getQuestionById: builder.query<GradeType[], string>({
            query: (id) => ({
                url: `/questions/${id}`,
                method: 'GET'
            })
        }),

        getQuestionByQuizId: builder.query<GradeType, string>({
            query: (quizId) => ({
                url: `/questions/quiz/${quizId}`,
                method: 'GET'
            })
        }),

        createQuestion: builder.mutation<QuestionType, Partial<QuestionType>>({
            query: (data) => ({
                url: `/questions`,
                method: 'POST',
                body: data
            })
        }),

        updateQuestion: builder.mutation<GradeType, { id: string; data: Partial<QuestionType> }>({
            query: ({ id, data }) => ({
                url: `/questions/${id}`,
                method: 'PUT',
                body: data
            })
        }),

        deleteQuestion: builder.mutation<boolean, { id: string }>({
            query: ({ id }) => ({
                url: `/questions/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetAllquestionsQuery,
    useGetQuestionByIdQuery,
    useGetQuestionByQuizIdQuery,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation
} = apiQuestion;
