import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { z } from "zod";
import { authSchema } from "../schemas/auth.schema.js";


async function registerController(req: Request, res: Response) {
    try {
        console.log("Registering user with data:", req.body);
        const { email, password } = authSchema.registerSchema.parse(req.body);
        console.log("Parsed data:", { email, password });

        const newUser = await authService.register(email, password);
        res.status(201).json(newUser);
    }
    catch (error : any) {
        switch (error) {
            case "User already exists":
                res.status(409).json({ error: error.message });
                break;
            case z.ZodError:
                res.status(400).json({ error: error.errors });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const authController = { registerController };