"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Trust strip — carrossel de 3 mensagens auto-rotativas.
 *
 * Posição: barra horizontal logo abaixo do form na hero.
 * Conteúdo (Figma): rotação a cada 4s entre as 3 promessas. Em mobile
 * fica empilhado num único item rotativo (não 3 lado-a-lado).
 *
 * Tipografia alinhada com Figma: sans bold + caps + tracking-wide pro
 * label, sans regular cinza-meio pra descrição. Sem itálico (regressão
 * do código antigo que tinha italic no GRATUITO/CADASTRO).
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
] as const;

const ROTATE_INTERVAL_MS = 4000;

export function TrustStrip() {
  return (
    <div
      className="relative z-10 border-t border-[#1f1f1f]"
      style={{ background: "rgba(14,14,14,0.9)" }}
    >
      <div className="max-w-[1120px] mx-auto px-8 py-[18px]">
        {/* Desktop ≥md: 3 itens lado a lado, sem rotação. */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-y-3 text-[14px]">
          {ITEMS.map((item, idx) => (
            <motion.div
              key={item.label}
              className="flex items-baseline gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
            >
              <span
                className="font-bold text-white tracking-[0.04em] uppercase"
                style={{ fontSize: 14 }}
              >
                {item.label}
              </span>
              <span className="text-[#666]" style={{ fontSize: 13 }}>
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
        {/* Mobile <md: carrossel single-item rotativo. */}
        <div className="md:hidden">
          <RotatingItem />
        </div>
      </div>
    </div>
  );
}

function RotatingItem() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % ITEMS.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, []);
  const item = ITEMS[idx];
  return (
    <div className="relative h-[42px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.label}
          className="absolute inset-0 flex flex-col items-center justify-center text-center gap-0.5"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <span
            className="font-bold text-white tracking-[0.04em] uppercase"
            style={{ fontSize: 14 }}
          >
            {item.label}
          </span>
          <span className="text-[#777]" style={{ fontSize: 12 }}>
            {item.desc}
          </span>
        </motion.div>
      </AnimatePresence>
      {/* Dots indicator */}
      <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 flex gap-1">
        {ITEMS.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 12 : 4,
              height: 3,
              background: i === idx ? "#c8913a" : "#3a3a3a",
            }}
          />
        ))}
      </div>
    </div>
  );
}
