import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SearchPage, Series, SinglePage, TVShows } from "../pages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/series" element={<Series />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/movie/:id" element={<SinglePage />} />
    </Routes>
  );
};

export default Routers;
