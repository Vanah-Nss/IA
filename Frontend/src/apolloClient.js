// apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { fromPromise } from "@apollo/client";



const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  const response = await fetch("http://localhost:8000/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          refreshToken(refreshToken: "${refresh}") {
            token
            refreshToken
          }
        }
      `,
    }),
  });

  const result = await response.json();
  const { token, refreshToken: newRefresh } = result.data.refreshToken;
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", newRefresh);
  return token;
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.message === "Signature has expired") {
        return fromPromise(refreshToken()).flatMap((newToken) => {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `JWT ${newToken}`,
            },
          }));
          return forward(operation);
        });
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
