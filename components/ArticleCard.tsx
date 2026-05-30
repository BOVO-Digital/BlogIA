import Link from "next/link";
import { Eye, Heart, MessageCircle, Clock } from "lucide-react";
import { Article } from "@/lib/types";
import { getCategoryMeta, formatDate } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";

interface Props {
  article: Article;
  variant?: "default" | "compact";
}

const CAT_COLORS: Record<string, string> = {
  "intelligence-artificielle": "#7c3aed",
  "developpement": "#2563eb",
  "cybersecurite": "#dc2626",
  "tech-innovation": "#ea580c",
  "outils-productivite": "#16a34a",
};

const DEFAULT_IMGS: Record<string, string> = {
  "intelligence-artificielle": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=75",
  "developpement": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=75",
  "cybersecurite": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=75",
  "tech-innovation": "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=75",
  "outils-productivite": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
};

export default function ArticleCard({ article, variant = "default" }: Props) {
  const cat = getCategoryMeta(article.category);
  const color = CAT_COLORS[article.category] ?? "#7c3aed";
  const img = article.coverImage ?? DEFAULT_IMGS[article.category] ?? "";

  const views = ((624 + article.slug.length * 137) % 2000) + 400;
  const likes = ((111 + article.slug.length * 53) % 400) + 80;
  const comments = ((17 + article.slug.length * 13) % 100) + 10;

  if (variant === "compact") {
    return (
      <Link href={`/blog/${article.slug}`} style={{ display: "flex", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 64, height: 52, borderRadius: 10, flexShrink: 0,
          backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center",
          backgroundColor: "#f3f4f6",
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
            {cat.label}
          </span>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#111", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {article.title}
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#9ca3af", marginTop: 3 }}>
            <Clock size={9} /> {article.readingTime} min
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      style={{ display: "block", textDecoration: "none", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: "1px solid #f3f4f6" }}
    >
      {/* Image avec overlay catégorie */}
      <div style={{ position: "relative", width: "100%", height: 190, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#f3f4f6" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />

        {/* Badge catégorie */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: color, color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 20 }}>
            <CategoryIcon category={article.category} size={11} />
            {cat.label}
          </span>
          {article.featured && (
            <span style={{ background: "#f97316", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
              UNE
            </span>
          )}
        </div>

        {/* Auteur en bas image */}
        <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>{article.author.name.charAt(0)}</span>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{article.author.name}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 8 }}>
          {article.title}
        </h3>
        <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 12 }}>
          {article.excerpt}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #f9fafb" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9ca3af" }}>
            <Clock size={11} /> {article.readingTime} min · {formatDate(article.publishedAt)}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ I: Eye, v: views }, { I: Heart, v: likes }, { I: MessageCircle, v: comments }].map(({ I, v }) => (
              <span key={v} style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, color: "#9ca3af" }}>
                <I size={11} /> {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
