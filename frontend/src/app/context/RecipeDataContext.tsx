"use client";

import { Category } from "@/types/Category";
import { Country } from "@/types/Country";
import { Ingredient } from "@/types/Ingredient";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import * as mealApi from "@/api/mealApi.ts";

interface RecipeDataContextType {
  categories: Category[];
  countries: Country[];
  ingredients: Ingredient[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const RecipeDataContext = createContext<RecipeDataContextType | undefined>(
  undefined
);

export const RecipeDataProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    mealApi.getAreas().then(setCountries);
    mealApi.getCategories().then(setCategories);
    mealApi.getIngredients().then(setIngredients);
  }, []);

  const value = useMemo(
    () => ({
      categories,
      countries,
      ingredients,
      setCategories,
      setCountries,
      setIngredients,
    }),
    [categories, countries, ingredients]
  );

  return (
    <RecipeDataContext.Provider value={value}>
      {children}
    </RecipeDataContext.Provider>
  );
};

export const useData = (): RecipeDataContextType => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
