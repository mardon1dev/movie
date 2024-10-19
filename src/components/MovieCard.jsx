import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IMAGE_URL } from "../hooks/useEnv";
import { useNavigate } from "react-router-dom";
import NoImage from "../assets/images/noimage.jpg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "100%" }} className="justify-between flex flex-col">
      <div>
        <CardMedia
          component="img"
          className="!object-cover w-full cursor-pointer"
          image={
            movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : NoImage
          }
          alt={movie.title}
          sx={{ height: "300px" }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
        <CardContent>
          <Typography
            variant="h5"
            sx={{ color: "MenuText", marginBottom: "10px" }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            className="line-clamp-3"
          >
            {movie.overview}
          </Typography>
        </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
