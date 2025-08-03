import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $token: String!, $newPassword: String!) {
    resetPassword(email: $email, token: $token, newPassword: $newPassword) {
      success
    }
  }
`;

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await resetPassword({ variables: { email, token, newPassword } });
      if (data.resetPassword.success) {
        setMessage("✅ Mot de passe mis à jour. Vous pouvez vous connecter.");
      }
    } catch (err) {
      setMessage("❌ Erreur: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg font-sans"
    >
      <h3 className="mb-6 text-2xl font-extrabold text-center flex justify-center items-center text-gray-900">
        <FaLock className="mr-2 text-blue-600" />
        Réinitialiser mot de passe
      </h3>

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className="w-full p-4 mb-5 text-gray-900 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-4 text-white text-lg font-bold rounded-lg shadow-md transition
          ${loading ? "bg-blue-500 cursor-not-allowed opacity-70" : "bg-blue-700 hover:bg-blue-800 cursor-pointer"}`}
      >
        {loading ? "Traitement..." : "Réinitialiser"}
      </button>

      {message && (
        <p
          className={`mt-5 font-semibold text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
