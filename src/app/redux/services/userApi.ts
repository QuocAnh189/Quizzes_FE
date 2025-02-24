import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import UserType from 'src/app/types/userType';
import { RootState } from '../store';
import { EditUserType } from 'src/app/variable';

export const apiUser = createApi({
    reducerPath: 'apiUser',
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
    endpoints: (builder) => ({
        getUser: builder.query<UserType, { userId: string }>({
            query: ({ userId }) => ({
                url: `/users/${userId}`,
                method: 'GET'
            })
        }),

        getUsers: builder.query<UserType[], void>({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
            transformResponse(response: UserType[]) {
                return response.sort((a, b) => b.point - a.point);
            }
        }),

        updateUser: builder.mutation<UserType, { userId: string; formData: EditUserType }>({
            query: ({ userId, formData }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                headers: {
                    Accept: '*application/json*',
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
                },
                body: formData
            })
        }),

        addFriend: builder.mutation<UserType, { myId: string; friendId: string }>({
            query: ({ myId, friendId }) => ({
                url: `/users/${myId}/addFriend/${friendId}`,
                method: 'PUT'
            })
        }),

        followUser: builder.mutation<UserType, { myId: string; friendId: string }>({
            query: ({ myId, friendId }) => ({
                url: `/users/${myId}/follow/${friendId}`,
                method: 'PUT'
            })
        }),

        unFollowUser: builder.mutation<UserType, { myId: string; friendId: string }>({
            query: ({ myId, friendId }) => ({
                url: `/users/${myId}/unFollow/${friendId}`,
                method: 'PUT'
            })
        }),

        uploadCloud: builder.mutation({
            query: ({ formData }) => ({
                url: `upload`,
                method: 'POST',
                headers: {
                    Accept: '*application/json*',
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
                },
                body: formData
            })
        })
    })
});

export const {
    useGetUserQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useAddFriendMutation,
    useFollowUserMutation,
    useUnFollowUserMutation,
    useUploadCloudMutation
} = apiUser;
