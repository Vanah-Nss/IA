import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation SendResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
    }
  }
`;

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendEmail, { loading }] = useMutation(SEND_PASSWORD_RESET_EMAIL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await sendEmail({ variables: { email } });
      if (data.sendPasswordResetEmail.success) {
        setMessage("✅ Lien envoyé. Vérifiez votre boîte mail.");
      } else {
        setMessage("❌ Aucun compte trouvé avec cet email.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setMessage("❌ Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex justify-center items-center p-5 font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-9 text-blue-900"
      >
        <h3 className="mb-7 font-extrabold text-center text-2xl flex justify-center items-center">
          <FaEnvelope className="mr-2 text-blue-700" />
          Mot de passe oublié ?
        </h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 mb-5 text-blue-900 text-base rounded-xl bg-blue-100 border border-blue-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 text-white text-lg font-bold rounded-xl shadow-md transition ${
            loading
              ? "bg-blue-600 cursor-not-allowed opacity-70"
              : "bg-blue-800 hover:bg-blue-900 cursor-pointer"
          }`}
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
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

        <div className="mt-8 text-center text-blue-800">
          <Link
            to="/login"
            className="inline-flex items-center font-semibold hover:underline"
          >
            <FaArrowLeft className="mr-2" />
            Retour vers Connexion
          </Link>
        </div>
      </form>
    </div>
  );
}
