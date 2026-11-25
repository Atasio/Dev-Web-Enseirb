import { Router } from "express";
import {
  getMoviesController,
  searchMoviesController
} from "../controllers/movies.controller.js";

const router = Router();

// Route de récupération des films populaires
router.get("/", getMoviesController);

// Route de recherche des films et des séries
router.get("/search", searchMoviesController);

export default router;