// store/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: 'mongodb+srv://almubin78:StudentCollection@studentinformationsclus.2d981.mongodb.net/students' }),
 
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    //get students logic
    getStudents: builder.query({
      query: (batch) => `/students${batch ? `?batch=${batch}` : ""}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Student", id: _id })),
              { type: "Student", id: "LIST" },
            ]
          : [{ type: "Student", id: "LIST" }],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: "/students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = apiSlice;
