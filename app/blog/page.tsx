import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleGrid from "@/components/ArticleGrid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tous les articles sur l'IA, le développement et la tech.",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Tous les articles</h1>
        <p className="text-gray-500 text-sm">
          {articles.length} article{articles.length > 1 ? "s" : ""} publiés
        </p>
      </div>
      <ArticleGrid articles={articles} />
    </div>
  );
}
