import { Box, Button, Typography, styled, Container } from "@mui/material";
import React from "react";
import { IMAGE_URL } from "../../hooks/useEnv";
import { Title } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const SwiperSlideSingle = ({ movie }) => {
    
    const navigate = useNavigate()
  const Background = styled("div")({
    backgroundImage: `url(${
      movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : "black"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
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
    height: "100%",
  });

  const Content = styled(Box)({
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    height: "80vh",
    margin: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
  });

  const Overview = styled(Typography)({
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#ffffff",
    lineHeight: 1.6,
  });
  return (
    <Background>
      <Overlay />
      <Container>
        <Content>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            {movie.title}
          </Typography>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            {movie.tagline}
          </Typography>
          <Overview variant="body1">{movie.overview}</Overview>
          <div className="flex justify-center mt-8 space-x-6">
            <Button
            onClick={()=>navigate(`/movie/${movie.id}`)}
              variant="contained"
              className="h-[56px] !bg-[#F14141] !capitalize !font-semibold flex items-center gap-2"
            >
              <span className="m-0">Watch Trailer</span>
              <PlayCircleIcon />
            </Button>
          </div>
        </Content>
      </Container>
    </Background>
  );
};

export default SwiperSlideSingle;
