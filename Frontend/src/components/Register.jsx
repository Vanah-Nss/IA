import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRole } from "../components/RoleContext";

const REGISTER_MUTATION = gql`
mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
        role
      }
      token
    }
  }
`;

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [register, { loading }] = useMutation(REGISTER_MUTATION);
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data } = await register({ variables: form });
      if (data?.register?.user && data?.register?.token) {
        const userRole = data.register.user.role || "utilisateur";
        setRole(userRole);
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", data.register.token);
        setMessage("✅ Inscription réussie.");
        navigate("/dashboard");
      } else {
        setMessage("❌ Inscription échouée.");
      }
    } catch (err) {
      const errorMsg = err?.graphQLErrors?.[0]?.message || err.message;
      setMessage("❌ " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-blue-900 w-full max-w-md p-10 rounded-xl shadow-xl"
      >
   <h2 className="text-2xl font-bold mb-8 text-blue-900 text-center">
  Inscrivez-vous
</h2>



        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mb-5">
          <FaUserAlt className="text-blue-900 mr-3" />
          <input
            name="username"
            placeholder="Nom utilisateur"
            value={form.username}
            onChange={handleChange}
            required
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
        </div>

      
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mb-5">
          <FaEnvelope className="text-blue-900 mr-3" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
        </div>

        <div className="relative flex items-center bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mb-5">
          <FaLock className="text-blue-900 mr-3" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="flex-1 bg-transparent focus:outline-none text-sm pr-10"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900 text-lg"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-800 transition"
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>

        {message && (
          <p
            className={`mt-5 text-center text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-center mt-6 text-sm">
          <Link to="/login" className="text-blue-900 font-medium hover:underline">
            ← Retour à la connexion
          </Link>
        </div>
      </form>
    </div>
  );
}
