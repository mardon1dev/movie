import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { API_KEY, API_URL } from "../../hooks/useEnv";
import { useAxios } from "../../hooks/useAxios";
import MovieCard from "../../components/MovieCard";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";

const Categories = () => {
  const allgenres = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  const axios = useAxios();

  const [genres, setGenres] = useState(allgenres);
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        if (selectedGenreId) {
          const res = await useAxios().get(
            `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${selectedGenreId}`
          );
          setTimeout(() => {
            setLoading(false);
            setMovies(res.data.results);
          }, 1000);
        } else {
          const res = await useAxios().get(
            `/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`
          );
          setMovies(res.data.results);
        }
      } catch (error) {
        setError(error);
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenreId]);

  useEffect(() => {
    setLoading(true);
    useAxios()
      .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        dispatch({
          type: ACTIONS.GENRE,
          payload: res.data.genres,
        });
        setGenres(res.data.genres);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const [currentCategory, setCurrentCategory] = useState("/");

  return (
    <div className="container">
      <div className="py-[120px]">
        <div className="max-w-[880px] mx-auto">
          <h2 className="lg:text-5xl text-3xl  font-semibold text-center leading-[56px] text-white">
            Explore Our Wide Range of Movie Categorise and Genres
          </h2>
        </div>
        <ul className="w-full grid grid-cols-3 sm:grid-cols-6 md:gap-8 gap-4 py-10">
          {genres.slice(0, 6).map((genre, index) => {
            return (
              <li key={index}>
                <span
                  className={`flex items-center justify-center py-4 px-4 max-w-[160px] w-full text-[#878787] rounded cursor-pointer ${
                    currentCategory == genre.name ? "category-link" : ""
                  } hover:bg-[#fff]/10 border-[2px] border-transparent text-lg font-medium leading-6`}
                  id={genre.name}
                  onClick={(e) => {
                    setCurrentCategory(e.target.id);
                    setSelectedGenreId(genre.id);
                  }}
                >
                  {genre.name}
                </span>
              </li>
            );
          })}
        </ul>

        {movies.length > 0 ? (
          <div className="w-full">
            {loading ? (
              <div className="w-full py-[30px]">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-4">
                {movies.slice(0, 12).map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Categories;
