import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", async (req, res) => {
    authController.registerController(req, res)
});

router.post("/login", async (req, res) => {
});

router.post("/refresh", async (req, res) => {
});

export default router;