import React from "react";
import { Email, Phone, LocationOn, ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.title}>Contactez-nous</h1>
          <p style={styles.text}>
            Nous sommes ravis de répondre à toutes vos questions concernant notre plateforme de génération de contenus IA.
          </p>

          <div style={styles.infoGroup}>
            <p><Email style={styles.icon} /> SafidySylvana333@gmail.com</p>
            <p><Phone style={styles.icon} /> +261 38 95 293 85 </p>
            <p><LocationOn style={styles.icon} /> Antananarivo, Madagascar</p>
          </div>

          <Link to="/home" style={styles.button}>
            <ArrowBack style={{ marginRight: "0.5rem" }} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10, 20, 60, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "rgba(15, 30, 70, 0.95)",
    padding: "2.5rem 3.5rem",
    borderRadius: "16px",
    maxWidth: "650px",
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "1rem",
    color: "#cce0ff",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#dde7ff",
  },
  infoGroup: {
    fontSize: "1.1rem",
    lineHeight: "2",
    color: "#ffffff",
    textAlign: "left",
    marginBottom: "1.5rem",
  },
  icon: {
    verticalAlign: "middle",
    marginRight: "0.5rem",
    color: "#80bfff",
  },
  button: {
    marginTop: "2rem",
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    backgroundColor: "#0055cc",
    color: "white",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};
