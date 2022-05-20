import jwt from "jsonwebtoken";

export const generateTokenActivation = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const generateJWT = (vet) => {
  return jwt.sign(
    {
      id: vet._id,
      email: vet.email,
      name: vet.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const validateJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};
