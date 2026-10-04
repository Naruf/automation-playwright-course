import * as nodeFetch from "node-fetch";

export const getLoginToken = async (username, password) => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
  });

  if (!response.ok) {
    const details = await response.clone().text();
    throw new Error(
      `Login failed: HTTP ${response.status} ${response.statusText}; response: ${details}`,
    );
  }
  const body = await response.json();
  return body.token;
};
