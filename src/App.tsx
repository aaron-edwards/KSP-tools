import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import AppBar from "./AppBar";
import GeosyncPage from "./Pages/Geosync";

function App() {
  return (
    <>
      <AppBar />
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
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <GeosyncPage />
        </Container>
      </Box>
    </>
  );
}

export default App;
