"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { RDForm } from "@/components/rd-form";
import { TrustStrip } from "@/components/trust-strip";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const DAYS = [
  { num: "01", title: "Por que privacidade financeira importa", desc: "Vigilância financeira, CBDCs e por que ninguém deveria saber exatamente quanto você tem em Bitcoin.", img: "/days/day1.jpg" },
  { num: "02", title: "O risco real das exchanges", desc: "Do Plano Collor à queda do padrão ouro — o padrão histórico de confisco que se repete em Mt. Gox, FTX e Celsius.", img: "/days/day2.jpg" },
  { num: "03", title: "Como comprar Bitcoin sem expor seus dados", desc: "O método P2P direto, sem selfie, sem documento, sem deixar rastro ligando sua identidade às suas moedas.", img: "/days/day3.jpg" },
  { num: "04", title: "Self-custody — configure sua cold wallet em 30 min", desc: "Passo a passo prático, air-gapped, backup em metal. Seu cofre pessoal saindo hoje.", img: "/days/day4.jpg" },
  { num: "05", title: "O fluxo completo — soberania Bitcoin em 5 passos", desc: "Compra privada → cold wallet → backup → verificação → uso real. O sistema fechado do começo ao fim.", img: "/days/day5.jpg" },
];

const FAQS = [
  { q: "Já comprei na Binance com KYC. Ainda faz sentido pra mim?", a: "Faz mais sentido ainda. Seus dados já existem num banco de dados. O curso ensina como a partir de agora suas próximas compras não criem mais registros — e como proteger o que você já tem." },
  { q: "É gratuito mesmo? Qual a pegadinha?", a: "Nenhuma. A DSEC Labs fabrica hardware de segurança Bitcoin. Quanto mais gente entender self-custody, mais gente precisa de cofres bons. A educação é o marketing." },
  { q: "Vou precisar comprar algum equipamento?", a: "Não. O curso ensina conceitos que funcionam com qualquer hardware wallet. Se depois quiser conhecer o ColdKit, vai ser uma escolha sua — não uma obrigação." },
  { q: "Tenho medo de perder acesso ao meu Bitcoin com self-custody.", a: "Esse medo é normal e saudável. O dia 4 do curso é dedicado inteiramente a isso: como fazer backup à prova de incêndio, enchente e esquecimento." },
  { q: "Como sei que meu e-mail não vai ser vendido?", a: "Somos uma empresa de segurança Bitcoin. Se vazássemos dados de clientes, não teríamos empresa. Privacidade é o nosso produto." },
];

