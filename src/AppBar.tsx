import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

export default function AppBar() {
  return (
    <MuiAppBar>
      <Toolbar>
        <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
          KSP Tools
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
