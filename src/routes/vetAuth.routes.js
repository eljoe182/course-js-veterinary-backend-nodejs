import { Router } from "express";
import {
  signup,
  confirm,
  login,
  forgotPassword,
  validateToken,
  changePassword,
  resetPassword,
} from "../controllers/vetAuth.controller.js";
import { verifyToken } from "../middleware/vet.middleware.js";

const router = Router();

router.post("/signup", signup);
router.get("/confirm/:token", confirm);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.get("/reset_password/:token", validateToken);
router.post("/reset_password/:token", resetPassword);
router.post("/change_password", verifyToken, changePassword);

export default router;
