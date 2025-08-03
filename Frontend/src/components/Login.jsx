import React, { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaLock,
  FaMoon,
  FaSun,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useRole } from "../components/RoleContext";
const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!, $captcha: String!) {
    tokenAuth(username: $username, password: $password, captcha: $captcha) {
      token
      refreshToken
      user {
        id
        username
        email
        role
      }
    }
  }
`;



export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { setRole } = useRole();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!captchaValue) {
      setMessage("❌ Veuillez valider le reCAPTCHA.");
      return;
    }

    try {
      const { data } = await login({
        variables: {
          username: form.username.trim(),
          password: form.password,
        },
      });

      if (data?.tokenAuth?.token) {
        localStorage.setItem("token", data.tokenAuth.token);
        const userRole = data.tokenAuth.user?.role || "utilisateur";
        setRole(userRole);
        localStorage.setItem("role", userRole);
        setMessage("✅ Connecté avec succès.");
        navigate("/dashboard");
      } else {
        setMessage("❌ Connexion échouée : aucune donnée reçue.");
      }
    } catch (err) {
      const gqlError =
        err?.graphQLErrors?.[0]?.message || err.message || "Erreur inconnue";
      setMessage("❌ " + gqlError);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center px-4 transition-all duration-500 ${
        darkMode ? "bg-gradient-to-br from-blue-950 to-blue-800" : "bg-gradient-to-br from-blue-100 to-blue-200"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md rounded-xl shadow-xl p-8 ${
          darkMode ? "bg-blue-900 text-blue-100" : "bg-white text-blue-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center w-full">Connectez-vous à votre Compte</h2>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="text-xl"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 mb-4 ${
            darkMode ? "bg-blue-800" : "bg-blue-50"
          }`}
        >
          <FaUserAlt />
          <input
            name="username"
            placeholder="Nom d'utilisateur"
            value={form.username}
            onChange={handleChange}
            required
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 mb-4 relative ${
            darkMode ? "bg-blue-800" : "bg-blue-50"
          }`}
        >
          <FaLock />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="flex-1 bg-transparent outline-none text-sm pr-10"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mb-5 flex justify-center">
          <ReCAPTCHA
            sitekey="6LdGjogrAAAAAB0fDIws2ISyda1dTdi-uIjmC8sy"
            onChange={onCaptchaChange}
            ref={recaptchaRef}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:scale-[1.02]"
          } ${
            darkMode ? "bg-blue-700" : "bg-blue-800"
          }`}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.startsWith("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className={`text-sm font-semibold underline ${
              darkMode ? "text-blue-300" : "text-blue-800"
            }`}
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </form>
    </div>
  );
}
