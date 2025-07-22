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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>
        <FaLock style={{ marginRight: 8, color: "#0066ff" }} />
        Réinitialiser mot de passe
      </h3>

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        style={styles.input}
      />

      <button disabled={loading} type="submit" style={styles.button}>
        {loading ? "Traitement..." : "Réinitialiser"}
      </button>

      {message && (
        <p
          style={{
            ...styles.message,
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 400,
    margin: "60px auto",
    padding: 30,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  },
  title: {
    marginBottom: 20,
    fontWeight: "700",
    color: "#222",
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
    border: "1.5px solid #ddd",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 14,
    fontSize: 18,
    backgroundColor: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 6px 20px rgba(0,102,255,0.5)",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
};
