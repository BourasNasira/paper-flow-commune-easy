
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, User, Search, Users, Plus, Mail, Phone, Edit } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { dummyRequests, dummyDocuments, dummyUsers, getCurrentUser } from "@/utils/dummyData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredRequests, setFilteredRequests] = useState(dummyRequests);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et est un administrateur
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/citizen-dashboard");
      return;
    }

    // Appliquer les filtres
    filterRequests();
  }, [searchTerm, selectedStatus, navigate]);

  const filterRequests = () => {
    let filtered = dummyRequests;

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter((req) => {
        const document = dummyDocuments.find((doc) => doc.id === req.documentId);
        const user = dummyUsers.find((u) => u.id === req.userId);
        return (
          document?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Filtrer par statut
    if (selectedStatus) {
      filtered = filtered.filter((req) => req.status === selectedStatus);
    }

    setFilteredRequests(filtered);
  };

  // Stats pour le tableau de bord
  const stats = [
    {
      title: "Total des demandes",
      value: dummyRequests.length,
      icon: <FileText className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "En attente",
      value: dummyRequests.filter((req) => req.status === "pending").length,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
    },
    {
      title: "Utilisateurs",
      value: dummyUsers.filter((u) => u.role === "citizen").length,
      icon: <Users className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Documents disponibles",
      value: dummyDocuments.length,
      icon: <FileText className="h-5 w-5 text-purple-600" />,
    },
  ];

  // Simuler les derniers utilisateurs inscrits
  const recentUsers = dummyUsers
    .filter((u) => u.role === "citizen")
    .slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord administrateur</h1>
            <p className="text-gray-600">
              Gérez les demandes administratives et les utilisateurs.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-center">
                  <div className="rounded-full bg-blue-50 p-3 mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des demandes */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestion des demandes</CardTitle>
                    <CardDescription>
                      Consultez et traitez les demandes des utilisateurs
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/documents">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle demande
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher par ID, document ou utilisateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Filtrer par statut:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`px-3 py-1 rounded-full text-xs ${
                            selectedStatus === null
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => setSelectedStatus(null)}
                        >
                          Tous
                        </button>
                        {["pending", "reviewing", "additional-info", "approved", "ready", "rejected"].map((status) => (
                          <button
                            key={status}
                            className={`px-3 py-1 rounded-full text-xs ${
                              selectedStatus === status
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedStatus(status)}
                          >
                            {status === "pending" && "En attente"}
                            {status === "reviewing" && "En cours d'examen"}
                            {status === "additional-info" && "Infos supplémentaires"}
                            {status === "approved" && "Approuvé"}
                            {status === "ready" && "Prêt à récupérer"}
                            {status === "rejected" && "Rejeté"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Document</TableHead>
                          <TableHead>Utilisateur</TableHead>
                          <TableHead>Date de demande</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRequests.length > 0 ? (
                          filteredRequests.map((request) => {
                            const document = dummyDocuments.find(
                              (doc) => doc.id === request.documentId
                            );
                            const user = dummyUsers.find(
                              (u) => u.id === request.userId
                            );
                            
                            return (
                              <TableRow key={request.id}>
                                <TableCell className="font-medium">{request.id}</TableCell>
                                <TableCell>{document?.title || "Inconnu"}</TableCell>
                                <TableCell>{user?.name || "Utilisateur inconnu"}</TableCell>
                                <TableCell>
                                  {new Date(request.submittedAt).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell>
                                  <StatusBadge status={request.status} />
                                </TableCell>
                                <TableCell>
                                  <Button asChild size="sm" variant="outline">
                                    <Link to={`/request/${request.id}`}>Détails</Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                              Aucune demande ne correspond aux critères de recherche
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Utilisateurs récents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Utilisateurs récents
                  </CardTitle>
                  <CardDescription>
                    Les derniers utilisateurs inscrits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 rounded-full p-2">
                            <User className="h-4 w-4 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions rapides */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link to="/documents">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un document
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="#">
                      <Users className="mr-2 h-4 w-4" />
                      Gérer les utilisateurs
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="#">
                      <FileText className="mr-2 h-4 w-4" />
                      Exporter les rapports
                    </Link>
                  </Button>
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

export default AdminDashboard;
