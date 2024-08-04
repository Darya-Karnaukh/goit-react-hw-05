import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { fetchMoviesByName } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      if (query) {
        try {
          const data = await fetchMoviesByName(query);
          setMovies(data.results);
        } catch (error) {
          toast.error("Error fetching movies");
        }
      }
    };

    getMovies();
  }, [query]);

  const onSubmit = (values, actions) => {
    setSearchParams({ query: values.input });
    actions.resetForm();
  };

  return (
    <div>
      <Toaster position="top-right" />
      <Formik
        initialValues={{ input: query }}
        onSubmit={(values, actions) => {
          if (!values.input) {
            toast.error("Please enter text to search for movies");
          } else {
            onSubmit(values, actions);
          }
        }}
      >
        {() => (
          <Form className={s.form}>
            <Field
              name="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
