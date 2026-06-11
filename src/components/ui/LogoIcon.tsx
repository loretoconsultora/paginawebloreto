export default function LogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  const u = size / 100;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arriba izquierda — teal pequeño */}
      <rect x="4" y="4" width="38" height="38" rx="8" fill="#2DD4BF" />

      {/* Arriba derecha — rosa grande */}
      <rect x="52" y="4" width="44" height="44" rx="10" fill="#F393AE" />

      {/* Abajo izquierda — amarillo en L */}
      {/* Forma L: bloque grande con esquina interior cortada */}
      <path
        d="M4 54 Q4 46 12 46 H54 Q62 46 62 54 V62 H44 Q36 62 36 70 V92 Q36 100 28 100 H12 Q4 100 4 92 Z"
        fill="#FCCD0D"
      />

      {/* Abajo derecha — teal rectangular */}
      <rect x="66" y="62" width="30" height="34" rx="8" fill="#2DD4BF" />
    </svg>
  );
}
