import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8000/api/todos";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, updatedTodo }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        body: updatedTodo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;
