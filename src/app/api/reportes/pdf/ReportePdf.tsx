import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

export type ResumenPdfRow = {
  conjunto_anuncios: string;
  campana: string | null;
  estado: string | null;
  resultados: number;
  unidad_resultados: string | null;
  costo_por_resultado: number | null;
  inversion_total: number | null;
  ctr: number | null;
  cpm: number | null;
  meta_resultados: number | null;
  meta_costo_por_resultado: number | null;
  semaforo_resultados: string | null;
  semaforo_costo: string | null;
  periodo: string;
};

const ROSA = "#c0005a";
const GRAFITO = "#3A3F4B";

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: GRAFITO, fontFamily: "Helvetica" },
  header: { borderBottom: `2pt solid ${ROSA}`, paddingBottom: 14, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  headerText: { flexGrow: 1 },
  logos: { flexDirection: "row", alignItems: "center", gap: 14 },
  logo: { height: 28, objectFit: "contain" },
  brand: { fontSize: 11, fontWeight: 700, color: ROSA, letterSpacing: 1 },
  title: { fontSize: 20, fontWeight: 700, marginTop: 4 },
  subtitle: { fontSize: 10, color: "#3A3F4B99", marginTop: 2 },
  card: { border: "1pt solid #3A3F4B22", borderRadius: 8, padding: 12, marginBottom: 12 },
  cardTitle: { fontSize: 11, fontWeight: 700, marginBottom: 2 },
  cardSubtitle: { fontSize: 8, color: "#3A3F4B99", marginBottom: 8, textTransform: "uppercase" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  label: { color: "#3A3F4B99" },
  value: { fontWeight: 700 },
  bigValue: { fontSize: 18, fontWeight: 700, color: ROSA },
  badgeRow: { flexDirection: "row", gap: 6, marginTop: 6 },
  badge: { fontSize: 7, fontWeight: 700, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10, textTransform: "uppercase" },
  footer: { position: "absolute", bottom: 24, left: 36, right: 36, fontSize: 8, color: "#3A3F4B66", textAlign: "center" },
});

function formatPeriodo(periodo: string, tipo: "semanal" | "mensual") {
  const d = new Date(periodo + "T00:00:00");
  if (tipo === "mensual") {
    return d.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  }
  const fin = new Date(d);
  fin.setDate(d.getDate() + 6);
  return `${d.toLocaleDateString("es-MX", { day: "numeric", month: "short" })} – ${fin.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}`;
}

const num = (n: number | null) => new Intl.NumberFormat("es-MX").format(n ?? 0);
const money = (n: number | null) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n ?? 0);

function semaforoStyle(valor: string | null) {
  return valor === "Cumple"
    ? { color: "#16a34a", backgroundColor: "#16a34a1A" }
    : { color: "#d97706", backgroundColor: "#d977061A" };
}

export default function ReportePdf({
  cliente,
  tipo,
  filas,
  loretoLogo,
  clienteLogo,
}: {
  cliente: string;
  tipo: "semanal" | "mensual";
  filas: ResumenPdfRow[];
  loretoLogo?: string | null;
  clienteLogo?: string | null;
}) {
  const periodo = filas[0]?.periodo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.brand}>LORETO CONSULTORA</Text>
            <Text style={styles.title}>Reporte {tipo === "semanal" ? "semanal" : "mensual"} — {cliente}</Text>
            <Text style={styles.subtitle}>
              Periodo: {periodo ? formatPeriodo(periodo, tipo) : "Sin datos disponibles"}
            </Text>
          </View>
          <View style={styles.logos}>
            {clienteLogo && <Image src={clienteLogo} style={styles.logo} />}
            {loretoLogo && <Image src={loretoLogo} style={styles.logo} />}
          </View>
        </View>

        {filas.length === 0 ? (
          <Text>Todavía no hay datos disponibles para este periodo.</Text>
        ) : (
          filas.map((f) => (
            <View key={f.conjunto_anuncios} style={styles.card}>
              <Text style={styles.cardTitle}>{f.campana || f.conjunto_anuncios}</Text>
              <Text style={styles.cardSubtitle}>{f.conjunto_anuncios}</Text>

              <View style={styles.row}>
                <Text style={styles.bigValue}>{num(f.resultados)}</Text>
                <Text style={styles.label}>meta: {num(f.meta_resultados)} ({f.unidad_resultados})</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Costo por resultado</Text>
                <Text style={styles.value}>{money(f.costo_por_resultado)} (meta {money(f.meta_costo_por_resultado)})</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Inversión total</Text>
                <Text style={styles.value}>{money(f.inversion_total)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>CTR promedio</Text>
                <Text style={styles.value}>{(f.ctr ?? 0).toFixed(2)}%</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>CPM promedio</Text>
                <Text style={styles.value}>{money(f.cpm)}</Text>
              </View>

              <View style={styles.badgeRow}>
                <Text style={[styles.badge, semaforoStyle(f.semaforo_resultados)]}>
                  Resultados: {f.semaforo_resultados}
                </Text>
                <Text style={[styles.badge, semaforoStyle(f.semaforo_costo)]}>
                  Costo: {f.semaforo_costo}
                </Text>
              </View>
            </View>
          ))
        )}

        <Text style={styles.footer}>
          Loreto Consultora · Reporte generado automáticamente desde el Portal del Cliente
        </Text>
      </Page>
    </Document>
  );
}
