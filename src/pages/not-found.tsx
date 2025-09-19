import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-light-black dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-4 text-blue-600 hover:underline dark:text-blue-400"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
