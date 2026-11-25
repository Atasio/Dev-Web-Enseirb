import type { NextFunction, Request, Response } from "express";
import { getMovies, searchMovies } from "../services/movies.service.js";
import { searchMoviesSchema } from "../schemas/movies.schema.js";

// Contrôleur de récupération des films populaires
export async function getMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movies = await getMovies();

    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
}


// Contrôleur de validation et de recherche des films et des séries
export async function searchMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = searchMoviesSchema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({
        error: "Paramètres de recherche invalides.",
        details: result.error.issues
      });
      return;
    }

    const query = result.data.q;

    const movies = await searchMovies(query);

    res.status(200).json(movies);

  } catch (error) {
    next(error);
  }
}