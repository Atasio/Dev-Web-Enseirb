import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service.js";


async function registerController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const newUser = await authService.register(email, password);
        res.status(201).json(newUser);
    }
    catch (error : any) {
        switch (error) {
            case "User already exists":
                res.status(409).json({ error: error.message });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const authController = { registerController };