import Head from "next/head"
import { Fragment } from "react"

import MeetupList from "../components/meetups/MeetupList"
import { getAllMeetups } from "../services/databaseAccess"
import { meetupSelector, meetupSlice, useAppSelector as getState, wrapper } from "../storeConfig"
import { useTryRevalidatePath } from "../utilities/clientSide"

const HomePage = () => {
  useTryRevalidatePath()
  const meetups = getState(meetupSelector.selectAll)
  return (
    <Fragment>
      <Head>
        <title> Some meetups </title>
        <meta name="description" content="Meta description that will be shown in search engine" />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const meetups = await getAllMeetups()

  store.dispatch(meetupSlice.actions.setMeetups(meetups))

  return { props: {} }
})

export default HomePage
