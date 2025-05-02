"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FILTERS } from "@/constantas";
import { FilterType } from "@/types/FilterType";
import { Recipe } from "@/types/Recipe";
import { useData } from "../context/RecipeDataContext";
import * as mealApi from "@/api/mealApi.ts";

const RecipeListPage = () => {
  const { categories, countries, ingredients } = useData();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get('filter') as FilterType || 'top';
  const selectedValue = searchParams.get('value');

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleFilterChange = (filter: FilterType) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    params.delete("value");
    router.push(`?${params.toString()}`);
  };

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("value", value);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const getR = async () => {
      if (activeFilter === "top" && !selectedValue) {
        const res = await mealApi.getRecipes({});
        setRecipes(res);
      } else if (activeFilter === "category" && selectedValue) {
        const res = await mealApi.getRecipes({ category: selectedValue });
        setRecipes(res);
      } else if (activeFilter === "country" && selectedValue) {
        const res = await mealApi.getRecipes({ country: selectedValue });
        setRecipes(res);
      } else if (activeFilter === "ingredient" && selectedValue) {
        const res = await mealApi.getRecipes({ ingredient: selectedValue });
        setRecipes(res);
      } else {
        setRecipes([]);
      }
    };

    getR();
  }, [activeFilter, selectedValue]);

  return (
    <main className="w-full max-w-xl mx-auto space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <p className="text-fuchsia-400 text-xl">Filter By:</p>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-2xl border transition cursor-pointer duration-300 ${
              activeFilter === filter
                ? "bg-fuchsia-400 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-fuchsia-500 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {["country", "category", "ingredient"].includes(activeFilter) && (
        <select
          value={selectedValue ?? ""}
          onChange={(e) => handleValueChange(e.target.value)}
          className="border px-4 py-2 rounded-md bg-gray-900 w-[300px]"
        >
          <option value="">Select {activeFilter}</option>
          {(activeFilter === "country"
            ? countries
            : activeFilter === "category"
            ? categories
            : ingredients
          ).map((value) => (
            <option key={String(value)} value={String(value)}>
              {String(value)}
            </option>
          ))}
        </select>
      )}

      <div className="text-lg font-semibold">
        {activeFilter === "top" && "Top recipes"}
        {activeFilter === "category" &&
          selectedValue &&
          `Category: ${selectedValue} recipes`}
        {activeFilter === "country" &&
          selectedValue &&
          `Country: ${selectedValue} recipes`}
        {activeFilter === "ingredient" &&
          selectedValue &&
          `Ingredient: ${selectedValue} recipes`}
      </div>

      <ul className="list-disc pl-6">
        {recipes.length === 0 && activeFilter === "top" && !selectedValue && (
          <li>No top recipes available.</li>
        )}
        {recipes.length === 0 &&
          activeFilter === "ingredient" &&
          selectedValue && (
            <li>No recipes found with {selectedValue} ingredient.</li>
          )}
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link href={`/recipes/${recipe.idMeal}`} className="btn-link">
              {recipe.strMeal}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default RecipeListPage;
