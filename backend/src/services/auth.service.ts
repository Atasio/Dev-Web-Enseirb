import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function register(email: string, password: string) {
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);


  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
    },
  });

  return newUser;
}

export const authService = { register };