const API_KEY = import.meta.env.VITE_API_KEY;

// 1) List recipes by ingredients (reliable)
export async function fetchRecipesByIngredients(ingredients) {
  const ingredientString = ingredients.join(",");

  const url =
    "https://api.spoonacular.com/recipes/findByIngredients" +
    `?ingredients=${encodeURIComponent(ingredientString)}` +
    "&number=12" +
    "&ignorePantry=true" +
    `&apiKey=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  // returns an array of { id, title, image, usedIngredients, missedIngredients, ... }
  return await res.json();
}

// 2) Get full details for the clicked recipe (ingredients + instructions)
export async function fetchRecipeDetails(id) {
  const url =
    `https://api.spoonacular.com/recipes/${id}/information` +
    "?includeNutrition=false" +
    `&apiKey=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  // returns { extendedIngredients, instructions, readyInMinutes, servings, ... }
  return await res.json();
}