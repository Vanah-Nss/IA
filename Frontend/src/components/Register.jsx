import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
    }
  }
`;

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // état pour afficher/masquer
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data } = await register({ variables: form });
      if (data.register.user) {
        setMessage("✅ Inscription réussie. Vous pouvez vous connecter.");
        setForm({ username: "", email: "", password: "" });
      }
    } catch (err) {
      if (err.graphQLErrors?.length) {
        setMessage(err.graphQLErrors.map(({ message }) => message).join("\n"));
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>
          <FaUserPlus style={{ marginRight: 10, color: "#66aaff" }} />
          Inscription
        </h2>

        <div style={styles.inputGroup}>
          <FaUserAlt style={styles.icon} />
          <input
            name="username"
            placeholder="Nom utilisateur"
            value={form.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Champ mot de passe avec affichage/masquage */}
        <div style={{ ...styles.inputGroup, position: "relative" }}>
          <FaLock style={styles.icon} />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            style={{ ...styles.input, paddingRight: 40 }}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#003366",
              fontSize: 18,
              padding: 0,
              margin: 0,
            }}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>

        {message && (
          <p style={{ color: error ? "#f44336" : "#4caf50", marginTop: 20 }}>{message}</p>
        )}

        <div style={styles.linksContainer}>
          <Link to="/login" style={styles.link}>
            ← Retour vers Connexion
          </Link>
          <span style={styles.separator}>|</span>
          <Link to="/forgot-password" style={styles.link}>
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
    background: "linear-gradient(135deg, #e6f0ff, #f0f6ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "'Segoe UI', sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 14,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 8px 24px rgba(0, 51, 102, 0.2)",
    color: "#003366",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#003366",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
    borderRadius: 10,
    padding: "10px 14px",
    marginBottom: 18,
    border: "1px solid #cce0ff",
  },
  icon: {
    fontSize: 18,
    color: "#003366",
    marginRight: 10,
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#003366",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 14,
    fontSize: 16,
    backgroundColor: "#003366",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 51, 102, 0.3)",
    transition: "background-color 0.3s",
  },
  linksContainer: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: "#003366",
    textDecoration: "none",
    fontWeight: "500",
  },
  separator: {
    margin: "0 8px",
    color: "#888",
  },
};
