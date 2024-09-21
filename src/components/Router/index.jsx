import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/home"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
