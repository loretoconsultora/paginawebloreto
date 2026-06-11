import Link from "next/link";
import { Mic, ArrowRight, ExternalLink } from "lucide-react";

export default function Podcast() {
  return (
    <section className="py-20 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Info */}
            <div className="p-10 sm:p-14">
              <div className="inline-flex items-center gap-2 bg-[#1DB954]/10 text-[#1DB954] text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Mic size={12} />
                Disponible en Spotify
              </div>
              <h2 className="font-playfair text-4xl font-bold text-grafito mb-4">
                El Podcast de Loreto
              </h2>
              <p className="font-dancing text-xl text-coral mb-6">
                Conversaciones que transforman marcas
              </p>
              <p className="text-grafito/60 leading-relaxed mb-8">
                Entrevistas con emprendedores, directivos y líderes de marca que comparten su camino, sus estrategias y las decisiones que los llevaron a donde están hoy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1DB954] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1aa34a] transition-colors"
                >
                  Escuchar en Spotify <ExternalLink size={14} />
                </Link>
                <Link
                  href="/podcast"
                  className="inline-flex items-center justify-center gap-2 glass text-grafito font-semibold px-7 py-3.5 rounded-full hover:shadow-glass-hover transition-all"
                >
                  Ver episodios <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="gradient-hero flex items-center justify-center p-14 min-h-64">
              <div className="text-center text-white">
                <div className="w-24 h-24 rounded-full glass-dark flex items-center justify-center mx-auto mb-6">
                  <Mic size={40} className="text-white" />
                </div>
                <p className="font-playfair text-2xl font-bold mb-2">Episodio 1</p>
                <p className="text-white/70 text-sm">Ya disponible en Spotify</p>
                <div className="mt-6 flex items-center justify-center gap-1">
                  {[4, 6, 8, 5, 7, 4, 9, 6, 5, 8, 4, 7].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/60 rounded-full animate-pulse"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
