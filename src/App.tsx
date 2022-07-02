import { Box, Container, Toolbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useRoutes } from "react-router-dom";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import routes from "./routes";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(
    () => setDrawerOpen((open) => !open),
    [setDrawerOpen]
  );
  const element = useRoutes(routes);
  return (
    <>
      <AppBar handleDrawerToggle={toggleDrawer} />
      <Drawer drawerOpen={drawerOpen} onCloseMenu={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          p: 3,
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {element}
        </Container>
      </Box>
    </>
  );
}

export default App;
