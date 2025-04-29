
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocumentCard from "@/components/dashboard/DocumentCard";
import { Input } from "@/components/ui/input";
import { dummyDocuments } from "@/utils/dummyData";
import { Search } from "lucide-react";

const DocumentCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Obtenir toutes les catégories uniques (simulé)
  const categories = [
    "Identité",
    "Famille",
    "Logement",
    "Urbanisme",
    "Administration"
  ];

  // Filtrer les documents en fonction de la recherche et de la catégorie
  const filteredDocuments = dummyDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Pour la démo, nous simulerons les catégories par des mots-clés dans la description
    let matchesCategory = true;
    if (selectedCategory) {
      matchesCategory = doc.description.includes(selectedCategory);
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Catalogue des documents</h1>
            <p className="text-gray-600">
              Consultez les documents disponibles et les démarches que vous pouvez effectuer en ligne.
            </p>
          </div>

          {/* Recherche et filtres */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === null
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Toutes
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Liste des documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 mb-2">Aucun document ne correspond à votre recherche.</p>
                <p className="text-gray-500">Veuillez essayer d'autres termes ou catégories.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentCatalog;
