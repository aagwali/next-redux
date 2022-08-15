import { AppProps } from "next/app"
import React, { FC } from "react"
import { Provider } from "react-redux"

import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"

import HeaderBanner from "../components/headerBanner"
import { wrapper } from "../storeConfig"
import { BodyContent } from "../styles"
import weezuTheme from "../styles/theme/weezuTheme"
import { createEmotionCache } from "../utilities/clientSide"

const clientSideEmotionCache = createEmotionCache()

const MyApp: FC<AppProps> = ({ Component, emotionCache = clientSideEmotionCache, ...rest }: any) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={weezuTheme}>
        <CssBaseline />
        <Provider store={store}>
          <HeaderBanner />
          <BodyContent>
            <Component {...props.pageProps} />
          </BodyContent>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
