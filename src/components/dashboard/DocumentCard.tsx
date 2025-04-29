
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Document } from "@/utils/dummyData";
import { FileText } from "lucide-react";

interface DocumentCardProps {
  document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          {document.title}
        </CardTitle>
        <CardDescription>{document.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Pièces requises:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mt-1">
              {document.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Délai: </span>
              <span className="text-gray-600">{document.estimatedTime}</span>
            </div>
            {document.price && (
              <div>
                <span className="font-medium text-gray-700">Tarif: </span>
                <span className="text-gray-600">{document.price}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/request-form/${document.id}`}>
            Faire une demande
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
