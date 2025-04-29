
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Mail, Phone, Home, Clock, Plus, FilePlus } from "lucide-react";
import RequestCard from "@/components/dashboard/RequestCard";
import { simulateApiCall, getCurrentUser, dummyRequests } from "@/utils/dummyData";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [requests, setRequests] = useState<typeof dummyRequests>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et est un citoyen
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role !== "citizen") {
      navigate("/admin-dashboard");
      return;
    }

    setUser(currentUser);

    // Charger les demandes de l'utilisateur
    const loadRequests = async () => {
      setIsLoading(true);
      try {
        // Simuler un appel API pour récupérer les demandes de l'utilisateur
        const userRequests = await simulateApiCall(
          dummyRequests.filter(req => req.userId === currentUser.id)
        );
        setRequests(userRequests);
      } catch (error) {
        console.error("Erreur lors du chargement des demandes", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, [navigate]);

  // Filtrer les demandes par statut pour les onglets
  const activeRequests = requests.filter(
    req => ["pending", "reviewing", "additional-info"].includes(req.status)
  );
  const completedRequests = requests.filter(
    req => ["approved", "ready"].includes(req.status)
  );
  const allRequests = requests;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-tête du tableau de bord */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-gray-600">
              Bienvenue, {user?.name}. Consultez et gérez vos demandes administratives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale - Demandes */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 flex justify-between items-center border-b">
                  <h2 className="text-xl font-semibold">Mes demandes</h2>
                  <Button asChild>
                    <Link to="/documents">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle demande
                    </Link>
                  </Button>
                </div>
                
                <Tabs defaultValue="active" className="p-6">
                  <TabsList>
                    <TabsTrigger value="active">En cours ({activeRequests.length})</TabsTrigger>
                    <TabsTrigger value="completed">Terminées ({completedRequests.length})</TabsTrigger>
                    <TabsTrigger value="all">Toutes ({allRequests.length})</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-4">
                    <TabsContent value="active">
                      {isLoading ? (
                        <div className="py-10 text-center text-gray-500">Chargement...</div>
                      ) : activeRequests.length > 0 ? (
                        <div className="space-y-4">
                          {activeRequests.map((request) => (
                            <RequestCard key={request.id} request={request} />
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center">
                          <FilePlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-500 mb-4">Vous n'avez pas de demande en cours.</p>
                          <Button asChild>
                            <Link to="/documents">Faire une demande</Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      {isLoading ? (
                        <div className="py-10 text-center text-gray-500">Chargement...</div>
                      ) : completedRequests.length > 0 ? (
                        <div className="space-y-4">
                          {completedRequests.map((request) => (
                            <RequestCard key={request.id} request={request} />
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center text-gray-500">
                          Aucune demande terminée
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="all">
                      {isLoading ? (
                        <div className="py-10 text-center text-gray-500">Chargement...</div>
                      ) : allRequests.length > 0 ? (
                        <div className="space-y-4">
                          {allRequests.map((request) => (
                            <RequestCard key={request.id} request={request} />
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center">
                          <FilePlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-500 mb-4">Vous n'avez pas encore de demande.</p>
                          <Button asChild>
                            <Link to="/documents">Faire votre première demande</Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* Colonne latérale - Profil et informations */}
            <div className="space-y-6">
              {/* Profil */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Mon profil
                  </CardTitle>
                  <CardDescription>Vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <User className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nom</p>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <Mail className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>

                    {user?.phone && (
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Phone className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                    )}

                    {user?.address && (
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Home className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Adresse</p>
                          <p className="font-medium">{user.address}</p>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" variant="outline">Modifier mon profil</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Documents récents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents récents
                  </CardTitle>
                  <CardDescription>Vos derniers documents</CardDescription>
                </CardHeader>
                <CardContent>
                  {completedRequests.length > 0 ? (
                    <div className="space-y-3">
                      {completedRequests.slice(0, 3).map((request) => (
                        <Link 
                          key={request.id} 
                          to={`/request/${request.id}`}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <FileText className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">
                              {dummyDocuments.find(d => d.id === request.documentId)?.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(request.lastUpdatedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Clock className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-gray-500 text-sm">
                        Vos documents approuvés apparaîtront ici
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Informations utiles */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations utiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Horaires d'ouverture</h4>
                      <p className="text-sm text-gray-600">
                        Lun-Ven: 9h - 17h<br />
                        Samedi: 9h - 12h
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Contact</h4>
                      <p className="text-sm text-gray-600">
                        Tél: 01 23 45 67 89<br />
                        Email: contact@commune.fr
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CitizenDashboard;
