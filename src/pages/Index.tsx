
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Search, Clock, MessageSquare, User, Calendar } from "lucide-react";

const Index = () => {
  const services = [
    {
      icon: <Search className="h-10 w-10 text-blue-600" />,
      title: "Consultation",
      description: "Consultez les documents disponibles et les pièces à fournir"
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      title: "Dépôt de demandes",
      description: "Déposez vos demandes administratives en ligne"
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: "Suivi",
      description: "Suivez l'état d'avancement de vos demandes"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-600" />,
      title: "Communication",
      description: "Échangez avec les agents municipaux"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Créez un compte",
      description: "Inscrivez-vous en quelques clics pour accéder à vos services"
    },
    {
      number: "02",
      title: "Choisissez un document",
      description: "Sélectionnez le document dont vous avez besoin"
    },
    {
      number: "03",
      title: "Envoyez votre demande",
      description: "Remplissez le formulaire et joignez les pièces justificatives"
    },
    {
      number: "04",
      title: "Recevez votre document",
      description: "Récupérez votre document en mairie une fois prêt"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-4">
                Simplifiez vos démarches administratives
              </h1>
              <p className="text-xl mb-6">
                Demandez, suivez et recevez vos documents administratifs sans vous déplacer en mairie.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link to="/documents">Voir les documents</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-blue-600">
                  <Link to="/register">Créer un compte</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-white rounded-lg p-6 shadow-xl w-96">
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-800">Dernières demandes</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Carte d'identité</span>
                      <span className="text-green-600 font-medium">Prêt à retirer</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Acte de naissance</span>
                      <span className="text-blue-600 font-medium">En traitement</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-800">Informations</h2>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Horaires d'ouverture:</p>
                    <p>Lun-Ven: 9h-17h</p>
                    <p>Samedi: 9h-12h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos services en ligne</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              DocuCommune vous permet d'effectuer toutes vos démarches administratives depuis votre domicile, en toute simplicité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En quelques étapes simples, obtenez les documents dont vous avez besoin sans vous déplacer en mairie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <span className="text-5xl font-bold text-blue-100 absolute top-0 left-0">
                  {step.number}
                </span>
                <div className="pt-12">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/register">Commencer maintenant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-200">Citoyens inscrits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-200">Demandes traitées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Types de documents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-blue-200">Délai de réponse moyen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les expériences de nos utilisateurs avec notre plateforme.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-blue-600 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">★</span>
                  ))}
                </div>
                <p className="text-lg italic mb-6">
                  "J'ai pu renouveler ma carte d'identité sans avoir à prendre un jour de congé pour me rendre en mairie. Le système de suivi m'a permis de savoir exactement où en était ma demande. Excellent service !"
                </p>
                <div>
                  <h4 className="font-semibold">Marie L.</h4>
                  <p className="text-gray-600">Utilisatrice depuis 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à simplifier vos démarches ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Inscrivez-vous dès maintenant et commencez à effectuer vos demandes administratives en ligne.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Créer un compte</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
