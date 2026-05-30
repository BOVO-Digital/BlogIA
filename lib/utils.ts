import { CATEGORIES, Category, CategoryMeta } from "./types";

export function getCategoryMeta(slug: Category): CategoryMeta {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function categoryColorClass(color: string): {
  bg: string;
  text: string;
  border: string;
  badge: string;
} {
  const map: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    violet: {
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      border: "border-violet-500/20",
      badge: "bg-violet-500/20 text-violet-300",
    },
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      badge: "bg-blue-500/20 text-blue-300",
    },
    red: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
      badge: "bg-red-500/20 text-red-300",
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
      badge: "bg-orange-500/20 text-orange-300",
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      badge: "bg-green-500/20 text-green-300",
    },
  };
  return map[color] ?? map.violet;
}
