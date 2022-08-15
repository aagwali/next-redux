import { MongoClient, ObjectId } from "mongodb"

import type { MeetupItem } from "../types"

export const getAllMeetups = async (): Promise<MeetupItem[]> => {
  const client = await MongoClient.connect(
    `mongodb+srv://aagwali:${process.env.MONGO_USER_PASS}@cluster0.viveq.mongodb.net/meetups?retryWrites=true&w=majority`,
  )
  const db = client.db()

  const meetupsCollection = db.collection("meetupsCollection")

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  const cleanedMeetups = meetups.map((meetup) => ({
    title: meetup.title,
    description: meetup.description,
    address: meetup.address,
    image: meetup.image,
    id: meetup._id.toString(),
  }))

  return cleanedMeetups
}

export const getAllMeetupIds = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://aagwali:${process.env.MONGO_USER_PASS}@cluster0.viveq.mongodb.net/meetups?retryWrites=true&w=majority`,
  )
  const db = client.db()

  const meetupsCollection = db.collection("meetupsCollection")

  const meetupsIds = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray()

  client.close()

  const cleanedMeetupsIds = meetupsIds.map((meetup) => meetup._id.toString())

  return cleanedMeetupsIds
}

export const getMeetupById = async (meetupId: string): Promise<MeetupItem> => {
  const client = await MongoClient.connect(
    `mongodb+srv://aagwali:${process.env.MONGO_USER_PASS}@cluster0.viveq.mongodb.net/meetups?retryWrites=true&w=majority`,
  )
  const db = client.db()

  const meetupsCollection = db.collection("meetupsCollection")

  const meetup = (await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })) || ({} as any)

  client.close()

  return meetup
}

export const insertMeetup = async (meetup: MeetupItem): Promise<MeetupItem> => {
  const client = await MongoClient.connect(
    `mongodb+srv://aagwali:${process.env.MONGO_USER_PASS}@cluster0.viveq.mongodb.net/meetups?retryWrites=true&w=majority`,
  )
  const db = client.db()

  const meetupsCollection = db.collection("meetupsCollection")

  const insertionResult = await meetupsCollection.insertOne({ ...meetup })

  client.close()

  return { ...meetup, id: insertionResult.insertedId.toString() }
}
