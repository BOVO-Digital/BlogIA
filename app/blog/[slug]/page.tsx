import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight, Tag, Star } from "lucide-react";
import { getArticleBySlug, getAllSlugs, getRelatedArticles } from "@/lib/articles";
import { getCategoryMeta, formatDate } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";
import ArticleCard from "@/components/ArticleCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80";

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cat = getCategoryMeta(article.category);
  const related = getRelatedArticles(article, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-700">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/categorie/${article.category}`} className="flex items-center gap-1 text-violet-600 hover:text-violet-800 font-medium">
            <CategoryIcon category={article.category} className="w-3.5 h-3.5" />
            {cat.label}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-violet-600 uppercase tracking-widest">
              <CategoryIcon category={article.category} className="w-3.5 h-3.5" />
              {cat.label}
            </span>
            {article.featured && (
              <span className="flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                <Star className="w-3 h-3" />
                À la une
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">{article.excerpt}</p>

          <div className="flex items-center justify-between py-4 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{article.author.name}</p>
                {article.author.bio && (
                  <p className="text-xs text-gray-400">{article.author.bio}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} min
              </span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <Image
            src={article.coverImage || PLACEHOLDER}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-gray-100">
            <Tag className="w-4 h-4 text-gray-400" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-sm text-gray-600 bg-gray-100 border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((rel) => (
              <ArticleCard key={rel.slug} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
