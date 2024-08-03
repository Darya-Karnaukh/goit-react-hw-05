import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGRhODVhMDUwNTg2MjI2ZWY2NjBmYmI0YThmMjRiYyIsIm5iZiI6MTcyMjUzMjkyNy43MTAwNCwic3ViIjoiNjZhYmMyNmY1OWJhYjc4ZGI3MGIyM2EzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Wzmj6eG4hEQ02PqLJKKqHcaZDxWo80QLfhqmpjLkCH4";

export const fetchMovies = async () => {
  try {
    const response = await axios.get("trending/movie/day?language=en-US");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMoviesById = async (id) => {
  try {
    const response = await axios.get(`movie/${id}`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchCast = async (id) => {
  try {
    const response = await axios.get(`movie/${id}/credits`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const fetchReviews = async (movieId) => {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export const fetchMoviesByName = async (name) => {
  try {
    const response = await axios.get("search/movie", {
      params: {
        query: name,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by name:", error);
    throw error;
  }
};
