import { Request, Response } from "express";
import axios from "axios";
import { API_BASE_URL as API_URL } from "../constantas";
import { handleError } from "../utils/handleError";

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}list.php?a=list`);
    const result =
      response.data?.meals?.map((m: { strArea: any }) => m.strArea) || [];

    res.json(result);
  } catch (error) {
    handleError(res, error, "Error fetching recipes");
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}list.php?c=list`);
    const result =
      response.data?.meals?.map((m: { strCategory: any }) => m.strCategory) ||
      [];

    res.json(result);
  } catch (error) {
    handleError(res, error, "Error fetching recipes");
  }
};

export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}list.php?i=list`);
    const result =
      response.data?.meals?.map(
        (m: { strIngredient: any }) => m.strIngredient
      ) || [];

    res.json(result);
  } catch (error) {
    handleError(res, error, "Error fetching recipes");
  }
};
