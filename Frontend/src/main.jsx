import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient";
import App from "./App";
import { RoleProvider } from "./components/RoleContext";
import './index.css' 

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RoleProvider>
        <App />
      </RoleProvider>
    </BrowserRouter>
  </ApolloProvider>
);
