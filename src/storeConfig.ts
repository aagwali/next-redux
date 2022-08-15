import { createWrapper, HYDRATE } from "next-redux-wrapper"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { configureStore, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { internalApi, triggerAddMeetup, triggerRevalidatePath } from "./services/apiHooks"

import type { MeetupItem, ServerSettings } from "./types"
// todo : add monitoring https://logrocket.com/signup

const meetupAdapter = createEntityAdapter<MeetupItem>()

export const meetupSelector = meetupAdapter.getSelectors((state: State) => state.meetups)

export const meetupSlice = createSlice({
  name: "meetups",
  initialState: meetupAdapter.getInitialState(),
  reducers: {
    setMeetups: (meetups, { payload: newMeetups }: PayloadAction<MeetupItem[]>) => {
      meetupAdapter.setAll(meetups, newMeetups)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (meetups, { payload: serverSideRendered }: any) => {
        meetupAdapter.addMany(meetups, serverSideRendered.meetups.entities)
      })
      .addMatcher(triggerAddMeetup.matchFulfilled, (meetups, { payload: { result: insertedMeetup } }) => {
        meetupAdapter.upsertOne(meetups, insertedMeetup)
      })
  },
})

const initialServerSettings: ServerSettings = {
  pathToRevalidate: "none",
}

export const serverSlice = createSlice({
  name: "serverSettings",
  initialState: initialServerSettings,
  reducers: {
    setServerSetting: (
      serverSettings,
      { payload: anyServerSettingsProps }: PayloadAction<Partial<typeof serverSettings>>,
    ) => ({
      ...serverSettings,
      ...anyServerSettingsProps,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(triggerAddMeetup.matchFulfilled, (_serverSettings, { payload: _apiResponse }) => {
        _serverSettings.pathToRevalidate = "/"
      })
      .addMatcher(triggerRevalidatePath.matchFulfilled, (_serverSettings, _) => {
        _serverSettings.pathToRevalidate = "none"
      })
  },
})

const configureAppStore = () =>
  configureStore({
    reducer: {
      [meetupSlice.name]: meetupSlice.reducer,
      [serverSlice.name]: serverSlice.reducer,
      [internalApi.reducerPath]: internalApi.reducer,
    },
    devTools: true, // true : low performances with large store
  })

const store = configureAppStore()

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export type AppStore = ReturnType<typeof configureAppStore>
export const wrapper = createWrapper<AppStore>(configureAppStore)
