import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

import weezuTheme from "./theme/weezuTheme"

export const BodyContent = styled(Box)`
  margin: ${weezuTheme.spacing(6, "auto")};
  width: 90%;
  max-width: ${weezuTheme.spacing(80)};
`
