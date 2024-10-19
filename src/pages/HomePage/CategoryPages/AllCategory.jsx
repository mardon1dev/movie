import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../hooks/useEnv";
import { useAxios } from "../../../hooks/useAxios";
import MovieCard from "../../../components/MovieCard";

const AllCategory = () => {
  const axios = useAxios();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`)
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="flex">
      {loading ? (
        <div></div>
      ) : (
        <div className="flex flex-wrap justify-start gap-14">
          {movies.slice(0,6).map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategory;
