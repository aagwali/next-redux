import { createTheme } from "@mui/material"
import { blue, orange } from "@mui/material/colors"

// check default theme to get an idea of what a theme should look like
// https://mui.com/material-ui/customization/default-theme/
const weezuTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    ternary: {
      main: orange[500],
    },
  },
})

export default weezuTheme
