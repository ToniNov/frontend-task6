import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IncommingMessageType, MessageType } from "./types";

export const appApi = createApi({
  reducerPath: "appApi",
  tagTypes: ["USER_NAMES"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-task6.vercel.app/"
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<void, { user: string }>({
      query: (body) => ({
        url: "auth",
        method: "post",
        body
      }),
      invalidatesTags: ["USER_NAMES"]
    }),
    getAllMessages: builder.mutation<IncommingMessageType[], { user: string }>({
      query: (body) => ({
        url: "messages",
        method: "post",
        body
      })
    }),
    getAllUserName: builder.query<string[], void>({
      query: () => ({
        url: "users"
      }),
      providesTags: ["USER_NAMES"]
    }),
    createMessage: builder.mutation<void, MessageType>({
      query: (body) => ({
        url: "messages/create",
        method: "post",
        body
      })
    })
  })
});

export const {
  useGetAllMessagesMutation,
  useSignUpMutation,
  useCreateMessageMutation,
  useGetAllUserNameQuery
} = appApi;
