import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, NewSinglePage, Profile, SearchPage } from "../pages";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/:id" element={<NewSinglePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
