import { Palette, Theme, ThemeOptions } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    palette: Palette & {
      ternary: {
        main: string
      }
    }
  }

  interface CustomThemeOptions extends ThemeOptions {
    palette?: PaletteOptions & {
      ternary?: {
        main?: string
      }
    }
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme
}
