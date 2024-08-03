import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [moviesId, setMoviesId] = useState(null);
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    try {
      const getDataId = async () => {
        const data = await fetchMoviesById(movieId);
        setMoviesId(data);
      };
      getDataId();
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [movieId]);

  if (error) {
    return <p>Сталася помилка: {error.message}</p>;
  }

  if (!moviesId) {
    return <p>Завантаження...</p>;
  }

  return (
    <>
      <div>
        <div className={s.wrapper}>
          <Link className={s.goback} to={backLinkHref}>
            Go back
          </Link>
          <div className={s.img}>
            <img
              src={`https://image.tmdb.org/t/p/w500${moviesId.poster_path}`}
              alt={moviesId.title}
            />
          </div>
          <ul className={s.list}>
            <li>
              <h2>{moviesId.title}</h2>
            </li>
            <li>
              <p>Release: {moviesId.release_date}</p>
            </li>
            <li>
              <p>Popularity: {moviesId.popularity}</p>
            </li>
            <li>
              <p>Runtime: {moviesId.runtime} min</p>
            </li>
            <li>
              <h3>Genres:</h3>
              <ul className={s.genres_list}>
                {moviesId.genres.map((gener) => (
                  <li key={gener.id}>{gener.name}</li>
                ))}
              </ul>
            </li>
            <li>
              <h3>Overview:</h3>
              <p>{moviesId.overview}</p>
            </li>
            <li>
              <h4>
                Rating of the viewers: {moviesId.vote_average} (
                {moviesId.vote_count} votes)
              </h4>
            </li>
          </ul>
        </div>
        <nav>
          <ul className={s.btn_list}>
            <li className={s.btn_item}>
              <NavLink
                className={s.btn_link}
                to="cast"
                state={{ from: location.state?.from }}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.btn_item}>
              <NavLink
                className={s.btn_link}
                to="reviews"
                state={{ from: location.state?.from }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;
