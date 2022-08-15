import Head from "next/head"
import { useRouter } from "next/router"
import { prop } from "rambda"

import createCache from "@emotion/cache"

import { triggerRevalidatePath } from "../services/apiHooks"
import { useAppSelector as getState } from "../storeConfig"

export const createEmotionCache = () => {
  return createCache({ key: "css" })
}

export const useTryRevalidatePath = (): void => {
  const { pathToRevalidate } = getState(prop("serverSettings"))
  const { pathname } = useRouter()
  const [revalidatePath, revalidatePathHook] = triggerRevalidatePath.useLazyQuery()

  if (pathname === pathToRevalidate && revalidatePathHook.isUninitialized) revalidatePath(pathToRevalidate)
}
