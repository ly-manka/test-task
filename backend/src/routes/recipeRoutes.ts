import { Router } from "express";
import { getRecipes, getRecipeInfo } from "../controllers/recipeController";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeInfo);

export default router;
