import { Link } from "react-router-dom";
import { useTheme } from "../context/use-theme";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
