import * as nodeFetch from "node-fetch";

export const getLoginToken = async () => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({ username: "nadia@me.com", password: "admin123" }),
  });
  if (response.status !== 200) {
    throw new Error("There was an error trying to log in");
  }
  const body = await response.json();
  return body.token;
};
