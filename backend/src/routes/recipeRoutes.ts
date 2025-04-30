import { Router } from "express";
import {
  getRecipes,
  getRecipeInfo,
  getAllAreas,
  getAllCategories,
  getAllIngredients,
} from "../controllers/recipeController";

const router = Router();

router.get("/areas", getAllAreas);
router.get("/categories", getAllCategories);
router.get("/ingredients", getAllIngredients);
router.get("/", getRecipes);
router.get("/:id", getRecipeInfo);

export default router;
