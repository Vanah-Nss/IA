import React, { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaMoon, FaSun, FaEye, FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useRole } from "../components/RoleContext";

const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
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
  const onCaptchaChange = (value) => setCaptchaValue(value);

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
      style={{
        ...styles.wrapper,
        background: darkMode
          ? "linear-gradient(135deg, #001f3f, #003366)"
          : "linear-gradient(135deg, #eaf0f6, #d3e0ee)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          ...styles.form,
          color: darkMode ? "#cce0ff" : "#003366",
          backgroundColor: darkMode ? "#001f3f" : "#ffffff",
        }}
      >
        <div style={styles.topBar}>
          <h2 style={styles.title}>Connexion</h2>
          <button type="button" onClick={toggleDarkMode} style={styles.toggle}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div
          style={{
            ...styles.inputGroup,
            backgroundColor: darkMode ? "#003366" : "#f2f6fb",
          }}
        >
          <FaUserAlt
            style={{ ...styles.icon, color: darkMode ? "#99c2ff" : "#003366" }}
          />
          <input
            name="username"
            placeholder="Nom d'utilisateur"
            value={form.username}
            onChange={handleChange}
            required
            style={{ ...styles.input, color: darkMode ? "#cce0ff" : "#000" }}
          />
        </div>

        <div
          style={{
            ...styles.inputGroup,
            backgroundColor: darkMode ? "#003366" : "#f2f6fb",
            position: "relative",
          }}
        >
          <FaLock
            style={{ ...styles.icon, color: darkMode ? "#99c2ff" : "#003366" }}
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              color: darkMode ? "#cce0ff" : "#000",
              paddingRight: 40,
            }}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            style={{
              position: "absolute",
              right: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#99c2ff" : "#003366",
              fontSize: 18,
            }}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div style={styles.recaptcha}>
          <ReCAPTCHA
            sitekey="6LdGjogrAAAAAB0fDIws2ISyda1dTdi-uIjmC8sy" // ← remplace par ta vraie clé
            onChange={onCaptchaChange}
            ref={recaptchaRef}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            backgroundColor: darkMode ? "#00264d" : "#003366",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && (
          <p
            style={{
              ...styles.message,
              color: message.startsWith("✅") ? "#4caf50" : "#f44336",
            }}
          >
            {message}
          </p>
        )}

        <div style={styles.linksContainer}>
        
        
          <Link
            to="/forgot-password"
            style={{ ...styles.link, color: darkMode ? "#99c2ff" : "#003366" }}
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",              // largeur complète de la fenêtre
    display: "flex",
    justifyContent: "center",    // centrer horizontalement
    alignItems: "center",        // centrer verticalement
    background: "linear-gradient(135deg, #e0f2ff, #f5faff)", // fond dégradé clair
    padding: "20px",
    fontFamily: "'Segoe UI', 'Inter', sans-serif",
    margin: 0,                   // supprime marges parasites
  },
  form: {
    padding: 36,
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    width: "90%",                // prend 90% de l'écran sur petits écrans
    maxWidth: 480,               // mais pas plus de 480px
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  toggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    padding: "10px 15px",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginLeft: 10,
    border: "none",
    outline: "none",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: 18,
  },
  recaptcha: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    padding: 14,
    fontSize: 18,
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 6px 20px rgba(0,51,102,0.5)",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  linksContainer: {
    marginTop: 24,
    textAlign: "center",
  },
  link: {
    fontWeight: "600",
    textDecoration: "none",
    fontSize: 15,
  },
};
