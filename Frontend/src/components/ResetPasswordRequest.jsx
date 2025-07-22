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
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.title}>
          <FaEnvelope style={{ marginRight: 8, color: "#003366" }} />
          Mot de passe oublié ?
        </h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>

        {message && (
          <p
            style={{
              marginTop: 15,
              color: message.startsWith("✅") ? "#4caf50" : "#f44336",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

        <div style={styles.linksContainer}>
          <Link to="/login" style={styles.link}>
            <FaArrowLeft style={{ marginRight: 6 }} />
            Retour vers Connexion
          </Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eaf0f6, #d3e0ee)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "'Segoe UI', sans-serif",
  },
  form: {
    maxWidth: 420,
    width: "100%",
    padding: 36,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    color: "#003366",
  },
  title: {
    marginBottom: 25,
    fontWeight: "700",
    color: "#003366",
    textAlign: "center",
    fontSize: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#f2f6fb",
    color: "#003366",
    border: "1.5px solid #ccd8e1",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 14,
    fontSize: 18,
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 6px 20px rgba(0,51,102,0.4)",
    transition: "background-color 0.3s",
  },
  linksContainer: {
    marginTop: 30,
    textAlign: "center",
  },
  link: {
    color: "#003366",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: 15,
    display: "inline-flex",
    alignItems: "center",
  },
};
