import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../../services/api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error("Помилка при отриманні акторського складу:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) {
      getData();
    }
  }, [movieId]);

  if (loading) {
    return <p>Завантаження акторського складу...</p>;
  }

  if (error) {
    return <p>Сталася помилка: {error.message}</p>;
  }
  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Cast</h3>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li className={s.item} key={actor.id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
