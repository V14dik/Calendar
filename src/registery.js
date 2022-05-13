const { apiKey } = require("./token");
console.log(apiKey);

export async function reg(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  const { idToken, error } = await response.json();
  if (error) throw new Error("Error");
  localStorage.setItem("token", idToken);
  return idToken;
}

export async function enter(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { idToken, error } = await response.json();
  if (error) throw new Error("Bruh...");
  localStorage.setItem("token", idToken);
  return idToken;
}
