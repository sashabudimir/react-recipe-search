const DIETS = [
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten Free", value: "gluten free" },
  { label: "Ketogenic", value: "ketogenic" },
];

export default function Filters({ selected, onToggle }) {
  return (
    <div style={{ marginTop: 14 }}>
      <p style={{ margin: "10px 0 6px" }}>
        <strong>Diet Filters</strong> (multi-select)
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {DIETS.map((d) => (
          <label key={d.value} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selected.includes(d.value)}
              onChange={() => onToggle(d.value)}
            />
            {d.label}
          </label>
        ))}
      </div>
    </div>
  );
}