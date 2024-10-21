import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, NewSinglePage, SearchPage } from "../pages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/:id" element={<NewSinglePage />} />
    </Routes>
  );
};

export default Routers;
