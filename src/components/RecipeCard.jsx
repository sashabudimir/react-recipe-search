export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      onClick={() => onSelect(recipe)}
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 12,
        cursor: "pointer",
        background: "white",
      }}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "100%", borderRadius: 10, marginBottom: 10 }}
      />
      <h3 style={{ margin: "0 0 6px" }}>{recipe.title}</h3>
      <p style={{ margin: 0 }}>Ready in {recipe.readyInMinutes ?? "?"} minutes</p>
    </div>
  );
}