import { Recipe } from "@/types/Recipe";

export const getIngredientsWithMeasure = (recipe: Recipe) => {
  return Array.from({ length: 20 }, (_, i) => {
    const index = i + 1;
    const ingredient = recipe[`strIngredient${index}` as keyof Recipe]?.trim();
    const measure = recipe[`strMeasure${index}` as keyof Recipe]
      ?.trim()
      .toLowerCase();

    if (ingredient) {
      return { ingredient, measure: measure || "" };
    }

    return null;
  }).filter(Boolean) as { ingredient: string; measure: string }[];
};
