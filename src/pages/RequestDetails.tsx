
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { dummyRequests, dummyDocuments, dummyUsers, getCurrentUser, RequestStatus, getStatusText } from "@/utils/dummyData";
import { FileText, User, MessageSquare, Calendar, Clock } from "lucide-react";

const RequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(dummyRequests.find(req => req.id === requestId));
  const [user, setUser] = useState(getCurrentUser());
  const [newComment, setNewComment] = useState("");
  const [newStatus, setNewStatus] = useState<RequestStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trouver les données associées
  const document = request ? dummyDocuments.find(doc => doc.id === request.documentId) : null;
  const requestUser = request ? dummyUsers.find(u => u.id === request.userId) : null;

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("Veuillez vous connecter pour voir les détails de la demande");
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Vérifier si la demande existe
    if (!request) {
      toast.error("Demande non trouvée");
      navigate(currentUser.role === "admin" ? "/admin-dashboard" : "/citizen-dashboard");
      return;
    }

    // Vérifier les permissions (un citoyen ne peut voir que ses propres demandes)
    if (currentUser.role === "citizen" && request.userId !== currentUser.id) {
      toast.error("Vous n'avez pas l'autorisation de voir cette demande");
      navigate("/citizen-dashboard");
      return;
    }
  }, [requestId, request, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simuler l'ajout d'un commentaire
    setTimeout(() => {
      const updatedRequest = { ...request };
      if (!updatedRequest.comments) {
        updatedRequest.comments = [];
      }
      updatedRequest.comments.push(newComment);
      updatedRequest.lastUpdatedAt = new Date().toISOString();
      
      // Mettre à jour la demande dans la liste
      const index = dummyRequests.findIndex(req => req.id === requestId);
      if (index !== -1) {
        dummyRequests[index] = updatedRequest;
      }
      
      setRequest(updatedRequest);
      setNewComment("");
      setIsSubmitting(false);
      toast.success("Commentaire ajouté avec succès");
    }, 500);
  };

  const handleUpdateStatus = () => {
    if (!newStatus) return;
    
    setIsSubmitting(true);
    
    // Simuler la mise à jour du statut
    setTimeout(() => {
      const updatedRequest = { ...request, status: newStatus, lastUpdatedAt: new Date().toISOString() };
      
      // Mettre à jour la demande dans la liste
      const index = dummyRequests.findIndex(req => req.id === requestId);
      if (index !== -1) {
        dummyRequests[index] = updatedRequest;
      }
      
      setRequest(updatedRequest);
      setNewStatus(null);
      setIsSubmitting(false);
      toast.success(`Statut mis à jour: ${getStatusText(newStatus)}`);
    }, 500);
  };

  if (!request || !document) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Demande de {document.title}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Soumise le {formatDate(request.submittedAt)}
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center">
              <StatusBadge status={request.status} className="text-sm px-3 py-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Détails de la demande */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Détails de la demande
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Document</h3>
                      <p className="font-medium">{document.title}</p>
                      <p className="text-gray-600 text-sm">{document.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Délai estimé</h3>
                      <p>{document.estimatedTime}</p>
                    </div>
                    
                    {document.price && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Tarif</h3>
                        <p>{document.price}</p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date de la dernière mise à jour</h3>
                      <p>{formatDate(request.lastUpdatedAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents fournis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Documents fournis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {request.files && request.files.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {request.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                        >
                          <div className="bg-blue-100 rounded-full p-2 mr-3">
                            <FileText className="h-4 w-4 text-blue-700" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-sm">{file.name}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      Aucun document n'a été fourni.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Communication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Messages existants */}
                    <div className="space-y-4">
                      {request.comments && request.comments.length > 0 ? (
                        request.comments.map((comment, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm">Message</span>
                              <span className="text-xs text-gray-500">
                                {index === request.comments.length - 1
                                  ? formatDate(request.lastUpdatedAt)
                                  : "Date inconnue"
                                }
                              </span>
                            </div>
                            <p className="text-gray-700">{comment}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          Aucune communication pour le moment.
                        </div>
                      )}
                    </div>

                    {/* Ajouter un nouveau message */}
                    <div>
                      <h3 className="font-medium mb-2">Ajouter un message</h3>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Tapez votre message ici..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="h-32"
                        />
                        <Button 
                          onClick={handleAddComment} 
                          disabled={isSubmitting || !newComment.trim()}
                        >
                          Envoyer le message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Demandeur */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Demandeur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                      <p className="font-medium">{requestUser?.name || "Inconnu"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>{requestUser?.email || "Inconnu"}</p>
                    </div>
                    {requestUser?.phone && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                        <p>{requestUser.phone}</p>
                      </div>
                    )}
                    {requestUser?.address && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                        <p>{requestUser.address}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Statut et actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Statut et actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Statut actuel</h3>
                      <div className="mt-1">
                        <StatusBadge status={request.status} />
                      </div>
                    </div>

                    {/* Actions pour les administrateurs */}
                    {user && user.role === "admin" && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Changer le statut</h3>
                        <div className="space-y-2">
                          {(["pending", "reviewing", "additional-info", "approved", "ready", "rejected"] as RequestStatus[]).map((status) => (
                            <button
                              key={status}
                              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                                newStatus === status
                                  ? "bg-blue-100 text-blue-700"
                                  : request.status === status
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                              onClick={() => setNewStatus(status)}
                              disabled={request.status === status}
                            >
                              {getStatusText(status)}
                            </button>
                          ))}
                        </div>
                        
                        {newStatus && newStatus !== request.status && (
                          <Button
                            className="w-full mt-3"
                            onClick={handleUpdateStatus}
                            disabled={isSubmitting}
                          >
                            Mettre à jour le statut
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(user?.role === "admin" ? "/admin-dashboard" : "/citizen-dashboard")}
                      >
                        Retour au tableau de bord
                      </Button>
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

export default RequestDetails;
