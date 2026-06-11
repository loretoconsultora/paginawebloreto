const ITEMS = [
  "Servicios de Marketing Digital",
  "Consultoría",
  "Formaciones",
  "Programas Académicos",
  "Tecnología",
];

const SEPARATOR = (
  <span aria-hidden style={{ margin: "0 2rem", opacity: 0.55, fontSize: "0.6em", verticalAlign: "middle" }}>✦</span>
);

export default function MarqueeBanner() {
  const track = (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} style={{ whiteSpace: "nowrap" }}>
          {item}
          {SEPARATOR}
        </span>
      ))}
    </>
  );

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)",
        overflow: "hidden",
        padding: "0",
        position: "relative",
      }}
    >
      {/* Top edge fade */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, #1a0a2e 0%, transparent 6%, transparent 94%, #E894FF 100%)",
        zIndex: 2 }} />

      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 28s linear infinite",
          padding: "14px 0",
        }}
      >
        {/* Duplicate 4× so the loop is seamless regardless of viewport width */}
        <span style={{
          display: "flex", alignItems: "center",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#ffffff",
          gap: 0,
        }}>
          {track}{track}{track}{track}
        </span>
      </div>
    </div>
  );
}
