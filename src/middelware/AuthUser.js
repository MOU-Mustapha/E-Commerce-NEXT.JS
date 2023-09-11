import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  const token = req.headers.get("Authorization").split(" ")[1];
  if (!token) return false;
  try {
    const authUserInfo = await jwt.verify(token, "default_secret_key");
    if (authUserInfo) {
      return authUserInfo;
    }
  } catch (err) {
    return false;
  }
};

export default AuthUser;
