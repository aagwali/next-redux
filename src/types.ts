export type MeetupItem = {
  title: string
  address: string
  image: string
  id: string
  description: string
}

export type ApiResult<T> = { message: string; result: T }

export type RevalidationPaths = "none" | "/"

export type ServerSettings = {
  pathToRevalidate: RevalidationPaths
}

export type ServerCacheSettings = {
  maxAge: number
  revalidateGrace: number
}
