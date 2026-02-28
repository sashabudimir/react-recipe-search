import { useState } from "react";
import {
  fetchRecipesByIngredients,
  fetchRecipeDetails,
} from "./api/recipes";

import IngredientInput from "./components/IngredientInput";
import Filters from "./components/Filters";
import RecipeList from "./components/RecipeList";

export default function App() {
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState([]); // (UI stays, you can demo it as “filters UI”; Spoonacular filtering isn’t used here)
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleFilter = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const handleSearch = async () => {
    const ingredientsArray = input
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);

    if (ingredientsArray.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSelectedRecipe(null);

      const results = await fetchRecipesByIngredients(ingredientsArray);
      setRecipes(results);

      if (!results || results.length === 0) {
        setError("No recipes found. Try different ingredients.");
      }
    } catch (err) {
      console.error(err);
      setRecipes([]);
      setError("API error — check your key/quota and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe = async (recipeFromList) => {
    try {
      setDetailsLoading(true);
      setError(null);

      const full = await fetchRecipeDetails(recipeFromList.id);
      setSelectedRecipe(full);
    } catch (err) {
      console.error(err);
      setSelectedRecipe(null);
      setError("Could not load recipe details. Try another recipe.");
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 6 }}>Recipe Search Engine</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Enter ingredients separated by commas. Click a recipe for ingredients and instructions.
      </p>

      <IngredientInput value={input} onChange={setInput} onSearch={handleSearch} />
      <Filters selected={filters} onToggle={toggleFilter} />

      {loading && <p style={{ marginTop: 14 }}>Loading…</p>}
      {error && <p style={{ marginTop: 14, color: "crimson" }}>{error}</p>}

      <RecipeList recipes={recipes} onSelect={handleSelectRecipe} />

      {detailsLoading && <p style={{ marginTop: 18 }}>Loading recipe details…</p>}

      {selectedRecipe && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 12,
            background: "#fafafa",
            color: "#111",
          }}
        >
          <h2 style={{ marginTop: 0 }}>{selectedRecipe.title}</h2>

          {selectedRecipe.image && (
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{ width: 350, maxWidth: "100%", borderRadius: 10 }}
            />
          )}

          <p style={{ marginTop: 12 }}>
            <strong>Ready in:</strong> {selectedRecipe.readyInMinutes ?? "?"} minutes
          </p>
          <p>
            <strong>Servings:</strong> {selectedRecipe.servings ?? "?"}
          </p>

          <h3>Ingredients</h3>
          {selectedRecipe.extendedIngredients?.length ? (
            <ul>
              {selectedRecipe.extendedIngredients.map((ing, idx) => (
                <li key={ing.id ?? idx}>{ing.original}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredient list provided.</p>
          )}

          <h3>Instructions</h3>
          {selectedRecipe.instructions ? (
            <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
          ) : (
            <p>No instructions provided for this recipe.</p>
          )}

          <button
            onClick={() => setSelectedRecipe(null)}
            style={{ marginTop: 18, padding: "10px 14px" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}