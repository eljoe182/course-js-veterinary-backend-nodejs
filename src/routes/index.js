import { Router } from "express";
import vet from "./vet.routes.js";
import vetAuth from "./vetAuth.routes.js";
import patient from "./patient.routes.js";

const router = Router();

router.use("/vet", [vet, vetAuth]);
router.use("/patient", patient);

export default router;
