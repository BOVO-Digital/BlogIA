"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "flex", gap: 8, width: "100%", maxWidth: 420 }}
    >
      <input
        type="email"
        placeholder="Votre email…"
        style={{
          flex: 1,
          padding: "10px 16px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          fontSize: 13,
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: 12,
          background: "#f97316",
          border: "none",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        S'inscrire
      </button>
    </form>
  );
}
