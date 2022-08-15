const handler = async (req: any, res: any) => {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }
  if (!req.query.path) {
    return res.status(400).json({ message: "Path must be provided" })
  }
  try {
    await res.unstable_revalidate(req.query.path)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send("Error revalidating")
  }
}

export default handler
