
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { login, register } from "@/utils/dummyData";
import { FileText } from "lucide-react";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === "login") {
        const user = await login(formData.email, formData.password);
        toast.success(`Bienvenue ${user.name} !`);
        navigate(user.role === "admin" ? "/admin-dashboard" : "/citizen-dashboard");
      } else {
        const user = await register(formData.name, formData.email, formData.password);
        toast.success("Compte créé avec succès !");
        navigate("/citizen-dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-white p-8 shadow-md w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 rounded-full bg-blue-100 p-3 w-16 h-16 flex items-center justify-center">
          <FileText className="h-8 w-8 text-blue-700" />
        </div>
        <h1 className="text-2xl font-bold">
          {type === "login" ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="text-gray-500 mt-2">
          {type === "login"
            ? "Connectez-vous pour accéder à votre compte"
            : "Inscrivez-vous pour effectuer vos démarches en ligne"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Prénom Nom"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="votre@email.fr"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Chargement..." : type === "login" ? "Se connecter" : "S'inscrire"}
        </Button>

        <div className="mt-4 text-center text-sm">
          {type === "login" ? (
            <p>
              Pas encore de compte?{" "}
              <a
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                S'inscrire
              </a>
            </p>
          ) : (
            <p>
              Déjà un compte?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Se connecter
              </a>
            </p>
          )}
        </div>
      </form>

      {type === "login" && (
        <div className="mt-6 border-t pt-4 text-center text-xs text-gray-500">
          <p>
            Pour la démo, utilisez :
            <br />
            Citoyen: jean@exemple.fr / password
            <br />
            Admin: admin@commune.fr / password
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
