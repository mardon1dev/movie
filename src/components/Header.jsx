import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { PATH } from "../hooks/usePath";
import NavbarLink from "./NavbarLink";
import { Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length > 0) {
      dispatch({ type: ACTIONS.QUERY, payload: searchTerm });
      navigate(`search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setOpenSearch(false);
    }
  };

  const navlinks = [
    { name: "Movies", path: PATH.movies },
    { name: "Series", path: PATH.series },
    { name: "TV-shows", path: PATH.tv_shows },
  ];

  return (
    <header className="w-full fixed top-0 backdrop-blur z-20">
      <div className="container">
        <div className="py-[20px] flex items-center justify-between gap-20">
          <Link to={"/"}>
            <img
              className="w-[187px] h-[40px]"
              src={Logo}
              alt="A film streaming platfomr"
              width={187}
              height={40}
            />
          </Link>
          <div className="flex w-full items-center justify-between">
            <nav>
              <ul>
                {navlinks.map((item, index) => (
                  <NavbarLink link={item} key={index} />
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <form
                className="flex items-center relative"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`h-[56px] bg-transparent outline-none border-[1px] border-[#383838] rounded text-white px-4 duration-200 ${
                    openSearch ? "w-[250px] mr-[64px]" : "w-[64px]"
                  } `}
                  placeholder="Search movie"
                />
                <Button
                  type="submit"
                  onClick={() => setOpenSearch(!openSearch)}
                  variant="outlined"
                  className="h-[56px] border-[1px] !border-[#383838] !bg-[#000] !absolute top-0 right-0"
                >
                  <SearchIcon className="text-white !w-[24px] !h-[24px]" />
                </Button>
              </form>
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
      </div>
    </header>
  );
};

export default Header;
