
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Book } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-study-purple-light p-4 rounded-full">
            <Book className="w-12 h-12 text-study-purple" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-study-purple text-white rounded-lg font-medium hover:bg-study-purple-dark transition-colors"
        >
          Voltar para o Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
