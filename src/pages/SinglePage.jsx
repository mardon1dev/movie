import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAxios } from "../hooks/useAxios";
import { API_KEY, API_URL, IMAGE_URL } from "../hooks/useEnv";
import Loading from "../components/Loading/Loading";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    useAxios()
      .get(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        setTimeout(() => {
          setMovie(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full bg-gray-900 text-white min-h-screen">
      <div className="container">
        <div className="w-full pt-[100px]">
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            color="success"
            className="!w-[36px] !h-[36px]"
          >
            <ArrowBackIcon />
          </Button>

          {loading ? (
            <div className="flex items-center justify-center mt-[40px]">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start mt-[40px]">
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-[300px] h-[450px] object-cover rounded shadow-lg mb-6 md:mb-0"
              />
              <div className="md:ml-8">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="text-lg text-gray-300 italic mt-2">
                  {movie.tagline}
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  Release Date:{" "}
                  <span className="font-semibold">{movie.release_date}</span>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Runtime:{" "}
                  <span className="font-semibold">{movie.runtime} mins</span>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Genres:{" "}
                  <span className="font-semibold">
                    {movie.genres?.map((genre) => genre.name).join(", ")}
                  </span>
                </p>
                <p className="mt-4">{movie.overview}</p>
                <p className="mt-4 text-sm text-gray-400">
                  Language:{" "}
                  <span className="font-semibold">
                    {movie.spoken_languages
                      ?.map((lang) => lang.name)
                      .join(", ")}
                  </span>
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  Vote Average:{" "}
                  <span className="font-semibold">{movie.vote_average}/10</span>{" "}
                  ({movie.vote_count} votes)
                </p>
                <div className="mt-6">
                  {movie.imdb_id && (
                    <Link
                      to={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 underline"
                    >
                      View on IMDb
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
