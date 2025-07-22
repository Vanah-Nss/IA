import React from "react";
import { FaUsers, FaBoxOpen, FaChartPie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl w-full p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Panneau Administrateur
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card icon={<FaUsers />} label="Gérer les utilisateurs" onClick={() => navigate("/admin/users")} />
        <Card icon={<FaBoxOpen />} label="Gérer les produits" onClick={() => navigate("/admin/products")} />
        <Card icon={<FaChartPie />} label="Statistiques" onClick={() => navigate("/admin/stats")} />
      </div>
    </div>
  );
}

function Card({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
    >
      <div className="text-3xl mb-2 text-blue-500">{icon}</div>
      <p className="text-sm text-center text-gray-700 dark:text-gray-300 font-medium">{label}</p>
    </div>
  );
}
