import React from "react";

import { Button } from "@mui/material";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./home.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="flex flex-col items-center py-[200px] justify-center">
          <div className="max-w-[880px] mx-auto text-white">
            <h1 className="text-5xl font-semibold text-center leading-[56px]">
              Solaris Synchrony: a Celestial Odyssey of Hope and Harmony
            </h1>
            <p className="text-lg font-medium leading-6 text-center text-[#878787] mt-6">
              Against the backdrop of a dying Earth, a group of scientists races
              to execute a daring plan to synchronize the consciousness of
              humanity with a new solar system. "Solaris Synchrony" is a
              gripping.
            </p>
            <div className="flex justify-center mt-8 space-x-6">
              <Button
                variant="contained"
                className="h-[56px] !bg-[#F14141] !capitalize !font-semibold flex items-center gap-2"
              >
                <span className="m-0">Watch Trailer</span>
                <PlayCircleIcon />
              </Button>
              <Button
                variant="outlined"
                className="h-[56px] !capitalize !font-semibold !text-white"
                color="error"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
