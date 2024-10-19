import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Series, SinglePage, TVShows } from "../pages";
import {
  AllCategory,
} from "../pages/HomePage/CategoryPages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<AllCategory />} />
      </Route>
      <Route path="/series" element={<Series />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/movie/:id" element={<SinglePage />} />

    </Routes>
  );
};

export default Routers;
