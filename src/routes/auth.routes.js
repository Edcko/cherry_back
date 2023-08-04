import { Router } from "express";
import { authController } from "../contollers/auth.controllers.js";
import authenticateJWT from "../middlewares/authentication.js";

const router = Router();

router.post("/auth/login", authController.login);

router.get("/auth/usuario", authenticateJWT, authController.getPerfil);

export default router;