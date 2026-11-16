import cors from "cors";
import express from "express";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "seenflix-api" });
});

app.use((_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "La ressource demandée n'existe pas.",
    },
  });
});
