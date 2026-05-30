"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Rss, Menu, X } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import CategoryIcon from "@/components/CategoryIcon";
import { XIcon, LinkedInIcon } from "@/components/SocialIcons";

export default function Navbar() {
  const pathname = usePathname();
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 8px 0 rgba(0,0,0,0.06)" }}
    >
      {/* Top accent stripe */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #f97316 100%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 56, gap: 32 }}>

          {/* ── LEFT NAV ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link
              href="/"
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: isActive("/") ? "#7c3aed" : "#374151",
                textDecoration: "none",
                background: isActive("/") ? "#ede9fe" : "transparent",
                transition: "all .15s",
              }}
            >
              Home
            </Link>

            {/* Categories dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                Catégories
                <ChevronDown
                  size={14}
                  style={{ transform: catOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}
                />
              </button>

              {catOpen && (
                <>
                  <div
                    onClick={() => setCatOpen(false)}
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      zIndex: 50,
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 16,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      minWidth: 240,
                      overflow: "hidden",
                      padding: "6px 0",
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categorie/${cat.slug}`}
                        onClick={() => setCatOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 16px",
                          textDecoration: "none",
                          color: "#374151",
                          fontSize: 14,
                          transition: "all .15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "#ede9fe";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#7c3aed";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: "#f3f0ff",
                            color: "#7c3aed",
                            flexShrink: 0,
                          }}
                        >
                          <CategoryIcon category={cat.slug} size={15} />
                        </span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.label}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{cat.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              href="/blog"
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: isActive("/blog") ? "#7c3aed" : "#374151",
                textDecoration: "none",
                background: isActive("/blog") ? "#ede9fe" : "transparent",
                transition: "all .15s",
              }}
            >
              Articles
            </Link>
          </nav>

          {/* ── CENTER LOGO ── */}
          <Link
            href="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 14,
                boxShadow: "0 2px 8px rgba(124,58,237,0.3)",
              }}
            >
              B
            </div>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#111", letterSpacing: "-0.5px" }}>
              BlogIA<span style={{ color: "#7c3aed" }}>.</span>
            </span>
          </Link>

          {/* ── RIGHT — SOCIAL + MOBILE ── */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {[
              { label: "X (Twitter)", Icon: XIcon },
              { label: "LinkedIn", Icon: LinkedInIcon },
              { label: "RSS", Icon: Rss },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#f3f4f6",
                  color: "#6b7280",
                  transition: "all .15s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#ede9fe";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#7c3aed";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#f3f4f6";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#6b7280";
                }}
              >
                <Icon style={{ width: 15, height: 15 }} />
              </a>
            ))}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#f3f4f6",
                border: "none",
                cursor: "pointer",
                color: "#374151",
              }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #e5e7eb",
            padding: "12px 24px 16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[{ label: "Home", href: "/" }, { label: "Articles", href: "/blog" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive(item.href) ? "#7c3aed" : "#374151",
                  background: isActive(item.href) ? "#ede9fe" : "transparent",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ height: 1, background: "#e5e7eb", margin: "8px 0" }} />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#374151",
                  textDecoration: "none",
                }}
              >
                <CategoryIcon category={cat.slug} size={15} style={{ color: "#7c3aed" }} />
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
