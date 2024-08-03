import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Not Found Page 404</h1>
      <Link to="/"> Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;
