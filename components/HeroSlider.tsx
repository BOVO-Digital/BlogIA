"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { Article } from "@/lib/types";
import { getCategoryMeta, formatDate } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";

interface Props {
  articles: Article[];
}

export default function HeroSlider({ articles }: Props) {
  const [current, setCurrent] = useState(0);
  const article = articles[current];
  if (!article) return null;

  const cat = getCategoryMeta(article.category);
  const img = article.coverImage || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80";

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid #e5e7eb", background: "#fff" }}>
      {/* Image pleine largeur */}
      <div
        style={{
          width: "100%",
          height: 340,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay dégradé bas */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)" }} />

        {/* Badge catégorie */}
        <div style={{ position: "absolute", top: 16, left: 16 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#7c3aed", color: "#fff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: 30,
          }}>
            <CategoryIcon category={article.category} size={12} />
            {cat.label}
          </span>
          {article.featured && (
            <span style={{
              marginLeft: 6,
              display: "inline-flex", alignItems: "center",
              background: "#f97316", color: "#fff",
              fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 30,
            }}>
              À LA UNE
            </span>
          )}
        </div>

        {/* Contenu bas de l'image */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 20px" }}>
          <Link href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 8, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
              {article.title}
            </h2>
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 14 }}>
            {article.excerpt}
          </p>

          {/* Author + controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={13} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{article.author.name}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 3 }}>
                  <Clock size={9} />
                  {formatDate(article.publishedAt)} · {article.readingTime} min
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => setCurrent((c) => (c - 1 + articles.length) % articles.length)}
                aria-label="Précédent"
                style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", backdropFilter: "blur(4px)" }}
              >
                <ChevronLeft size={15} />
              </button>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                {current + 1}<span style={{ color: "rgba(255,255,255,0.5)" }}>/{articles.length}</span>
              </span>
              <button
                onClick={() => setCurrent((c) => (c + 1) % articles.length)}
                aria-label="Suivant"
                style={{ width: 32, height: 32, borderRadius: "50%", background: "#f97316", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dots nav bas */}
      <div style={{ display: "flex", gap: 5, justifyContent: "center", padding: "12px 0 10px" }}>
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Article ${i + 1}`}
            style={{
              height: 6,
              width: i === current ? 22 : 6,
              borderRadius: 3,
              background: i === current ? "#7c3aed" : "#e5e7eb",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all .25s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
