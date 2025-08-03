
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import App from "./App.jsx";
import "./index.css"; 
import { RoleProvider } from "./components/RoleContext"; 

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoleProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RoleProvider>
    </ApolloProvider>
  </React.StrictMode>
);
