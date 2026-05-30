import Link from "next/link";
import { Category } from "@/lib/types";
import { getCategoryMeta } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";

interface Props {
  category: Category;
  active?: boolean;
}

export default function CategoryPill({ category, active = false }: Props) {
  const cat = getCategoryMeta(category);

  return (
    <Link
      href={`/categorie/${category}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border transition-all ${
        active
          ? "bg-violet-50 text-violet-700 border-violet-200"
          : "border-gray-200 text-gray-600 hover:border-violet-200 hover:text-violet-700"
      }`}
    >
      <CategoryIcon category={category} className="w-3.5 h-3.5" />
      {cat.label}
    </Link>
  );
}
