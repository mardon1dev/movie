import { ACTIONS } from "./actions";

const initialState = {
  genres: [],
  query: JSON.parse(localStorage.getItem("query")) || "",
  category: "now_playing",
  liked: JSON.parse(localStorage.getItem("liked")) || [],
  saved: JSON.parse(localStorage.getItem("saved")) || [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GENRE:
      return {
        genres: state.genres,
        query: state.query,
        category: state.category,
        liked: state.liked,
        saved: state.saved,
      };
    case ACTIONS.QUERY:
      const newQuery = action.payload;
      localStorage.setItem("query", JSON.stringify(newQuery));
      return {
        genres: state.genres,
        query: newQuery,
        category: state.category,
        liked: state.liked,
        saved: state.saved,
      };
    case ACTIONS.CATEGORY:
      return {
        genres: state.genres,
        query: state.query,
        category: action.payload,
        liked: state.liked,
        saved: state.saved,
      };
    case ACTIONS.ADD_TO_LIKED:
      const movieLiked = action.payload;
      const movieLikedExists = state.liked.find((m) => m.id === movieLiked.id);
      const newMovieLiked = movieLikedExists
        ? state.liked.filter((m) => m.id !== movieLiked.id)
        : [...state.liked, movieLiked];
      localStorage.setItem("liked", JSON.stringify(newMovieLiked));
      return {
        genres: state.genres,
        query: state.query,
        category: state.category,
        liked: newMovieLiked,
        saved: state.saved,
      };
    case ACTIONS.ADD_TO_WATCHLIST:
      const movieSaved = action.payload;
      const movieSavedExists = state.saved.find((m) => m.id === movieSaved.id);
      const newMovieSaved = movieSavedExists
        ? state.saved.filter((m) => m.id !== movieSaved.id)
        : [...state.saved, movieSaved];
      localStorage.setItem("saved", JSON.stringify(newMovieSaved));
      return {
        genres: state.genres,
        query: state.query,
        category: state.category,
        liked: state.liked,
        saved: newMovieSaved,
      };
    default:
      return state;
  }
};
