import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import s from "../HomePage/HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !movies) {
    return <p>Error: {error || "Failed to fetch movies"}</p>;
  }

  return (
    <>
      <h1 className={s.title}>Popular Movies</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
