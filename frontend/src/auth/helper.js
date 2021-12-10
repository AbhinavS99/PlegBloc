import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function isAuthenticated() {
  const token = Cookies.get("token");
  try {
    const payload = jwt.verify(
      token,
      "bc976108effc39c89e17727f269714a60e8046d9"
    );
    const email = payload.email;
    return true;
  } catch {
    return false;
  }
}

export { isAuthenticated };
