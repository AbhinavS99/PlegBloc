import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

require("dotenv").config({
  path: "../../.env",
});

function setCookie(_email) {
  // payload.
  const user = {
      email: _email
  };
  const _token = jwt.sign(user, process.env.REACT_APP_JWT_SECRET, {
      expiresIn: process.env.REACT_APP_JWTtokenExpiryTime,
  });
  console.log("token is ", _token);
  Cookies.set('token', _token);
}


function isAuthenticated() {
const token = Cookies.get("token");
try {
  const payload = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  const email = payload.email;
  return true;
} catch {
  return false;
}
}


// Call after checking isAuthenticated
function getCurrentUser() {
const token = Cookies.get("token");
const payload = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
const email = payload.email;
return email;
}

function deleteCookie() {
  Cookies.remove("token");
}

export { isAuthenticated, getCurrentUser, setCookie, deleteCookie };
