import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { PATH } from "../hooks/usePath";
import NavbarLink from "./NavbarLink";
import { Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const navlinks = [
    { name: "Movies", path: PATH.movies },
    { name: "Series", path: PATH.series },
    { name: "TV-shows", path: PATH.tv_shows },
  ];

  return (
    <header className="w-full fixed top-0 backdrop-blur z-20">
      <div className="container">
        <div className="py-[20px] flex items-center justify-between">
          <Link to={"/"}>
            <img
              className="w-[187px] h-[40px]"
              src={Logo}
              alt="A film streaming platfomr"
              width={187}
              height={40}
            />
          </Link>
          <nav>
            <ul>
              {navlinks.map((item, index) => (
                <NavbarLink link={item} key={index} />
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              className="h-[56px] border-[1px] !border-[#383838] !bg-transparent"
            >
              <SearchIcon className="text-white !w-[24px] !h-[24px]" />
            </Button>
            <Button
              variant="contained"
              className="h-[56px] !bg-red-700 !capitalize !font-semibold"
            >
              Subscribe
            </Button>
            <Button
              variant="outlined"
              className="h-[56px] !capitalize !font-semibold"
              color="error"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
