"use client";

/**
 * Trust strip — marquee horizontal infinito.
 *
 * Pedido Gabriel (29/04): "girando como se fosse dobras laterais,
 * mostrando 2-3 itens ao mesmo tempo". Implementação CSS keyframes:
 *
 * - Lista duplicada (ITEMS × 2) numa flex row larga
 * - @keyframes marquee: translateX 0 → -50% (50% = um ciclo completo,
 *   loop perfeito sem visual jump)
 * - 28s linear infinite — leitura confortável, não tonteia
 * - hover/focus → animation-play-state: paused (puro CSS, robusto)
 * - prefers-reduced-motion → animation: none (a11y)
 * - Fade gradient nas bordas suaviza entrada/saída
 *
 * Conteúdo: 4 promessas alternando label bold + desc cinza.
 */

const ITEMS = [
  { label: "100% GRATUITO", desc: "Curso focado em pontos não óbvios" },
  { label: "5 DIAS", desc: "Curta duração, alta carga de conhecimento" },
  { label: "CADASTRO RÁPIDO", desc: "Só email e WhatsApp, sem dados sensíveis" },
  { label: "CURSO VIA EMAIL", desc: "1 aula chega na sua caixa todo dia" },
] as const;

export function TrustStrip() {
  // Duplica items pra criar loop contínuo. Track @ -50% = segundo
  // set ocupa exatamente o lugar do primeiro = sem visual jump.
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative z-10 border-t border-[#1f1f1f] overflow-hidden"
      style={{ background: "rgba(14,14,14,0.9)" }}
      aria-label="Promessas do curso"
    >
      {/* Keyframes inline pro marquee + media query reduced motion.
          Mantém componente self-contained sem precisar editar globals.css. */}
      <style>{`
        @keyframes dsec-trust-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .dsec-trust-track {
          animation: dsec-trust-marquee 28s linear infinite;
        }
        .dsec-trust-track:hover,
        .dsec-trust-track:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .dsec-trust-track { animation: none; }
        }
      `}</style>

      {/* Fade gradient nas bordas — suaviza entrada/saída dos itens. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-16 md:w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(14,14,14,1), rgba(14,14,14,0))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-16 md:w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(14,14,14,1), rgba(14,14,14,0))",
        }}
      />

      <div className="py-[18px]">
        <div
          className="dsec-trust-track flex items-center whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {doubled.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-3 shrink-0 px-7"
            >
              <span
                className="font-bold text-white tracking-[0.04em] uppercase"
                style={{ fontSize: 14 }}
              >
                {item.label}
              </span>
              <span aria-hidden style={{ color: "#3a3a3a" }}>
                ·
              </span>
              <span style={{ color: "#888", fontSize: 13 }}>
                {item.desc}
              </span>
              {/* Separador dourado entre items — accent DSEC. */}
              <span
                aria-hidden
                className="ml-4"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#c8913a",
                  opacity: 0.55,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
