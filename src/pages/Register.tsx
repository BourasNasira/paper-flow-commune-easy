
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/utils/dummyData";

const Register = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate(user.role === "admin" ? "/admin-dashboard" : "/citizen-dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <AuthForm type="register" />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
