import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Drawer as MuiDrawer,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import { Link, useMatch } from "react-router-dom";

interface ListItemLinkProps {
  // eslint-disable-next-line react/require-default-props
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink({ icon, primary, to }: ListItemLinkProps) {
  const active = useMatch(to) !== null;
  return (
    <ListItemButton component={Link} to={to} selected={active}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

function DrawerContent() {
  return (
    <Box>
      <Toolbar />
      <List>
        <ListItemLink primary="System View" to="/system-view" />
        <ListItemLink primary="Synchronous Orbits" to="/synchronous-orbits" />
      </List>
    </Box>
  );
}

type Props = {
  // eslint-disable-next-line react/require-default-props
  width?: number;
  drawerOpen: boolean;
  onCloseMenu: () => void;
};

export default function Drawer({
  width = 240,
  drawerOpen = true,
  onCloseMenu,
}: Props) {
  return (
    <Box component="nav" sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}>
      <MuiDrawer
        variant="temporary"
        open={drawerOpen}
        onClose={onCloseMenu}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width },
        }}
      >
        <DrawerContent />
      </MuiDrawer>
      <MuiDrawer
        variant="permanent"
        sx={{
          width,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width },
        }}
        open
      >
        <DrawerContent />
      </MuiDrawer>
    </Box>
  );
}
