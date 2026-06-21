const KPIS = [
  { label: "Alcance mensual", value: "—" },
  { label: "Leads generados", value: "—" },
  { label: "Tasa de conversión", value: "—" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Panel general</h1>
      <p className="text-grafito/50 text-sm mb-8">Resumen de tus servicios activos</p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-6 border border-grafito/10">
            <p className="text-xs text-grafito/40 uppercase tracking-widest mb-2">{k.label}</p>
            <p className="font-playfair text-3xl font-bold" style={{ color: "#c0005a" }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-grafito/10">
        <h2 className="font-playfair text-lg font-bold text-grafito mb-4">Servicios activos</h2>
        <p className="text-sm text-grafito/50">
          Todavía no hay servicios cargados a tu cuenta. Esta sección mostrará el periodo y estatus de cada servicio en cuanto se conecten los datos.
        </p>
      </div>
    </div>
  );
}
