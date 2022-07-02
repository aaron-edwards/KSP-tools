import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import GeosyncPage from "./Pages/Geosync";

export interface RouteWithTitle extends RouteObject {
  title?: string;
}

export default [
  {
    path: "/",
    element: <Navigate to="/synchronous-orbits" replace />,
  },
  {
    path: "/synchronous-orbits",
    element: <GeosyncPage />,
    title: "Synchronus Orbits",
  },
];
