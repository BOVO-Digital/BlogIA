import Link from "next/link";
import { Rss } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import CategoryIcon from "@/components/CategoryIcon";
import { XIcon, LinkedInIcon } from "@/components/SocialIcons";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer style={{ marginTop: 64 }}>
      {/* Newsletter */}
      <div style={{ background: "#111827", padding: "56px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
              Subscribe to our{" "}
              <span style={{ color: "#a78bfa", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#f97316" }}>
                newsletter.
              </span>
            </h3>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              Les meilleurs articles tech & IA directement dans votre boîte mail.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom */}
      <div style={{ background: "#030712", padding: "24px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <Link href="/" style={{ fontWeight: 900, fontSize: 18, color: "#fff", textDecoration: "none", letterSpacing: "-0.3px" }}>
              BlogIA<span style={{ color: "#a78bfa" }}>.</span>
            </Link>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", alignItems: "center" }}>
              <Link href="/" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}>Accueil</Link>
              <Link href="/blog" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}>Articles</Link>
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/categorie/${cat.slug}`} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280", textDecoration: "none" }}>
                  <CategoryIcon category={cat.slug} size={11} />
                  {cat.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "X", Icon: XIcon },
                { label: "LinkedIn", Icon: LinkedInIcon },
                { label: "RSS", Icon: Rss },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", color: "#6b7280", textDecoration: "none" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 20, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 11, color: "#4b5563" }}>© {new Date().getFullYear()} BlogIA. Tous droits réservés.</p>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="#" style={{ fontSize: 11, color: "#4b5563", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: 11, color: "#4b5563", textDecoration: "none" }}>Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
