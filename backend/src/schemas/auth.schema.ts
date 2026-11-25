import { z } from "zod";

const registerSchema = z.object({
  email: z.email("L'adresse e-mail n'est pas valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères.")
});

export const authSchema = { registerSchema };