export const CATEGORY_OPTIONS = [
  { slug: "bakery", name: "面包店", icon: "Croissant", color: "bg-pink-100 text-pink-600" },
  { slug: "restaurant", name: "餐厅", icon: "UtensilsCrossed", color: "bg-amber-100 text-amber-700" },
  { slug: "place", name: "游玩的地方", icon: "MapPin", color: "bg-violet-100 text-violet-700" },
  { slug: "moment", name: "其他有意义的事情", icon: "Sparkles", color: "bg-sky-100 text-sky-700" }
] as const;

export type CategorySlug = (typeof CATEGORY_OPTIONS)[number]["slug"];
