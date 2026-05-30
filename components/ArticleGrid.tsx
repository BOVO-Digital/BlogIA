"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Article, CATEGORIES } from "@/lib/types";
import CategoryIcon from "@/components/CategoryIcon";
import ArticleCard from "./ArticleCard";

interface Props {
  articles: Article[];
}

const CAT_COLORS: Record<string, string> = {
  "intelligence-artificielle": "#7c3aed",
  "developpement": "#2563eb",
  "cybersecurite": "#dc2626",
  "tech-innovation": "#ea580c",
  "outils-productivite": "#16a34a",
};

export default function ArticleGrid({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCat = activeCategory === "all" || a.category === activeCategory;
    const matchesSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setActiveCategory("all")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "7px 16px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
            background: activeCategory === "all" ? "#111" : "#f3f4f6",
            color: activeCategory === "all" ? "#fff" : "#374151",
            transition: "all .15s",
          }}
        >
          Tous
        </button>

        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.slug;
          const color = CAT_COLORS[cat.slug];
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 16px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
                background: active ? color : "#f3f4f6",
                color: active ? "#fff" : "#374151",
                transition: "all .15s",
              }}
            >
              <CategoryIcon category={cat.slug} size={13} />
              {cat.label}
            </button>
          );
        })}

        {/* Search */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, border: "1.5px solid #e5e7eb", borderRadius: 30, padding: "7px 16px", background: "#fff" }}>
          <Search size={13} style={{ color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: 13, outline: "none", width: 130, color: "#111", background: "transparent", border: "none" }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
          <Search size={32} style={{ margin: "0 auto 12px", opacity: 0.35 }} />
          <p style={{ fontSize: 14 }}>Aucun article trouvé</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
