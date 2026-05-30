import Link from "next/link";
import { Eye, Clock } from "lucide-react";
import { Article } from "@/lib/types";
import { getCategoryMeta } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";
import ArticleCard from "./ArticleCard";

interface Props {
  mustRead: Article[];
  latest: Article[];
}

const CAT_COLORS: Record<string, string> = {
  "intelligence-artificielle": "#7c3aed",
  "developpement": "#2563eb",
  "cybersecurite": "#dc2626",
  "tech-innovation": "#ea580c",
  "outils-productivite": "#16a34a",
};

const DEFAULT_IMGS: Record<string, string> = {
  "intelligence-artificielle": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=70",
  "developpement": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=70",
  "cybersecurite": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=70",
  "tech-innovation": "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=70",
  "outils-productivite": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=70",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  border: "1px solid #f3f4f6",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  padding: "18px",
};

export default function Sidebar({ mustRead, latest }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── MUST READ ── */}
      {mustRead.length > 0 && (
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>Must Read</h3>
            <Link href="/blog" style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", textDecoration: "none" }}>Voir tout →</Link>
          </div>

          {/* Article vedette */}
          {mustRead[0] && (() => {
            const img = mustRead[0].coverImage ?? DEFAULT_IMGS[mustRead[0].category] ?? "";
            const color = CAT_COLORS[mustRead[0].category] ?? "#7c3aed";
            return (
              <Link href={`/blog/${mustRead[0].slug}`} style={{ display: "block", textDecoration: "none", marginBottom: 14 }}>
                <div style={{ position: "relative", height: 140, borderRadius: 12, overflow: "hidden", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#f3f4f6", marginBottom: 10 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }} />
                  <span style={{ position: "absolute", top: 8, left: 8, display: "inline-flex", alignItems: "center", gap: 4, background: color, color: "#fff", fontSize: 9, fontWeight: 700, textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, letterSpacing: "0.06em" }}>
                    <CategoryIcon category={mustRead[0].category} size={9} />
                    {getCategoryMeta(mustRead[0].category).label}
                  </span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 4 }}>
                  {mustRead[0].title}
                </p>
                <p style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {mustRead[0].excerpt}
                </p>
              </Link>
            );
          })()}

          {/* Articles secondaires */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mustRead.slice(1, 4).map((article) => {
              const img = article.coverImage ?? DEFAULT_IMGS[article.category] ?? "";
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`} style={{ display: "flex", gap: 10, textDecoration: "none" }}>
                  <div style={{ width: 52, height: 44, borderRadius: 8, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#f3f4f6", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#111", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 2 }}>
                      {article.title}
                    </p>
                    <p style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#9ca3af" }}>
                      <Clock size={9} /> {article.readingTime} min
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── DERNIERS ARTICLES ── */}
      {latest.length > 0 && (
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>Derniers articles</h3>
            <Link href="/blog" style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", textDecoration: "none" }}>Voir tout →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {/* ── WEEKLY HIGHLIGHTS ── */}
      {latest.length > 0 && (
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>Weekly Highlights</h3>
            <Link href="/blog" style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", textDecoration: "none" }}>Voir tout →</Link>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 2 }}>
            {latest.map((article) => {
              const img = article.coverImage ?? DEFAULT_IMGS[article.category] ?? "";
              const vues = ((624 + article.slug.length * 97) % 3000) + 500;
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`} style={{ flexShrink: 0, width: 100, textDecoration: "none" }}>
                  <div style={{ width: 100, height: 70, borderRadius: 10, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#f3f4f6", marginBottom: 6 }} />
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#111", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {article.title}
                  </p>
                  <p style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#9ca3af", marginTop: 3 }}>
                    <Eye size={9} /> {vues}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
