import { Router } from "express";
import { index, update } from "../controllers/vet.controller.js";
import { verifyToken } from "../middleware/vet.middleware.js";

const router = Router();

router.get("/", verifyToken, index);
router.put("/update/:id", verifyToken, update);

export default router;
