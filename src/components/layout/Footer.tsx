
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DocuCommune</h3>
            <p className="text-sm">
              Simplifiez vos démarches administratives avec notre plateforme en ligne.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Liens utiles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-blue-600 transition-colors">
                  Catalogue des documents
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600 transition-colors">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <address className="text-sm not-italic">
              <p>Mairie de Commune</p>
              <p>1 Place de la Mairie</p>
              <p>75001 Paris</p>
              <p className="mt-2">
                <a href="tel:+33123456789" className="hover:text-blue-600 transition-colors">
                  Tél: 01 23 45 67 89
                </a>
              </p>
              <p>
                <a href="mailto:contact@commune.fr" className="hover:text-blue-600 transition-colors">
                  contact@commune.fr
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Horaires</h4>
            <ul className="text-sm space-y-1">
              <li>Lundi: 9h - 17h</li>
              <li>Mardi: 9h - 17h</li>
              <li>Mercredi: 9h - 17h</li>
              <li>Jeudi: 9h - 19h</li>
              <li>Vendredi: 9h - 17h</li>
              <li>Samedi: 9h - 12h</li>
              <li>Dimanche: Fermé</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} DocuCommune. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
