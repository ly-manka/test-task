import { Request, Response } from "express";
import axios from "axios";
import { API_BASE_URL as API_URL } from "../constantas";
import { handleError } from "../utils/handleError";

interface Filters {
  ingredient: string;
  country: string;
  category: string;
}

export const getRecipes = async (req: Request<Filters>, res: Response) => {
  try {
    const { ingredient, country, category } = req.query;

    let url = `${API_URL}search.php?s=`;

    if (ingredient) {
      url = `${API_URL}filter.php?i=${ingredient}`;
    } else if (country) {
      url = `${API_URL}filter.php?a=${country}`;
    } else if (category) {
      url = `${API_URL}filter.php?c=${category}`;
    }

    const response = await axios.get(url);

    const result = response.data?.meals || [];

    res.json(result);
  } catch (error) {
    handleError(res, error, "Error fetching recipes");
  }
};

export const getRecipeInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_URL}lookup.php?i=${id}`);

    const result = response.data?.meals === 'Invalid ID' ? null : response.data?.meals?.[0] ?? null;

    res.json(result);
  } catch (error) {
    handleError(res, error, "Error fetching recipes");
  }
};
