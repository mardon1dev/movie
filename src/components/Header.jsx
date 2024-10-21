import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";

const Header = () => {
  const routeCategory = useLocation((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSinglePage, setIsSinglePage] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.includes("movie") || location.pathname == "/") {
      setIsSinglePage(true);
    } else {
      setIsSinglePage(false);
    }
  }, [location, isSinglePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length > 0) {
      dispatch({ type: ACTIONS.QUERY, payload: searchTerm });
      navigate(`search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setOpenSearch(false);
    }
  };

  const movieCategory = [
    { value: "now_playing", label: "Now Playing" },
    { value: "upcoming", label: "Upcoming" },
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
  ];

  const [category, setCategory] = useState(movieCategory[0].value);

  const handleChange = (e) => {
    setCategory(e.target.value);
    dispatch({
      type: ACTIONS.CATEGORY,
      payload: e.target.value,
    });
    navigate("/")
  };

  return (
    <header
      className={`w-full fixed top-0 z-20 ${scrolled ? "backdrop-blur" : ""} ${
        isSinglePage ? "" : "backdrop-blur"
      }`}
    >
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
            <FormControl
              sx={{
                minWidth: 200,
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Border color when focused
                  },
                  "& .MuiSelect-icon": {
                    color: "white", // Dropdown arrow (SVG) color
                  },
                  color: "white", // Text color
                },
                "& .MuiMenuItem-root": {
                  color: "white", // Text color inside the dropdown items
                },
              }}
            >
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category}
                onChange={handleChange}
                autoWidth
              >
                {movieCategory.map((category, index) => (
                  <MenuItem
                    sx={{ width: "100%" }}
                    key={index}
                    value={category.value}
                  >
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
