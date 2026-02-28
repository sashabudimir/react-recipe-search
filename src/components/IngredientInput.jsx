export default function IngredientInput({ value, onChange, onSearch }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <input
        type="text"
        placeholder="Enter ingredients separated by commas (e.g., chicken, rice)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 380, padding: 10 }}
      />
      <button onClick={onSearch} style={{ padding: "10px 14px" }}>
        Search
      </button>
    </div>
  );
}