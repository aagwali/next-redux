import { Box, Link, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"

import weezuTheme from "../../styles/theme/weezuTheme"

export const HeaderCanvas = styled(Box)`
  width: 100%;
  height: ${weezuTheme.spacing(10)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${weezuTheme.palette.primary.main};
  padding: 0 10%;
`

export const HeaderTitle = styled(Box)`
  font-size: ${weezuTheme.typography.h4};
  color: ${weezuTheme.palette.primary.contrastText};
  font-weight: ${weezuTheme.typography.fontWeightBold};
`

export const HeaderStack = styled(Stack)`
  flex-direction: row;
`

export const HeaderLink = styled(Link)`
  margin-left: ${weezuTheme.spacing(6)};
  font-size: ${weezuTheme.typography.h5};
  color: ${weezuTheme.palette.primary.contrastText};
  :hover {
    color: ${weezuTheme.palette.action.hover};
  }
  :active {
    color: ${weezuTheme.palette.secondary.contrastText};
  }
`