/* ═══════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#222]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-7 text-left group cursor-pointer">
        <span className="text-[15px] font-semibold text-white pr-8">{q}</span>
        <span className={`text-[#555] text-lg shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-6" : "max-h-0"}`}>
        <p className="text-[14px] text-[#888] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#0e0e0e", color: "#e8e8e8" }}>
      {/* ──────────── NAV ──────────── */}
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 border-b border-[#1f1f1f]"
        style={{ background: "rgba(14,14,14,0.85)", backdropFilter: "blur(20px)" }}
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-[1120px] mx-auto px-8 h-[56px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/assets/dsec-logo.png"
              alt="DSEC Labs"
              width={140}
              height={28}
              className="h-[22px] w-auto"
              priority
              unoptimized
            />
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-7 text-[13px] text-[#888]">
            {[
              { label: "Youtube", href: "#" },
              { label: "Alfredp2p", href: "#" },
              { label: "X", href: "https://x.com/AlfredSpaceHQ" },
              { label: "Tiktok", href: "#" },
              { label: "Telegram", href: "#" },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#start"
            className="text-[12px] font-semibold text-white px-5 py-[9px] rounded-[10px] transition-all hover:brightness-125"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
          >
            Quero o Curso
          </a>
        </div>
      </motion.nav>

      {/* ──────────── HERO ──────────── */}
      <section className="relative pt-[56px] overflow-hidden" id="start" style={{ background: "#0e0e0e" }}>
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-center"
            style={{ opacity: 0.22, mixBlendMode: "screen" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 110% 80% at 50% 55%, rgba(14,14,14,0) 0%, rgba(14,14,14,0.45) 65%, rgba(14,14,14,0.92) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[120px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(14,14,14,0) 0%, rgba(14,14,14,1) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1120px] mx-auto px-8 pt-[80px] pb-[60px] md:pt-[120px] md:pb-[80px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">

            {/* Left: Copy — stagger entrance: headline > sub > destaque. */}
            <motion.div
              className="max-w-[480px] shrink-0"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
              }}
            >
              <h1 className="text-[28px] md:text-[38px] lg:text-[44px] leading-[1.15] mb-5">
                <motion.span
                  className="text-[#c8913a] font-bold block"
                  style={{ fontStyle: "italic" }}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                  }}
                >
                  Comprar Bitcoin é fácil...
                </motion.span>
                <motion.span
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                  }}
                >
                  <span className="text-white font-bold">Difícil</span>{" "}
                  <span className="text-white font-light">é fazer com</span>
                  <br />
                  <span className="text-white font-light">privacidade e controle</span>
                </motion.span>
              </h1>
              <motion.p
                className="text-[14px] text-[#888] leading-[1.7] max-w-[400px]"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <span className="text-[#c8913a] font-semibold">Apenas 5 dias,</span>{" "}
                você sai do zero e aprende a comprar, guardar e usar Bitcoin com autonomia total.
              </motion.p>
            </motion.div>

            {/* Right: Form card + Alfred — entra do lado direito após o
                copy, com Alfred fading in atrás. */}
            <motion.div
              className="relative w-full max-w-[380px]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            >
              {/* Alfred — float-in com bounce sutil. */}
              <motion.div
                className="absolute -left-[120px] bottom-[-20px] w-[200px] z-0 pointer-events-none hidden md:block"
                initial={{ opacity: 0, x: -40, rotate: -6 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
              >
                <Image
                  src="/assets/alfred.png"
                  alt="Alfred"
                  width={200}
                  height={260}
                  className="drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
                  unoptimized
                />
              </motion.div>

              {/* Form card */}
              <div className="relative z-10 rounded-[20px] overflow-hidden" style={{ background: "#161616", border: "1px solid #222" }}>
                <div className="absolute inset-0 overflow-hidden rounded-[20px]">
                  <Image src="/assets/form-bg.png" alt="" fill className="object-cover opacity-25" />
                </div>
                <div className="relative z-10 px-7 py-8">
                  <RDForm />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust strip — carrossel rotativo em mobile + 3 itens com
            stagger entrance em desktop. Sem itálico (alinhado com Figma). */}
        <TrustStrip />
      </section>

      {/* ──────────── O QUE VOCÊ VAI RECEBER ──────────── */}
      <section className="py-[80px] md:py-[100px]" style={{ background: "#111" }}>
        <div className="max-w-[1120px] mx-auto px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-[48px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div>
              <p className="text-[10px] font-mono text-[#777] tracking-[0.3em] uppercase mb-5">O QUE VOCÊ VAI RECEBER</p>
              <h2 className="text-[24px] md:text-[32px] font-bold leading-[1.25]">
                5 dias.<br />5 aulas que mudam como<br />você protege seu dinheiro.
              </h2>
            </div>
            <a href="#start" className="inline-flex items-center gap-2 px-6 py-3 border border-[#c8913a] text-[#c8913a] rounded-full text-[13px] font-semibold hover:bg-[#c8913a] hover:text-black transition-all shrink-0 self-start md:self-auto">
              Quero o primeiro dia
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-[12px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {DAYS.map(day => (
              <motion.div
                key={day.num}
                className="rounded-[12px] overflow-hidden group"
                style={{ background: "#1a1a1a" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <div className="relative aspect-[1/1] overflow-hidden">
                  <Image src={day.img} alt={`Dia ${day.num}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <span className="absolute top-[10px] left-[10px] text-[8px] font-mono tracking-[0.15em] uppercase text-[#c8913a] bg-black/70 px-[8px] py-[3px] rounded-full" style={{ border: "1px solid rgba(200,145,58,0.3)" }}>
                    DIA {day.num}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                </div>
                <div className="px-[14px] py-[14px]">
                  <h3 className="text-[12px] font-bold leading-[1.4] text-white mb-[6px]">{day.title}</h3>
                  <p className="text-[10px] text-[#777] leading-[1.5]">{day.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────── POR QUE SE IMPORTAR ──────────── */}
      <section className="py-[80px] md:py-[100px]" style={{ background: "#0e0e0e" }}>
        <div className="max-w-[1120px] mx-auto px-8">
          <motion.p
            className="text-center text-[10px] font-mono text-[#777] tracking-[0.3em] uppercase mb-[48px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            POR QUE VOCÊ DEVERIA SE IMPORTAR AGORA
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-[16px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div
              className="rounded-[16px] p-[28px] md:p-[32px]"
              style={{ background: "linear-gradient(160deg, #705020 0%, #3a2a10 50%, #2a1e0c 100%)", border: "1px solid rgba(200,145,58,0.2)" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
            >
              <p className="text-[52px] md:text-[60px] font-bold leading-none text-white" style={{ fontFamily: "var(--font-geist-sans)" }}>
                270<span className="text-[24px] font-bold">mil</span>
              </p>
              <p className="text-[13px] font-bold text-white mt-[4px] mb-[16px]">Clientes com dados vazados</p>
              <p className="text-[12px] text-white/60 leading-[1.6] mb-[16px]">
                Uma fabricante de hardware wallets expôs nome, endereço e patrimônio de 270 mil usuários, abrindo espaço para phishing direcionado e invasões físicas.
              </p>
              <p className="text-[12px] text-[#c8913a] font-semibold leading-[1.6]">
                No curso, <span className="underline decoration-[#c8913a]">você aprende a operar sem vincular sua identidade às transações.</span>
              </p>
            </motion.div>

            <motion.div
              className="rounded-[16px] p-[28px] md:p-[32px]"
              style={{ background: "#1a1a1a", border: "1px solid #222" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
            >
              <p className="text-[52px] md:text-[60px] font-bold leading-none text-white">$8B</p>
              <p className="text-[13px] font-bold text-white mt-[4px] mb-[16px]">Sumiram da FTX em 72 horas</p>
              <p className="text-[12px] text-[#888] leading-[1.6] mb-[12px]">
                Dinheiro desaparecer enquanto clientes viam saldos &quot;normais&quot; na plataforma.
              </p>
              <p className="text-[12px] text-[#888] leading-[1.6]">
                No curso, você aprende a manter controle direto dos seus ativos, sem depender de terceiros.
              </p>
            </motion.div>

            <motion.div
              className="rounded-[16px] p-[28px] md:p-[32px]"
              style={{ background: "#1a1a1a", border: "1px solid #222" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
            >
              <p className="text-[52px] md:text-[60px] font-bold leading-none text-white">72</p>
              <p className="text-[13px] font-bold text-white mt-[4px] mb-[16px]">Ataques físicos apenas em 2026</p>
              <p className="text-[12px] text-[#888] leading-[1.6] mb-[12px]">
                Casos de extorsão e sequestro ligados a cripto cresceram.
              </p>
              <p className="text-[12px] text-[#888] leading-[1.6]">
                No curso, você aprende práticas de privacidade que reduzem sua exposição, inclusive fora do ambiente digital!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────────── FAQ ──────────── */}
      <section className="py-[80px] md:py-[100px]" style={{ background: "#0e0e0e" }}>
        <div className="max-w-[560px] mx-auto px-8">
          <p className="text-[10px] font-mono text-[#c8913a] tracking-[0.3em] uppercase mb-[10px]">PERGUNTAS FREQUENTES</p>
          <h2 className="text-[24px] md:text-[28px] font-bold mb-[40px]">Antes de decidir</h2>
          <div>
            {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="border-t border-[#1f1f1f] py-[28px]" style={{ background: "#0e0e0e" }}>
        <div className="max-w-[1120px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src="/assets/dsec-logo.png"
            alt="DSEC Labs"
            width={110}
            height={22}
            className="h-[18px] w-auto opacity-80"
            unoptimized
          />
          <div className="flex gap-6 text-[12px] text-[#666]">
            {[
              { label: "Youtube", href: "#" },
              { label: "Alfredp2p", href: "#" },
              { label: "Discord", href: "#" },
              { label: "Telegram", href: "#" },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[#555]">© 2026 DSEC Labs. No Trust. Do It Yourself.</p>
        </div>
      </footer>
    </main>
  );
}
