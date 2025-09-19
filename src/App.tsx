import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-600">
              About
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
