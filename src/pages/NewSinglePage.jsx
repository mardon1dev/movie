import { Typography, Box, Container, Button } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { API_KEY, API_URL, IMAGE_URL } from "../hooks/useEnv";
import Loading from "../components/Loading/Loading";
import ModalWrapper from "../components/ModalWrapper";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTube from "react-youtube";

const NewSinglePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [youtubeVideos, setYoutubeVideos] = useState([]);

  useEffect(() => {
    setLoading(true);
    useAxios()
      .get(`${API_URL}movie/${id}?api_key=${API_KEY}`)
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

  useEffect(()=>{
    useAxios().get(`${API_URL}movie/${id}/videos?language=en-US`).
    then((res)=>{
      setYoutubeVideos(res.data.results)
    })
    .catch((err)=>{
      setError(err)
    })
  }, [id])

  // Display movie trailer

  // const [trailerKey, setTrailerKey] = useState(null);

  // useEffect(() => {
  //   const fetchTrailer = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await useAxios().get(
  //         `${API_URL}movie/${id}/videos?api_key=${API_KEY}`
  //       );
  //       const trailers = response.data.results;
  //       const officialTrailer = trailers.find(
  //         (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
  //       );
  //       if (officialTrailer) {
  //         setTimeout(() => {
  //           setTrailerKey(officialTrailer.key);
  //           setLoading(false);
  //         }, 1000);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching trailer:", error);
  //     }
  //   };

  //   fetchTrailer();
  // }, [id]);

  const Background = styled("div")({
    backgroundImage: `url(${
      movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : "black"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    color: "#ffffff",
    paddingTop: "100px",
  });

  const Overlay = styled("div")({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .6)",
  });

  const Content = styled(Box)({
    position: "relative",
    zIndex: 2,
    maxWidth: "1200px",
    padding: "20px",
    textAlign: "left",
  });

  const Title = styled(Typography)({
    fontSize: "3rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: "20px",
  });

  const InfoText = styled(Typography)({
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#9ca3af",
  });

  const Overview = styled(Typography)({
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#ffffff",
    lineHeight: 1.6,
  });

  const IMDbLink = styled(Link)({
    color: "#10b981",
    textDecoration: "underline",
    "&:hover": {
      color: "#059669",
    },
  });

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Typography color="error">
          Failed to load movie data. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <Background>
      <Overlay />
      <Container>
        <Content>
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="success"
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Title sx={{ marginTop: "30px" }}>{movie.title}</Title>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            {movie.tagline}
          </Typography>
          <InfoText variant="body2">
            Release Date: <strong>{movie.release_date}</strong>
          </InfoText>
          <InfoText variant="body2">
            Runtime: <strong>{movie.runtime} mins</strong>
          </InfoText>
          <InfoText variant="body2">
            Genres:{" "}
            <strong>
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </strong>
          </InfoText>
          <Overview variant="body1">{movie.overview}</Overview>
          <InfoText variant="body2">
            Language:{" "}
            <strong>
              {movie.spoken_languages?.map((lang) => lang.name).join(", ")}
            </strong>
          </InfoText>
          <InfoText variant="body2">
            Vote Average: <strong>{movie.vote_average}/10</strong> (
            {movie.vote_count} votes)
          </InfoText>
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            className="!bg-[#F14141] py-1 !capitalize !font-semibold flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <span className="m-0">Watch Trailer</span>
            <PlayCircleIcon />
          </Button>
          <Box mt={2}>
            {movie.imdb_id && (
              <IMDbLink
                to={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on IMDb
              </IMDbLink>
            )}
          </Box>
          <Typography className="!mt-5">
            Vidoes about {movie.title}
          </Typography>
          <div className="w-full flex items-center justify-between flex-wrap mt-5 gap-5">
            {
              youtubeVideos?.slice(0,6).map((item, index) => <YouTube className="w-[32%]" videoId={item.key} id={item.id} key={index} /> )
            }
          </div>
        </Content>
        {/* <ModalWrapper open={open} handleClose={handleClose}>
          {trailerKey ? (
            <div
              style={{
                position: "relative", 
                height: "100%",
                overflow: "hidden",
                maxWidth: "100%",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allow="autoplay; fullscreen"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "90%",
                  marginTop:"20px"
                }}
                frameBorder="0"
                loading="lazy"
                allowFullScreen
                title="YouTube Trailer"
              ></iframe>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center h-full">
              <Typography color="error">
                No trailer available for this movie.
              </Typography>
            </div>
          )}
        </ModalWrapper> */}
      </Container>
    </Background>
  );
};

export default NewSinglePage;
