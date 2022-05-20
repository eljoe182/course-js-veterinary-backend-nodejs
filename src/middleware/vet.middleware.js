import { validateJWT } from "../helpers/security.js";
import vetModel from "../models/vet.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("No token provided");
    }

    if (!`${authorization}`.startsWith("Bearer ")) {
      throw new Error("Invalid token");
    }

    const token = authorization.split(" ")[1];
    const result = validateJWT(token);

    if (!result) {
      throw new Error("Invalid token");
    }

    const vet = await vetModel
      .findById(result.id)
      .select("-password -token -confirmed -__v -createdAt -updatedAt")
      .lean();
    req.vet = vet;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
