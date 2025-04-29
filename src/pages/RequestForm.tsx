
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Steps from "@/components/common/Steps";
import { getCurrentUser, dummyDocuments, dummyRequests } from "@/utils/dummyData";

const RequestForm = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    notes: "",
    files: [] as File[]
  });

  // Trouver le document demandé
  const document = dummyDocuments.find(doc => doc.id === documentId);
  
  // Étapes du processus
  const steps = [
    "Informations",
    "Documents",
    "Vérification",
    "Confirmation"
  ];

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const user = getCurrentUser();
    if (!user) {
      toast.error("Veuillez vous connecter pour faire une demande");
      navigate("/login");
      return;
    }

    // Vérifier si le document existe
    if (!document) {
      toast.error("Document non trouvé");
      navigate("/documents");
      return;
    }
  }, [documentId, navigate, document]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files)
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de demande
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate("/login");
        return;
      }

      // Créer une nouvelle demande
      const newRequest = {
        id: `${dummyRequests.length + 1}`,
        documentId: documentId || "",
        userId: user.id,
        status: "pending" as const,
        submittedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        comments: [],
        files: formData.files.map(file => ({ name: file.name, url: "#" }))
      };

      // Ajouter la nouvelle demande (dans une application réelle, ce serait un appel API)
      dummyRequests.push(newRequest);
      
      setIsSubmitting(false);
      setCurrentStep(3); // Aller à l'étape de confirmation
      toast.success("Votre demande a été envoyée avec succès");
    }, 1500);
  };

  if (!document) {
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Demande de {document.title}
            </h1>
            <p className="text-gray-600">{document.description}</p>
          </div>

          <Steps currentStep={currentStep} steps={steps} />

          <Card className="p-6 mt-6">
            {/* Étape 1: Informations */}
            {currentStep === 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Informations sur la demande</h2>
                <div className="mb-6">
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6">
                    <h3 className="font-medium text-yellow-800 mb-2">Pièces requises</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                      {document.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Informations importantes</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Délai estimé:</strong> {document.estimatedTime}
                    </p>
                    {document.price && (
                      <p className="text-gray-600 text-sm">
                        <strong>Tarif:</strong> {document.price}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Notes supplémentaires (facultatif)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Ajoutez des informations complémentaires concernant votre demande..."
                      className="h-32"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2: Documents */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Téléchargement des documents</h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <p className="text-blue-800 text-sm">
                      Veuillez téléverser tous les documents demandés. Les formats acceptés sont PDF, JPG et PNG.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="file-upload">Documents justificatifs</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div className="text-gray-600">
                            <span className="text-blue-600 font-medium">
                              Cliquez pour télécharger
                            </span>{" "}
                            ou glissez-déposez
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, PNG (max. 5 MB)
                          </p>
                        </div>
                      </Label>
                    </div>

                    {formData.files.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Fichiers téléchargés:</h4>
                        <ul className="space-y-2">
                          {Array.from(formData.files).map((file, index) => (
                            <li key={index} className="flex items-center p-2 bg-gray-50 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-sm">{file.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Vérification */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Vérifiez votre demande</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-blue-800 text-sm">
                      Veuillez vérifier les informations de votre demande avant de l'envoyer.
                    </p>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Document demandé</h3>
                      <p>{document.title}</p>
                      <p className="text-sm text-gray-600">{document.description}</p>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Notes supplémentaires</h3>
                      <p className="text-gray-600">
                        {formData.notes || "Aucune note fournie"}
                      </p>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium mb-2">Documents téléchargés</h3>
                      {formData.files.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {Array.from(formData.files).map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-yellow-600">
                          Aucun document n'a été téléchargé. Veuillez revenir en arrière pour télécharger les documents requis.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 4: Confirmation */}
            {currentStep === 3 && (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Demande envoyée avec succès</h2>
                <p className="text-gray-600 mb-6">
                  Votre demande a été reçue et sera traitée dans les plus brefs délais.
                  Vous recevrez des notifications par email sur l'avancement de votre dossier.
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button asChild>
                    <a href="/citizen-dashboard">Accéder au tableau de bord</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/documents">Faire une autre demande</a>
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-8">
                {currentStep > 0 ? (
                  <Button onClick={prevStep} variant="outline">
                    Retour
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep === 2 ? (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  </Button>
                ) : (
                  <Button onClick={nextStep}>
                    Continuer
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestForm;
