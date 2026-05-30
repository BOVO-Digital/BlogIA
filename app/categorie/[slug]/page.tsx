import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES, Category } from "@/lib/types";
import { getCategoryMeta } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";
import ArticleCard from "@/components/ArticleCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return { title: cat.label, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const isValid = CATEGORIES.some((c) => c.slug === slug);
  if (!isValid) notFound();

  const cat = getCategoryMeta(slug as Category);
  const articles = getArticlesByCategory(slug as Category);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Accueil</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{cat.label}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <CategoryIcon category={slug as Category} className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{cat.label}</h1>
          <p className="text-gray-500 text-sm">{cat.description}</p>
        </div>
        <span className="ml-auto text-sm text-gray-400">
          {articles.length} article{articles.length > 1 ? "s" : ""}
        </span>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="flex justify-center mb-4">
            <CategoryIcon category={slug as Category} className="w-10 h-10 opacity-30" />
          </div>
          <p>Aucun article dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
