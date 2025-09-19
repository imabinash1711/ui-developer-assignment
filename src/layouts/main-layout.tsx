import Navbar from "../components/nav-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-light-black transition-colors duration-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
