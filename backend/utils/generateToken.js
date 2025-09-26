import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRE = process.env.JWT_EXPIRE || "2d";

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign(
    { id: user._id, role: user.role, status: user.status },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

export default generateToken;
