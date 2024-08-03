import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import s from "../HomePage/HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await fetchMovies();
        setMovies(data);
      };
      getData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !movies) {
    return <p>Error: Failed to fetch movies</p>;
  }
  return (
    <>
      <h1 className={s.title}>Popular Movies</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
