import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { API_KEY, API_URL } from "../../hooks/useEnv";
import { useAxios } from "../../hooks/useAxios";
import MovieCard from "../../components/MovieCard";
import "./home.css";

const Categories = () => {
  const axios = useAxios();

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        setGenres(res.data.genres);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${selectedGenreId}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
      });
  }, [selectedGenreId]);

  const [currentCategory, setCurrentCategory] = useState("/");

  return (
    <div className="container">
      <div className="py-[120px]">
        <div className="max-w-[880px] mx-auto">
          <h2 className="text-5xl font-semibold text-center leading-[56px] text-white">
            Explore Our Wide Range of Movie Categorise and Genres
          </h2>
        </div>
        <ul className="w-full flex items-center pt-[56px] pb-[40px] justify-between overflow-x-scroll">
          {loading ? (
            <div>Loading...</div>
          ) : (
            genres.map((genre) => {
              return (
                <li key={genre.id}>
                  <Link
                    className={`flex items-center justify-center py-4 w-[160px] text-[#878787] rounded ${
                      currentCategory == genre.name ? "category-link" : ""
                    } hover:bg-[#fff]/10 border-[2px] border-transparent text-lg font-medium leading-6`}
                    // to={genre.name.toLowerCase()}
                    id={genre.name}
                    onClick={(e) => {
                      setCurrentCategory(e.target.id);
                      setSelectedGenreId(genre.id);
                    }}
                  >
                    {genre.name}
                  </Link>
                </li>
              );
            })
          )}
        </ul>

        {movies.length > 0 ? (
          <div className="flex">
            {loading ? (
              <div></div>
            ) : (
              <div className="flex flex-wrap justify-start gap-14">
                {movies.slice(0, 6).map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Categories;
