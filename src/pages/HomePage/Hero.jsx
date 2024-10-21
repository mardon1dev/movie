import React, { useEffect, useState } from "react";
import Swiper from "../../components/Swiper/Swiper";
import { API_KEY, API_URL } from "../../hooks/useEnv";
import { useAxios } from "../../hooks/useAxios";
import { useSelector } from "react-redux";

import "./home.css";
import Loading from "../../components/Loading/Loading";

const Hero = () => {
  const category = useSelector((state) => state.category);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    useAxios()
      .get(
        `${API_URL}movie/${category}?language=en-US&page=1&api_key=${API_KEY}`
      )
      .then((res) => {
        setTimeout(() => {
          setMovies(res.data.results);
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
        setLoading(false);
      });
  }, [category]);
  return (
    <div className="hero">
      {loading ? (
        <div className="w-full flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="w-full">
          <Swiper data={movies} />
        </div>
      )}
    </div>
  );
};

export default Hero;
