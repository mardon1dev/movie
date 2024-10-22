import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IMAGE_URL } from "../hooks/useEnv";
import { useNavigate } from "react-router-dom";
import NoImage from "../assets/images/noimage.jpg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";

export default function MovieCard({ movie }) {
  const allLikedMovies = useSelector((state) => state.liked);
  const allSavedMovies = useSelector((state) => state.saved);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLiked = allLikedMovies.some((m) => m.id === movie.id);
  const isSaved = allSavedMovies.some((m) => m.id === movie.id);

  return (  
    <Card
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "gray",
      }}
    >
      <div className="w-full">
        <CardMedia
          component="img"
          className="cursor-pointer !object-cover"
          image={
            movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : NoImage
          }
          alt={movie.title}
          sx={{ height: 300 }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
        <CardContent>
          <Typography variant="h5" sx={{ color: "MenuText", mb: 1 }}>
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-3"
          >
            {movie.overview ? movie.overview : "No info available"}
          </Typography>
        </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to liked"
          onClick={() => {
            dispatch({ type: ACTIONS.ADD_TO_LIKED, payload: movie });
          }}
        >
          <FavoriteIcon sx={{ color: `${isLiked ? "red" : "white"}` }} />
        </IconButton>
        <IconButton
          aria-label="add to saved"
          onClick={() => {
            dispatch({
              type: ACTIONS.ADD_TO_WATCHLIST, payload: movie});
          }}
        >
          <BookmarkIcon
            sx={{ color: `${isSaved ? "green" : "white"}` }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
