import { ACTIONS } from "./actions";

const initialState = {
  genres: [],
  query: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GENRE:
      return { ...state, genres: action.payload };
    case ACTIONS.QUERY:
      return {
        genres: state.genres,
        query: action.payload,
      }
    default:
      return state;
  }
};
