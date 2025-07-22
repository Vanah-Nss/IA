import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      id
      username
      role
    }
  }
`;

export default function Dashboard() {
  const { data, loading, error } = useQuery(ME_QUERY);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (data?.me) {
      setRole(data.me.role);  // le rôle vient du backend (ex: "ADMIN", "USER")
    }
  }, [data]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      {role === "ADMIN" ? <AdminPanel /> : <UserPanel />}
    </div>
  );
}
