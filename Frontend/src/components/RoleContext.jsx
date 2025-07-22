import React, { createContext, useContext, useState, useEffect } from "react";

const RoleContext = createContext(undefined); // on démarre à undefined pour bien détecter l'absence

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  // La bonne vérification : context est undefined seulement si hors d’un Provider
  if (context === undefined) {
    throw new Error("useRole doit être utilisé dans un RoleProvider");
  }
  return context;
}
