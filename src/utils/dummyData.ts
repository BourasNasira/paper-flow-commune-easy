
export interface User {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "admin";
  address?: string;
  phone?: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  estimatedTime: string;
  price?: string;
}

export type RequestStatus = "pending" | "reviewing" | "additional-info" | "approved" | "ready" | "rejected";

export interface Request {
  id: string;
  documentId: string;
  userId: string;
  status: RequestStatus;
  submittedAt: string;
  lastUpdatedAt: string;
  comments?: string[];
  files?: { name: string; url: string }[];
}

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean@exemple.fr",
    role: "citizen",
    address: "15 Rue des Lilas, 75001 Paris",
    phone: "06 12 34 56 78"
  },
  {
    id: "2",
    name: "Marie Laurent",
    email: "marie@exemple.fr",
    role: "citizen",
    address: "8 Avenue Victor Hugo, 75016 Paris",
    phone: "07 98 76 54 32"
  },
  {
    id: "3",
    name: "Admin Commune",
    email: "admin@commune.fr",
    role: "admin"
  }
];

export const dummyDocuments: Document[] = [
  {
    id: "1",
    title: "Carte d'identité",
    description: "Demande de carte nationale d'identité (CNI)",
    requirements: [
      "Photo d'identité récente",
      "Justificatif de domicile",
      "Ancienne carte d'identité ou acte de naissance"
    ],
    estimatedTime: "3 à 4 semaines",
    price: "Gratuit"
  },
  {
    id: "2",
    title: "Passeport",
    description: "Demande de passeport biométrique",
    requirements: [
      "Photo d'identité récente",
      "Justificatif de domicile",
      "Carte d'identité",
      "Timbre fiscal"
    ],
    estimatedTime: "2 à 3 semaines",
    price: "86€ (majeur)"
  },
  {
    id: "3",
    title: "Acte de naissance",
    description: "Demande d'acte de naissance",
    requirements: [
      "Pièce d'identité du demandeur"
    ],
    estimatedTime: "5 à 7 jours",
    price: "Gratuit"
  },
  {
    id: "4",
    title: "Certificat de résidence",
    description: "Attestation de résidence dans la commune",
    requirements: [
      "Pièce d'identité",
      "Justificatif de domicile récent"
    ],
    estimatedTime: "1 à 2 jours",
    price: "Gratuit"
  },
  {
    id: "5",
    title: "Permis de construire",
    description: "Demande d'autorisation pour travaux",
    requirements: [
      "Plan cadastral",
      "Plans du projet",
      "Photos du site",
      "Description détaillée des travaux"
    ],
    estimatedTime: "2 à 3 mois",
    price: "Variable selon surface"
  }
];

export const dummyRequests: Request[] = [
  {
    id: "1",
    documentId: "1",
    userId: "1",
    status: "reviewing",
    submittedAt: "2024-04-15T10:30:00Z",
    lastUpdatedAt: "2024-04-16T14:20:00Z",
    files: [
      { name: "photo.jpg", url: "#" },
      { name: "justificatif.pdf", url: "#" }
    ]
  },
  {
    id: "2",
    documentId: "3",
    userId: "1",
    status: "approved",
    submittedAt: "2024-04-10T09:15:00Z",
    lastUpdatedAt: "2024-04-20T11:45:00Z",
    comments: ["Votre document est prêt. Vous pouvez venir le récupérer à l'accueil de la mairie."]
  },
  {
    id: "3",
    documentId: "2",
    userId: "2",
    status: "additional-info",
    submittedAt: "2024-04-18T16:20:00Z",
    lastUpdatedAt: "2024-04-21T09:30:00Z",
    comments: ["Merci de fournir une photo d'identité plus récente."]
  },
  {
    id: "4",
    documentId: "4",
    userId: "2",
    status: "ready",
    submittedAt: "2024-04-05T14:10:00Z",
    lastUpdatedAt: "2024-04-07T10:15:00Z",
    comments: ["Votre certificat est disponible à l'accueil de la mairie."]
  }
];

// Fonction utilitaire pour simuler un délai d'API
export const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};

// Fonctions d'authentification simulées
let currentUser: User | null = null;

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = dummyUsers.find(u => u.email === email);
      
      if (user && password === "password") {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Identifiants incorrects"));
      }
    }, 800);
  });
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dummyUsers.some(u => u.email === email)) {
        reject(new Error("Cet email est déjà utilisé"));
        return;
      }
      
      const newUser: User = {
        id: `${dummyUsers.length + 1}`,
        name,
        email,
        role: "citizen"
      };
      
      dummyUsers.push(newUser);
      currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      resolve(newUser);
    }, 800);
  });
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

export const getStatusColor = (status: RequestStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "reviewing":
      return "bg-blue-500";
    case "additional-info":
      return "bg-orange-500";
    case "approved":
      return "bg-green-500";
    case "ready":
      return "bg-green-600";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getStatusText = (status: RequestStatus): string => {
  switch (status) {
    case "pending":
      return "En attente";
    case "reviewing":
      return "En cours d'examen";
    case "additional-info":
      return "Informations supplémentaires requises";
    case "approved":
      return "Approuvé";
    case "ready":
      return "Prêt à récupérer";
    case "rejected":
      return "Rejeté";
    default:
      return "Inconnu";
  }
};
