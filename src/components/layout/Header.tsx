
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/utils/dummyData";
import { FileText, User } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Vérifier l'utilisateur à chaque montage du composant
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold text-xl">DocuCommune</span>
          </Link>

          {/* Menu pour bureau */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/documents" className="hover:text-blue-200 transition-colors">
              Catalogue
            </Link>
            {user ? (
              <>
                <Link 
                  to={user.role === "admin" ? "/admin-dashboard" : "/citizen-dashboard"} 
                  className="hover:text-blue-200 transition-colors"
                >
                  Tableau de bord
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" className="bg-transparent border-white hover:bg-blue-600">
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="outline" className="bg-transparent border-white hover:bg-blue-600">
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-white text-blue-700 hover:bg-blue-100">
                  <Link to="/register">Inscription</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Hamburger pour mobile */}
          <button 
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link 
              to="/documents" 
              className="hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogue
            </Link>
            {user ? (
              <>
                <Link 
                  to={user.role === "admin" ? "/admin-dashboard" : "/citizen-dashboard"}
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="bg-transparent border-white hover:bg-blue-600">
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button 
                  asChild 
                  variant="outline" 
                  className="bg-transparent border-white hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-white text-blue-700 hover:bg-blue-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/register">Inscription</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
