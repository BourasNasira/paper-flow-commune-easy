
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fileText } from 'lucide-react';
import StatusBadge from "./StatusBadge";
import { Document, Request, dummyDocuments } from "@/utils/dummyData";

type RequestCardProps = {
  request: Request;
};

const RequestCard = ({ request }: RequestCardProps) => {
  // Trouver le document associé
  const document = dummyDocuments.find(doc => doc.id === request.documentId) as Document;
  
  // Formatage de la date
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

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{document.title}</CardTitle>
            <CardDescription>
              Demande soumise le {formatDate(request.submittedAt)}
            </CardDescription>
          </div>
          <StatusBadge status={request.status} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Dernière mise à jour: {formatDate(request.lastUpdatedAt)}
        </p>
        
        {request.comments && request.comments.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <p className="text-sm font-medium">Dernier message:</p>
            <p className="text-sm">{request.comments[request.comments.length - 1]}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link to={`/request/${request.id}`}>
            Voir les détails
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequestCard;
