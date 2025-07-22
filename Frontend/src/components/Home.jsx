import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home as HomeIcon, Login, PersonAdd, RocketLaunch } from "@mui/icons-material";

const backgroundImage =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80";

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [animateInfo, setAnimateInfo] = useState(false);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setAnimateInfo(true), 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const baseAnimStyle = {
    opacity: animateInfo ? 1 : 0,
    transform: animateInfo ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  return (
    <>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.navLogo}>IA Créative</div>
          <div style={styles.navLinks}>
            <NavLink to="/home" style={({ isActive }) => getNavLinkStyle(isActive)}>
              <HomeIcon style={styles.navIcon} /> Accueil
            </NavLink>
            <NavLink to="/login" style={({ isActive }) => getNavLinkStyle(isActive)}>
              <Login style={styles.navIcon} /> Se connecter
            </NavLink>
            <NavLink to="/register" style={({ isActive }) => getNavLinkStyle(isActive)}>
              <PersonAdd style={styles.navIcon} /> S'inscrire
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ ...styles.wrapper, backgroundImage: `url(${backgroundImage})` }}>
        <div style={styles.overlay} />
        <div style={styles.content}>
          <h1
            style={{
              ...styles.title,
              transform: `translateY(${offsetY * 0.3}px)`,
              opacity: offsetY < 200 ? 1 : 0.5,
              transition: "transform 0.3s ease, opacity 0.5s ease",
            }}
          >
            IA Créative
          </h1>
          <p
            style={{
              ...styles.subtitle,
              transform: `translateY(${offsetY * 0.15}px)`,
              opacity: offsetY < 200 ? 1 : 0.7,
              transition: "transform 0.3s ease, opacity 0.5s ease",
            }}
          >
            Génération automatique de contenus textuels et visuels pour LinkedIn,
            entreprises de communication et marketing digital.
          </p>
          <div style={styles.buttons}>
            <Link to="/login" style={{ ...styles.button, ...styles.loginButton }}>
              <RocketLaunch style={{ marginRight: 10 }} />
              Démarrer maintenant
            </Link>
          </div>
        </div>
      </div>

      {/* Pourquoi choisir IA Créative ? */}
      <section style={styles.infoSectionWrapper}>
        <div style={styles.infoOverlay} />
        <div style={styles.infoSection}>
          <h2
            style={{
              ...styles.infoTitle,
              ...baseAnimStyle,
              transitionDelay: "0.2s",
            }}
          >
            Pourquoi choisir IA Créative ?
          </h2>
          <p
            style={{
              ...styles.infoText,
              ...baseAnimStyle,
              transitionDelay: "0.4s",
            }}
          >
            Notre plateforme utilise l'intelligence artificielle la plus avancée
            pour générer automatiquement des contenus attractifs et percutants,
            adaptés aux besoins des professionnels du marketing digital et des
            entreprises de communication.
          </p>
          <p
            style={{
              ...styles.infoText,
              ...baseAnimStyle,
              transitionDelay: "0.6s",
            }}
          >
            Boostez votre présence en ligne avec des textes et visuels personnalisés
            qui captivent votre audience et augmentent votre visibilité sur LinkedIn
            et autres réseaux sociaux.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 IA Créative. Tous droits réservés.</p>
        <div style={styles.footerLinks}>
          <a style={styles.footerLink}>Politique de confidentialité</a>
          <a style={styles.footerLink}>Conditions d'utilisation</a>
          <Link to="/contact" style={styles.footerLink}>Contact</Link>
        </div>
      </footer>
    </>
  );
}

const styles = {
  navIcon: {
    fontSize: 20,
    marginRight: 6,
    verticalAlign: "middle",
    color: "#cfd8ff",
  },
  navbar: {
    position: "fixed",
    top: 0,
    width: "100vw",
    backgroundColor: "rgba(0, 38, 77, 0.85)", // Bleu marine transparent
    boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
    zIndex: 1000,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  navContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
  },
  navLogo: {
    color: "#a2b9ff",
    fontWeight: "900",
    fontSize: "1.6rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  navLinks: {
    display: "flex",
    gap: 30,
  },
  navLink: {
    color: "#cfd8ff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
    minHeight: "90vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#e0e7ff",
    paddingTop: 64,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(10, 31, 68, 0.75)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: 600,
    marginLeft: 60,
    padding: "40px 20px",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "900",
    marginBottom: 20,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    textShadow: "0 0 15px #a2b9ff",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: 40,
    fontWeight: "500",
    lineHeight: 1.5,
    color: "#cfd8ff",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 20,
    flexWrap: "wrap",
  },
  button: {
    padding: "14px 32px",
    fontSize: "1.1rem",
    fontWeight: "700",
    borderRadius: 50,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: 160,
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(162, 162, 255, 0.6)",
    userSelect: "none",
  },
  loginButton: {
    backgroundColor: "#4c72ff",
    color: "white",
    border: "2px solid #4c72ff",
  },
  infoSectionWrapper: {
    position: "relative",
    margin: "0",
    padding: "40px 20px",
    backgroundColor: "rgba(0, 38, 77, 0.75)",
  },
  infoOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
  },
  infoSection: {
    position: "relative",
    zIndex: 2,
    maxWidth: 900,
    margin: "0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: "40px 30px",
    boxShadow: "0 4px 20px rgba(0, 38, 77, 0.5)",
    color: "#e0e7ff",
  },
  infoTitle: {
    fontSize: "2.5rem",
    marginBottom: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#a2b9ff",
  },
  infoText: {
    fontSize: "1.125rem",
    lineHeight: 1.6,
    marginBottom: 16,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "rgba(0, 38, 77, 0.85)",
    color: "#a2b9ff",
    padding: "20px 0",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.4)",
  },
  footerLinks: {
    marginTop: 8,
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  footerLink: {
    color: "#a2b9ff",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
};

function getNavLinkStyle(isActive) {
  return {
    ...styles.navLink,
    color: isActive ? "#ffffff" : "#cfd8ff",
    borderBottom: isActive ? "2px solid #ffffff" : "none",
  };
}
