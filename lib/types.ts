export type Category =
  | "intelligence-artificielle"
  | "developpement"
  | "cybersecurite"
  | "tech-innovation"
  | "outils-productivite";

export interface CategoryMeta {
  slug: Category;
  label: string;
  description: string;
  color: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "intelligence-artificielle",
    label: "Intelligence Artificielle",
    description: "LLMs, agents IA, recherche et applications concrètes",
    color: "violet",
  },
  {
    slug: "developpement",
    label: "Développement",
    description: "Web, mobile, bonnes pratiques et architectures modernes",
    color: "blue",
  },
  {
    slug: "cybersecurite",
    label: "Cybersécurité",
    description: "Menaces, outils de défense et bonnes pratiques",
    color: "red",
  },
  {
    slug: "tech-innovation",
    label: "Tech & Innovation",
    description: "Startups, tendances et disruptions technologiques",
    color: "orange",
  },
  {
    slug: "outils-productivite",
    label: "Outils & Productivité",
    description: "Apps, automatisations et workflows efficaces",
    color: "green",
  },
];

export interface ArticleAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: Category;
  tags: string[];
  author: ArticleAuthor;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  coverImage?: string;
  readingTime: number;
  content: string;
  featured?: boolean;
  draft?: boolean;
}
