import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAxios } from "../hooks/useAxios";
import { API_KEY, API_URL, IMAGE_URL } from "../hooks/useEnv";
import Loading from "../components/Loading/Loading";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
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
  }, []);
  return (
    <div className="w-full">
      <div className="container">
        <div className="min-h-screen pt-[100px] w-full">
          <div className="w-full">
            <Button
              onClick={() => navigate(-1)}
              variant="text"
              color="success"
              className="!w-[36px] !h-[36px]"
            >
              <ArrowBackIcon />
            </Button>
          </div>
          <div className="flex w-full">
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white">
                <img
                  src={`${IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[300px] h-[450px] object-cover"
                />
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p>{movie.overview}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
