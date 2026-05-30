import Link from "next/link";
import { FileText } from "lucide-react";
import { getFeaturedArticles, getAllArticles } from "@/lib/articles";
import { CATEGORIES } from "@/lib/types";
import HeroSlider from "@/components/HeroSlider";
import ArticleGrid from "@/components/ArticleGrid";
import Sidebar from "@/components/Sidebar";
import CategoryIcon from "@/components/CategoryIcon";

export default function HomePage() {
  const featured = getFeaturedArticles(5);
  const all = getAllArticles();
  const mustRead = [...all.filter((a) => a.featured), ...all.filter((a) => !a.featured)].slice(0, 5);
  const latest = all.slice(0, 4);

  const CAT_COLORS: Record<string, string> = {
    "intelligence-artificielle": "#7c3aed",
    "developpement": "#2563eb",
    "cybersecurite": "#dc2626",
    "tech-innovation": "#ea580c",
    "outils-productivite": "#16a34a",
  };

  const CAT_BG: Record<string, string> = {
    "intelligence-artificielle": "#f3f0ff",
    "developpement": "#eff6ff",
    "cybersecurite": "#fef2f2",
    "tech-innovation": "#fff7ed",
    "outils-productivite": "#f0fdf4",
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

      {/* ── HERO PLEINE LARGEUR ── */}
      <div style={{ paddingTop: 24, paddingBottom: 32 }}>
        <p style={{ fontSize: 34, fontWeight: 900, color: "#7c3aed", fontStyle: "italic", marginBottom: 14, letterSpacing: "-1px" }}>
          Tech.
        </p>

        {featured.length > 0 ? (
          <HeroSlider articles={featured} />
        ) : (
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #f3f4f6", padding: 40, textAlign: "center", color: "#9ca3af" }}>
            <FileText size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
            <p style={{ fontSize: 14 }}>Ajoutez vos premiers articles dans <code style={{ color: "#7c3aed" }}>content/articles/</code></p>
          </div>
        )}
      </div>

      {/* ── CATÉGORIES RAPIDES ── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#fff",
                border: "1px solid #f3f4f6",
                borderRadius: 12,
                padding: "10px 12px",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: CAT_BG[cat.slug], color: CAT_COLORS[cat.slug], flexShrink: 0 }}>
                <CategoryIcon category={cat.slug} size={16} />
              </span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#111", lineHeight: 1.2 }}>{cat.label}</p>
                <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{cat.description.split(",")[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── GRILLE + SIDEBAR CÔTE À CÔTE ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start", marginBottom: 64 }}>

        {/* Colonne gauche — grille articles */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>Derniers articles</h2>
            <Link href="/blog" style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed", textDecoration: "none" }}>
              Voir tout →
            </Link>
          </div>
          <ArticleGrid articles={all} />
        </div>

        {/* Colonne droite — sidebar */}
        <div style={{ position: "sticky", top: 74 }}>
          <Sidebar mustRead={mustRead} latest={latest} />
        </div>

      </div>
    </div>
  );
}
