import { Router } from "express";
import {
  getAllAreas,
  getAllCategories,
  getAllIngredients,
} from "../controllers/dataController";

const router = Router();

router.get("/areas", getAllAreas);
router.get("/categories", getAllCategories);
router.get("/ingredients", getAllIngredients);

export default router;
