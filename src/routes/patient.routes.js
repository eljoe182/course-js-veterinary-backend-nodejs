import { Router } from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/patient.controller.js";
import { verifyToken } from "../middleware/vet.middleware.js";

const router = Router();

router.get("/", verifyToken, index);
router.get("/show/:id", verifyToken, show);
router.post("/store", verifyToken, store);
router.put("/update/:id", verifyToken, update);
router.delete("/destroy/:id", verifyToken, destroy);

export default router;
