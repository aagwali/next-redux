import type { ServerResponse } from "http"
import { ServerCacheSettings } from "../types"

export const standardCache: ServerCacheSettings = { maxAge: 10, revalidateGrace: 59 }

export const setCache = ({ maxAge, revalidateGrace }: ServerCacheSettings, res: ServerResponse): void => {
  res.setHeader("Cache-Control", `public, s-maxage=${maxAge}, stale-while-revalidate=${revalidateGrace}`)
}
