import React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { matchRoutes, useLocation } from "react-router-dom";
import routes, { RouteWithTitle } from "./routes";

type Props = {
  handleDrawerToggle: () => void;
};

export default function AppBar({ handleDrawerToggle }: Props) {
  const location = useLocation();
  const title = matchRoutes(routes, location)
    ?.map(({ route }) => (route as RouteWithTitle).title)
    ?.find((t) => t);

  return (
    <MuiAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" sx={{ gap: 1, alignItems: "baseline" }}>
          <Typography component="h1" variant="h6" noWrap>
            KSP Tools
          </Typography>
          {title && (
            <Typography component="h2" variant="subtitle2" noWrap>
              {title}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
