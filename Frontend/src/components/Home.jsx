import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiArrowRight, FiStar } from "react-icons/fi";
import { FaRobot, FaChevronDown,FaEnvelope,FaPhone,FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Accueil");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Accueil", to: "hero", type: "scroll" },
    { label: "Fonctionnalités", to: "features", type: "scroll" },
    { label: "Tarifs", to: "audience", type: "scroll" },
    { label: "Connexion", to: "/login", style: "outline", type: "route" },
    { label: "S'inscrire", to: "/register", style: "primary", type: "route" },
  ];

  const handleClick = (item) => {
    setActive(item.label);
    setOpen(false);

    if (item.type === "route") {
      navigate(item.to);
    } else if (item.type === "scroll") {
      const element = document.getElementById(item.to);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">
        <div className="text-white font-bold text-3xl tracking-tight">
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            IA Vitrine
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-8">
          {menuItems.map(({ label, to, style }) => (
            <li key={label}>
              {style === "primary" ? (
                <button
                  onClick={() => handleClick({ label, to, style, type: "route" })}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  {label}
                </button>
              ) : style === "outline" ? (
                <button
                  onClick={() => handleClick({ label, to, style, type: "route" })}
                  className="border-2 border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-full font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  {label}
                </button>
              ) : (
                <a
                  href={`#${to}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick({ label, to, style, type: "scroll" });
                  }}
                  className={`cursor-pointer font-medium hover:underline underline-offset-4 transition-all duration-300 ${
                    active === label ? "text-white underline" : "text-white/90 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-3xl hover:text-blue-300 transition-colors duration-300"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
          <ul className="flex flex-col gap-6 py-8 px-8">
            {menuItems.map(({ label, to, style, type }) => (
              <li key={label}>
                <a
                  href={type === "scroll" ? `#${to}` : to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick({ label, to, style, type });
                  }}
                  className="text-white font-medium hover:text-blue-300 transition-colors duration-300 block py-2 cursor-pointer"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}



function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["textuels", "visuels"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-24 gap-12 text-white overflow-hidden bg-[#0f172a] font-sans"
    >
    
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center opacity-10 blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0f172a]/90 via-[#1e293b]/90 to-black/90" />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-xl w-full space-y-8 animate-fadeInLeft text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Générez vos contenus{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
              {words[currentWord]}
            </span>
            <span className="absolute -right-1 top-0 w-1 h-full bg-blue-400 animate-blink" />
          </span>
          <br />
          <span className="text-white/80">
            en quelques clics grâce à l’Intelligence Artificielle
          </span>
        </h1>

        <p className="text-white/70 leading-relaxed text-lg">
          Transformez vos idées en créations élégantes, percutantes, et uniques. Gagnez du temps
          et démarquez-vous avec des visuels & textes haut de gamme.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center pt-4">
          <button className="group bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
            Commencer maintenant
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

<div className="w-full md:flex-1 z-10 animate-fadeInRight">
  <img
    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
    alt="Développeur IA"
className="w-full h-auto max-h-[700px] md:max-h-[800px] object-cover rounded-2xl shadow-2xl border border-white/10"

  />
</div>


      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <FaChevronDown className="text-white/60 text-2xl animate-bounce" />
      </div>
    </section>
  );
}





function Features() {
  const features = [
    { 
      icon: "✍️", 
      title: "Génération de Texte IA", 
      desc: "Créez du contenu de qualité professionnelle en quelques secondes avec nos modèles IA avancés.",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: "🎨", 
      title: "Génération d’images marketing", 
      desc: "Générez des images, logos et visuels marketing impactants adaptés à votre marque.",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: "⚡", 
      title: "Exportation facile", 
      desc: "Résultats instantanés grâce à notre infrastructure cloud optimisée et sécurisée.",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: "📊", 
      title: "Historique & tableau de bord", 
      desc: "Tableau de bord intelligent avec métriques détaillées et insights personnalisés.",
      gradient: "from-green-500 to-teal-500"
    },
  ];

  return (
    <section id="features" className="relative py-32 bg-[#0f172a]">
     
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Fonctionnalités
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Premium</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Découvrez les outils qui transformeront votre processus créatif
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, desc, gradient }, index) => (
            <div
              key={title}
              className="group relative bg-white rounded-3xl p-8 shadow-xl border border-transparent hover:border-transparent transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
 
                <div className="rounded-3xl bg-white w-full h-full"></div>
              </div>

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl text-white text-3xl mb-6 shadow-lg`}>
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetAudience() {
  const audiences = [
    {
      title: "Agences de Communication",
      desc: "Multipliez votre productivité créative",
      icon: "🏢",
      tarif: "À partir de 29€/mois",
    },
    {
      title: "Freelances & Community Managers",
      desc: "Créez du contenu premium rapidement",
      icon: "💼",
      tarif: "Pack Pro dès 12€/mois",
    },
    {
      title: "Utilisateurs LinkedIn & Recruteurs",
      desc: "Optimisez vos campagnes de recrutement",
      icon: "👥",
      tarif: "A partir de 19€/mois",
    },
  ];

  return (
    <section id="audience" className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Qui utilise
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> IA Vitrine</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Rejoignez des milliers de professionnels qui transforment déjà leur créativité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map(({ title, desc, icon, tarif }, index) => (
            <div
              key={title}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">{icon}</div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-white/70 leading-relaxed">{desc}</p>
                <p className="text-sm text-blue-400 font-semibold">{tarif}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function CallToAction() {
  return (
  <section
  id="cta"
  className="relative py-32 overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80')",
  }}
>


      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Prêt à gagner du temps
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            et booster votre contenu ?
          </span>
        </h2>

        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Rejoignez la nouvelle génération de créateurs qui utilisent l'IA pour repousser les limites de l'innovation.
        </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  <button
    onClick={() => window.location.href = "/register"}
    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg transition-transform duration-300 hover:scale-105"
  >
    Créer un compte
  </button>
</div>

      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <FaRobot className="text-blue-400" />
              IA Vitrine
            </div>
            <p className="text-white/70 leading-relaxed">
              La plateforme IA qui transforme votre créativité en résultats exceptionnels.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
                🔵
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="LinkedIn">
                🔗
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Produit</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Tarifs</a></li>

            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Entreprise</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors duration-300">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>

            </ul>
          </div>

          <div>
      
      <h4 className="font-semibold mb-6 text-white">Contact</h4>
     <ul className="space-y-3 text-white/70">
    <li className="flex items-center gap-3">
    <FaEnvelope className="text-white" />
    <a href="mailto:IAvitrine@gmail.com" className="hover:text-white transition-colors duration-300">
      IAvitrine@gmail.com
    </a>
  </li>
  <li className="flex items-center gap-3">
    <FaPhone className="text-white" />
    <a href="tel:+261341234567" className="hover:text-white transition-colors duration-300">
      +261 34 12 345 67
    </a>
  </li>
  <li className="flex items-center gap-3">
    <FaMapMarkerAlt className="text-white" />
    <span className="hover:text-white transition-colors duration-300">
      Madagascar, Tuléar 601
    </span>
  </li>
</ul>

          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <div>© 2025 IA Vitrine. Tous droits réservés.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-300">Politique de confidentialité</a>
          
          </div>
        </div>
      </div>
    </footer>
  );
}



export default function App() {
  return (
    <div className="min-h-screen bg-white">
  
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TargetAudience />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}