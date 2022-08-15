import { insertMeetup } from "../../services/databaseAccess"

export const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const meetup = req.body
    const insertedMeetup = await insertMeetup(meetup)

    res.status(201).json({ message: "Meetup inserted", result: insertedMeetup })
  }
}

export default handler
