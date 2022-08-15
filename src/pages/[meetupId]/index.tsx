import Head from "next/head"
import { Fragment } from "react"

import MeetupDetail from "../../components/meetups/MeetupDetail"
import { getMeetupById } from "../../services/databaseAccess"
import { wrapper } from "../../storeConfig"
import { setCache, standardCache } from "../../utilities/serverSide"

const MeetupDetails = ({ meetup }: any) => (
  <Fragment>
    <Head>
      <title> {meetup.title} </title>
      <meta name="description" content={meetup.description} />
    </Head>
    <MeetupDetail image={meetup.image} title={meetup.title} adress={meetup.adress} description={meetup.description} />
  </Fragment>
)

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ res, params }) => {
  setCache(standardCache, res)

  const meetupId = params?.meetupId as string

  const meetup = await getMeetupById(meetupId)

  return {
    props: {
      meetup: {
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  }
})

export default MeetupDetails
