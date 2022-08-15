import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { MeetupItem, RevalidationPaths } from "../types"

export const internalApi = createApi({
  reducerPath: "internalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    addMeetup: build.mutation<{ message: string; result: MeetupItem }, MeetupItem>({
      query: (meetup) => ({
        url: "/api/add-meetup",
        method: "POST",
        body: meetup,
      }),
    }),
    revalidatePath: build.query<void, RevalidationPaths>({
      query: (path) => ({
        url: `/api/revalidate?path=${path}&secret=782F413F4428472B4B6250655368566D`,
        cache: "no-cache", // todo remove ?
      }),
    }),
  }),
})

export const triggerAddMeetup = internalApi.endpoints.addMeetup
export const triggerRevalidatePath = internalApi.endpoints.revalidatePath
