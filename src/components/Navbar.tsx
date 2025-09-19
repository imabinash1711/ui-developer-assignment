interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Your Logo</div>
        <div className="space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
