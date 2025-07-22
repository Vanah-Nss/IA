import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-blueMarine-600 text-white hover:bg-blueMarine-700 transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
    </button>
  );
}
