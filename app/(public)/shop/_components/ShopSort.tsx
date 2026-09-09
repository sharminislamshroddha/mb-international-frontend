export const SORT_OPTIONS = {
  newest: { label: "Newest", sortBy: "createdAt", sortOrder: "desc" },
  "price-asc": {
    label: "Price: Low to High",
    sortBy: "price",
    sortOrder: "asc",
  },
  "price-desc": {
    label: "Price: High to Low",
    sortBy: "price",
    sortOrder: "desc",
  },
  rating: {
    label: "Top Rated",
    sortBy: "averageRating",
    sortOrder: "desc",
  },
  name: { label: "Name: A-Z", sortBy: "name", sortOrder: "asc" },
} as const;

export type SortKey = keyof typeof SORT_OPTIONS;

interface Props {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export default function ShopSort({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as SortKey)}
      className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {Object.entries(SORT_OPTIONS).map(([key, option]) => (
        <option key={key} value={key}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
