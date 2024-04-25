import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import QuizType from 'src/app/types/quizType';
import { QuizType as CreatorQuizType } from 'src/app/types/creator';
import QuestionType from 'src/app/types/questionType';
import { RootState } from '../store';

type DiscoverQuizType = {
    [key: string]: QuizType[];
};
type PublicQuizesType = {
    data: QuizType[];
    currentPage: number;
    pageSize: number;
    numberOfPages: number;
};

export const apiQuiz = createApi({
    reducerPath: 'apiQuiz',
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
    tagTypes: ['Quiz'],
    endpoints: (builder) => ({
        getPublicQuizes: builder.query<PublicQuizesType, { sectionName?: string; page: number; pageSize: number }>({
            query: ({ sectionName, page, pageSize }) => ({
                url: `/quizzes/public?sectionName=${sectionName ? sectionName : ''}&page=${page}&pageSize=${pageSize}`,
                method: 'GET'
            })
        }),

        getQuizzesBySearch: builder.query<QuizType[], { searchName: string; tags: string }>({
            query: ({ searchName, tags }) => ({
                url: `/quizzes/search?searchName=${searchName}&tags=${tags}`,
                method: 'GET'
            })
        }),

        getQuizById: builder.query<QuizType | CreatorQuizType, string>({
            query: (quizId) => ({
                url: `/quizzes/${quizId}`,
                method: 'GET'
            })
        }),

        getDiscoverQuizzes: builder.query<DiscoverQuizType, void>({
            query: () => ({
                url: '/quizzes/discover',
                method: 'GET'
            })
        }),

        getTeacherQuizzes: builder.query<QuizType[], { teacherId: string }>({
            query: ({ teacherId }) => ({
                url: `/quizzes/teacher/${teacherId}`,
                method: 'GET'
            })
        }),

        createDraftQuiz: builder.mutation<CreatorQuizType, { quizData: Omit<CreatorQuizType, '_id'> }>({
            query: ({ quizData }) => ({
                url: `/quizzes/draft`,
                method: 'POST',
                body: quizData
            })
        }),

        getDraftQuiz: builder.query<CreatorQuizType | QuizType, { quizId: string }>({
            query: ({ quizId }) => ({
                url: `/quizzes/draft/${quizId}`,
                method: 'GET'
            })
        }),

        createQuiz: builder.mutation<CreatorQuizType, Partial<CreatorQuizType>>({
            query: (quizData) => ({
                url: `/quizzes`,
                method: 'POST',
                body: quizData
            })
        }),

        importQuiz: builder.mutation<QuizType, { quizData: QuizType; userId: string }>({
            query: ({ quizData, userId }) => ({
                url: `/quizzes/import`,
                method: 'POST',
                body: { quizData, userId }
            })
        }),

        updateQuiz: builder.mutation<CreatorQuizType, { id: string; data: Partial<QuizType> }>({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Quiz']
        }),

        deleteQuiz: builder.mutation<void, { quizId: string }>({
            query: ({ quizId }) => ({
                url: `/quizzes/${quizId}`,
                method: 'DELETE'
            })
        }),

        likeQuiz: builder.mutation<QuizType, { userId: string }>({
            query: ({ userId }) => ({
                url: `/quizzes/${userId}/likeQuiz`,
                method: 'PATCH'
            })
        }),

        commentQuiz: builder.mutation<QuizType, { userId: string; comment: Comment }>({
            query: ({ userId, comment }) => ({
                url: `/quizzes/${userId}/commentQuiz`,
                method: 'POST',
                body: comment
            })
        }),

        addQuestion: builder.mutation<QuestionType, { quizId: string; newQuestion: Omit<QuestionType, '_id'> }>({
            query: ({ quizId, newQuestion }) => ({
                url: `/quizzes/${quizId}/questions`,
                method: 'POST',
                body: newQuestion
            })
        }),

        getQuestion: builder.query<QuestionType, { quizId: string; questionId: string }>({
            query: ({ quizId, questionId }) => ({
                url: `/quizzes/${quizId}/questions/${questionId}`,
                method: 'GET'
            })
        }),

        getQuestions: builder.query<QuestionType[], { quizId: string }>({
            query: ({ quizId }) => ({
                url: `/quizzes/${quizId}/questions`,
                method: 'GET'
            })
        }),

        updateQuestion: builder.mutation<QuestionType, { quizId: string; questionId: string; newQuestion: QuestionType }>({
            query: ({ quizId, questionId, newQuestion }) => ({
                url: `/quizzes/${quizId}/questions/${questionId}`,
                method: 'PUT',
                body: newQuestion
            })
        }),

        deleteQuestion: builder.mutation<object, { quizId: string; questionId: string }>({
            query: ({ quizId, questionId }) => ({
                url: `/quizzes/${quizId}/questions/${questionId}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetPublicQuizesQuery,
    useGetQuizzesBySearchQuery,
    useGetQuizByIdQuery,
    useGetDiscoverQuizzesQuery,
    useGetTeacherQuizzesQuery,
    useImportQuizMutation,
    useGetDraftQuizQuery,
    useCreateDraftQuizMutation,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
    useLikeQuizMutation,
    useCommentQuizMutation,
    useAddQuestionMutation,
    useGetQuestionsQuery,
    useGetQuestionQuery,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation
} = apiQuiz;
