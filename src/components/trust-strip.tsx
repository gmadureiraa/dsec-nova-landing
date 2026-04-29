"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Trust strip — carrossel rotativo de 4 promessas.
 *
 * Ajustado 29/04: rotação em TODAS as breakpoints (antes era só
 * mobile). Sempre mostra 1 item de cada vez, troca a cada 4s,
 * com transição vertical suave (y: 16 → 0 → -16) + fade.
 *
 * Conteúdo (Figma + pedido Gabriel):
 *   1. 100% GRATUITO — Curso focado em pontos não óbvios
 *   2. 5 DIAS — Curta duração, alta carga de conhecimento
 *   3. CADASTRO RÁPIDO — Só email e WhatsApp, sem dados sensíveis
 *   4. CURSO VIA EMAIL — 1 aula chega na sua caixa todo dia
 *
 * Sem itálico (alinhado com Figma). Tipografia: Space Grotesk Bold
 * pro label, Space Grotesk Regular cinza-meio pra descrição.
 */

const ITEMS = [
  {
    label: "100% GRATUITO",
    desc: "Curso focado em pontos não óbvios",
  },
  {
    label: "5 DIAS",
    desc: "Curta duração, alta carga de conhecimento",
  },
  {
    label: "CADASTRO RÁPIDO",
    desc: "Só email e WhatsApp, sem dados sensíveis",
  },
  {
    label: "CURSO VIA EMAIL",
    desc: "1 aula chega na sua caixa todo dia",
  },
] as const;

const ROTATE_INTERVAL_MS = 4000;

export function TrustStrip() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % ITEMS.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  const item = ITEMS[idx];

  return (
    <div
      className="relative z-10 border-t border-[#1f1f1f]"
      style={{ background: "rgba(14,14,14,0.9)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1120px] mx-auto px-8 py-[18px]">
        <div className="relative h-[44px] overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.label}
              className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-center md:text-left"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span
                className="font-bold text-white tracking-[0.04em] uppercase"
                style={{ fontSize: 14 }}
              >
                {item.label}
              </span>
              <span className="hidden md:inline text-[#3a3a3a]" aria-hidden>
                ·
              </span>
              <span className="text-[#888]" style={{ fontSize: 13 }}>
                {item.desc}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Dots indicator — abaixo da strip, alinhado com a accent
            dourada do design DSEC. */}
        <div className="flex justify-center gap-1.5 mt-2.5">
          {ITEMS.map((it, i) => {
            const isActive = i === idx;
            return (
              <button
                key={it.label}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Mostrar promessa ${i + 1}: ${it.label}`}
                aria-current={isActive ? "true" : undefined}
                className="rounded-full transition-all duration-300 cursor-pointer hover:opacity-90"
                style={{
                  width: isActive ? 18 : 5,
                  height: 4,
                  background: isActive ? "#c8913a" : "#2f2f2f",
                  border: "none",
                  padding: 0,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
