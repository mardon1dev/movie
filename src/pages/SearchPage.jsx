import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { API_KEY, API_URL } from "../hooks/useEnv";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const query = useSelector((state) => state.query);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async (query) => {
      setMovies([]);
      setLoading(true);
      try {
        const res = await useAxios().get(
          `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        );
        setTimeout(() => {
          setLoading(false);
          setMovies(res.data.results);
        }, 1000);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    searchMovies(query);
  }, [query]);

  console.log(query);

  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full py-[100px]">
          <h2 className="text-lg font-bold mb-4 text-white capitalize">
            Movies searched - {query}
          </h2>
          <div>
            {loading ? (
              <div className="w-full py-[30px]">
                <Loading />
              </div>
            ) : movies && movies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-4">
                {movies.slice(0, 12).map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
                ))}
              </div>
            ) : (
              <div className="py-[20px]">
                <p className="font-bold text-3xl text-white text-center">
                  No films are found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
