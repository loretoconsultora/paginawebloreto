export default function CalendarioPage() {
  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Calendario</h1>
      <p className="text-grafito/50 text-sm mb-8">Próximas fechas y entregables de tu servicio</p>

      <div className="bg-white rounded-2xl p-6 border border-grafito/10">
        <p className="text-sm text-grafito/50">Todavía no hay eventos cargados.</p>
      </div>
    </div>
  );
}
