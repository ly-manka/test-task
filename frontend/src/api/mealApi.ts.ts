import { Recipe } from "@/types/Recipe";
import { fetchData } from "./client";
import { Country } from "@/types/Country";
import { Category } from "@/types/Category";
import { Ingredient } from "@/types/Ingredient";

type Params = {
  category?: string;
  country?: string;
  ingredient?: string;
}

export const getRecipes = async ({
  category,
  country,
  ingredient,
}: Params): Promise<Recipe[]> => {
  let url = "/recipes";

  if (category) {
    url = `/recipes/?category=${category}`;
  } else if (country) {
    url = `/recipes/?country=${country}`;
  } else if (ingredient) {
    url = `/recipes/?ingredient=${ingredient}`;
  }

  return fetchData(url);
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  return fetchData(`/recipes/${id}`);
};

export const getAreas = async (): Promise<Country[]> => {
  return fetchData(`/data/areas`);
};

export const getCategories = async (): Promise<Category[]> => {
  return fetchData(`/data/categories`);
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  return fetchData(`/data/ingredients`);
};