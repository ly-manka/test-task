import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as mealApi from "@/api/mealApi.ts";
import { getIngredientsWithMeasure } from "@/utils/getIngredientsWithMeasure";

const RecipePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const recipe = await mealApi.getRecipeById(id);
  if (!recipe) return notFound();

  const categoryRecipes = await mealApi.getRecipes({
    category: recipe.strCategory,
  });

  const ingredients = getIngredientsWithMeasure(recipe);

  const steps = recipe.strInstructions
    .split(/\r?\n|(?<=\.)\s+/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0);

  console.log("recipe", recipe);

  return (
    <main className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-[1fr_300px] p-3 lg:p-6">
      <div className="">
        <div className="flex">
          <Link
            href={"/recipes"}
            className="btn-link uppercase font-bold border-2 px-4 py-2 rounded"
          >
            {" "}
            &lt;- Back to recipes
          </Link>
        </div>

        <div className="flex gap-10 mt-4">
          <div className="flex-1">
            <div className="md:flex gap-2">
              <Image
                width={400}
                height={400}
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                priority
                className="w-full max-w-[400px] rounded-xl"
              />
              <div className="flex flex-col justify-center flex-grow-1">
                <h1 className="text-3xl font-bold text-center mt-6 lg:my-3">
                  {recipe.strMeal}
                </h1>
                <Link
                  href={`/recipes?filter=country&value=${recipe.strArea}`}
                  className="btn-link text-center block text-xl"
                >
                  {recipe.strArea}
                </Link>
              </div>
            </div>

            <hr className="border-gray-600 my-6 lg:my-10" />

            <section className="">
              <h2 className="text-2xl font-semibold text-center">
                Instructions
              </h2>
              <ol className="list-decimal pl-4 space-y-2">
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </section>

            <hr className="border-gray-600 my-6 lg:my-10" />

            <section className="grid justify-center gap-y-4">
              <h2 className="text-2xl font-semibold">Ingredients:</h2>
              <ul className="list-disc pl-6">
                {ingredients.map(({ ingredient, measure }, index) => {
                  const formattedIng = ingredient.replace(/ /g, "+");
                  return (
                    <li key={`${ingredient}-${index}`}>
                      <p>
                        <Link
                          href={`/recipes?filter=ingredient&value=${formattedIng}`}
                          className="btn-link"
                        >
                          {ingredient}
                        </Link>
                        <span className="text-gray-400">
                          {measure && `: ${measure}`}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            <hr className="border-gray-600 my-6 lg:my-10 lg:hidden" />
          </div>
        </div>
      </div>

      <aside className="lg:border-l lg:pl-6">
        <h2 className="text-xl font-semibold mb-2">
          More in {recipe.strCategory}
        </h2>
        <ul className="list-disc pl-4">
          {categoryRecipes
            .filter((r) => r.idMeal !== recipe.idMeal)
            .map((r) => (
              <li key={r.idMeal}>
                <Link href={`/recipes/${r.idMeal}`} className="btn-link">
                  {r.strMeal}
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </main>
  );
};

export default RecipePage;
