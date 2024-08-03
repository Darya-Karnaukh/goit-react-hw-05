import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data.results || []);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
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
    return <p>Loading reviews..</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.item} key={review.id}>
              <h4 className={s.author}>{review.author}</h4>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default MovieReviews;
