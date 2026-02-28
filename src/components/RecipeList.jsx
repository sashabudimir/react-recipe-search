import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onSelect }) {
  return (
    <div
      style={{
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 14,
      }}
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onSelect={onSelect} />
      ))}
    </div>
  );
}