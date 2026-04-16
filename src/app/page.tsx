"use client";

import { useState, useRef } from "react";
import Image from "next/image";

/* ─── DATA ─── */
const DAYS = [
  {
    num: "01",
    title: "O motivo real pelo qual governos querem controlar seu dinheiro digital",
    desc: "Inflação programada, vigilância financeira e o que o Plano Collor ensina sobre CBDCs.",
    img: "/days/day1.jpg",
  },
  {
    num: "02",
    title: "O evento de 1971 que transformou seu salário em papel depreciável",
    desc: "O que mudou quando Nixon tirou o dólar do ouro — e por que Bitcoin é a resposta.",
    img: "/days/day2.jpg",
  },
  {
    num: "03",
    title: "Por que o Bitcoin que está na sua exchange não é seu",
    desc: "Mt. Gox, FTX, Celsius — o padrão que se repete. E o método P2P que elimina o risco.",
    img: "/days/day3.jpg",
  },
  {
    num: "04",
    title: "O ataque de US$ 284 milhões que começou com um telefonema",
    desc: "Phishing, wrench attacks e engenharia social. Como criar um setup à prova de tudo.",
    img: "/days/day4.jpg",
  },
  {
    num: "05",
    title: "O setup que cabe no bolso e não existe pra nenhum hacker do mundo",
    desc: "Air-gapped, open-source, backup em metal. Passo a passo do seu cofre pessoal.",
    img: "/days/day5.jpg",
  },
];

const FAQS = [
  {
    q: "Já comprei na Binance com KYC. Ainda faz sentido pra mim?",
    a: "Faz mais sentido ainda. Seus dados já existem num banco de dados. O curso ensina como a partir de agora suas próximas compras não criem mais registros — e como proteger o que você já tem.",
  },
  {
    q: "É gratuito mesmo? Qual a pegadinha?",
    a: "Nenhuma. A DSEC Labs fabrica hardware de segurança Bitcoin. Quanto mais gente entender self-custody, mais gente precisa de cofres bons. A educação é o marketing.",
  },
  {
    q: "Vou precisar comprar algum equipamento?",
    a: "Não. O curso ensina conceitos que funcionam com qualquer hardware wallet. Se depois quiser conhecer o ColdKit, vai ser uma escolha sua — não uma obrigação.",
  },
  {
    q: "Tenho medo de perder acesso ao meu Bitcoin com self-custody.",
    a: "Esse medo é normal e saudável. O dia 4 do curso é dedicado inteiramente a isso: como fazer backup à prova de incêndio, enchente e esquecimento.",
  },
  {
    q: "Como sei que meu e-mail não vai ser vendido?",
    a: "Somos uma empresa de segurança Bitcoin. Se vazássemos dados de clientes, não teríamos empresa. Privacidade é o nosso produto.",
  },
];

/* ─── EMAIL FORM ─── */
function EmailForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const hiddenForm = document.createElement("form");
    hiddenForm.method = "POST";
    hiddenForm.action = "https://app.rdstation.com.br/api/1.2/conversions";
    hiddenForm.target = "rd-iframe-nova";
    hiddenForm.style.display = "none";

    const fields: Record<string, string> = {
      token_rdstation: "null",
      identificador: "forms-captura-leads-x-c92b969c120bb9b7290a",
      email,
      celular: phone,
      c_utmz: "",
      traffic_source: document.referrer || "",
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      hiddenForm.appendChild(input);
    });

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    setTimeout(() => {
      window.location.href = "/obrigado";
    }, 800);
  };

  return (
    <>
      <iframe name="rd-iframe-nova" ref={iframeRef} className="hidden" />
      <form onSubmit={handleSubmit} className="space-y-3 w-full">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1.5">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="+60.000"
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--orange)] transition-colors disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1.5">WhatsApp</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+55 021 987899372"
            className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--orange)] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 bg-[var(--orange)] text-black font-bold rounded-lg hover:brightness-110 transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === "loading" ? "Enviando..." : "Enviar"}
          {status !== "loading" && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </form>
    </>
  );
}

/* ─── FAQ ITEM ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="text-[15px] font-semibold text-white group-hover:text-[var(--orange)] transition-colors pr-6">
          {q}
        </span>
        <span className={`text-[var(--text-muted)] text-xl shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-6" : "max-h-0"}`}>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[var(--orange)] rounded-sm flex items-center justify-center">
              <span className="text-[10px] font-black text-black">D</span>
            </div>
            <span className="text-sm font-bold tracking-wide">SEC LABS</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] text-[var(--text-muted)]">
            <a href="https://youtube.com/@dseclabs" target="_blank" rel="noopener" className="hover:text-white transition-colors">Youtube</a>
            <a href="https://instagram.com/dseclab.io" target="_blank" rel="noopener" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com/alfredp2p" target="_blank" rel="noopener" className="hover:text-white transition-colors">Alfredp2p</a>
            <a href="https://x.com/alfredp2p" target="_blank" rel="noopener" className="hover:text-white transition-colors">X</a>
            <a href="https://tiktok.com/@dseclab" target="_blank" rel="noopener" className="hover:text-white transition-colors">Tiktok</a>
            <a href="https://t.me/alfredp2p" target="_blank" rel="noopener" className="hover:text-white transition-colors">Telegram</a>
          </div>
          <a href="#start" className="text-xs font-semibold border border-[var(--orange)] text-[var(--orange)] px-4 py-2 rounded-full hover:bg-[var(--orange)] hover:text-black transition-all">
            Quero o Curso
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen pt-14 overflow-hidden" id="start">
        {/* BG: perspective grid image filling entire hero */}
        <div className="absolute inset-0 z-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover opacity-50" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/20 via-transparent to-[var(--bg)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg)]/60" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="grid md:grid-cols-[1fr_380px] gap-16 items-center">
            {/* Left: headline + subtitle */}
            <div className="animate-fade-up">
              <h1 className="text-3xl md:text-[2.6rem] lg:text-[3rem] leading-[1.15] mb-5">
                <span className="text-[var(--orange)] font-bold italic">Comprar Bitcoin é fácil...</span>
                <br />
                <span className="text-white font-bold">Difícil</span>{" "}
                <span className="text-white">é fazer com</span>
                <br />
                <span className="text-white">privacidade e controle</span>
              </h1>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-md mt-5 animate-fade-up delay-1">
                <span className="text-[var(--orange)] font-semibold">Apenas 5 dias,</span>{" "}
                você sai do zero e aprende a comprar, guardar e usar Bitcoin com autonomia total.
              </p>
            </div>

            {/* Right: form card with Alfred overlapping */}
            <div className="relative animate-fade-up delay-2">
              {/* Alfred overlapping from behind the card */}
              <div className="absolute -left-16 -bottom-4 w-[150px] md:w-[180px] z-30 pointer-events-none">
                <Image
                  src="/assets/alfred.png"
                  alt="Alfred"
                  width={180}
                  height={225}
                  className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  unoptimized
                />
              </div>

              <div className="relative rounded-2xl border border-[var(--border)]/60 bg-[var(--bg-card)]/90 backdrop-blur-md p-6 md:p-7 overflow-hidden">
                {/* Subtle curved bg shape inside card */}
                <div className="absolute inset-0 opacity-20 rounded-2xl overflow-hidden">
                  <Image src="/assets/form-bg.png" alt="" fill className="object-cover" />
                </div>
                <div className="relative z-10">
                  <EmailForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 border-t border-[var(--border)]/50 bg-[var(--bg)]/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-sm">
            <div>
              <span className="font-bold text-white uppercase tracking-wide">100% GRATUITO</span>
              <span className="text-[var(--text-muted)] ml-3">Curso focado em pontos não óbvios</span>
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wide">5 DIAS</span>
              <span className="text-[var(--text-muted)] ml-3">Curta duração, alta carga de conhecimento</span>
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wide italic">CADASTRO RÁPIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ O QUE VOCÊ VAI RECEBER ═══ */}
      <section className="py-24 md:py-32 border-t border-[var(--border)]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] tracking-[0.25em] uppercase mb-5">O QUE VOCÊ VAI RECEBER</p>
              <h2 className="text-[1.75rem] md:text-[2.2rem] font-bold leading-[1.2]">
                5 dias.<br />5 aulas que mudam como<br />você protege seu dinheiro.
              </h2>
            </div>
            <a href="#start" className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--orange)] text-[var(--orange)] rounded-full text-sm font-semibold hover:bg-[var(--orange)] hover:text-black transition-all shrink-0">
              Quero o primeiro dia
            </a>
          </div>

          {/* 5 cards — full width grid on desktop, scroll on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {DAYS.map((day) => (
              <div key={day.num} className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)]/40 overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={day.img} alt={`Dia ${day.num}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <span className="absolute top-2.5 left-2.5 text-[8px] font-mono tracking-widest uppercase text-[var(--orange)] bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[var(--orange)]/30">DIA {day.num}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/20 to-transparent" />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-[12px] md:text-[13px] font-semibold leading-snug mb-1.5 text-white">{day.title}</h3>
                  <p className="text-[10px] md:text-[11px] text-[var(--text-muted)] leading-relaxed">{day.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POR QUE SE IMPORTAR ═══ */}
      <section className="py-24 md:py-32 border-t border-[var(--border)]/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[11px] font-mono text-[var(--text-muted)] tracking-[0.25em] uppercase mb-14">POR QUE VOCÊ DEVERIA SE IMPORTAR AGORA</p>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6 md:p-8 border border-[var(--gold)]/30" style={{ background: "linear-gradient(145deg, #6b4f1d 0%, #3d2e11 100%)" }}>
              <p className="text-[3rem] md:text-[3.5rem] font-bold leading-none text-white">270<span className="text-2xl">mil</span></p>
              <p className="text-sm font-semibold text-white mt-1 mb-4">Clientes com dados vazados</p>
              <p className="text-[13px] text-white/70 leading-relaxed mb-4">Uma fabricante de hardware wallets expôs nome, endereço e patrimônio de 270 mil usuários, abrindo espaço para phishing direcionado e invasões físicas.</p>
              <p className="text-[13px] text-[var(--orange)] font-semibold leading-relaxed">No curso, <span className="underline">você aprende a operar sem vincular sua identidade às transações.</span></p>
            </div>
            <div className="rounded-2xl p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--border)]">
              <p className="text-[3rem] md:text-[3.5rem] font-bold leading-none text-white">$8B</p>
              <p className="text-sm font-semibold text-white mt-1 mb-4">Sumiram da FTX em 72 horas</p>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-4">Dinheiro desaparecer enquanto clientes viam saldos &quot;normais&quot; na plataforma.</p>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">No curso, você aprende a manter controle direto dos seus ativos, sem depender de terceiros.</p>
            </div>
            <div className="rounded-2xl p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--border)]">
              <p className="text-[3rem] md:text-[3.5rem] font-bold leading-none text-white">72</p>
              <p className="text-sm font-semibold text-white mt-1 mb-4">Ataques físicos apenas em 2026</p>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-4">Casos de extorsão e sequestro ligados a cripto cresceram.</p>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">No curso, você aprende práticas de privacidade que reduzem sua exposição, inclusive fora do ambiente digital!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 md:py-32 border-t border-[var(--border)]/30">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[11px] font-mono text-[var(--orange)] tracking-[0.25em] uppercase mb-3">PERGUNTAS FREQUENTES</p>
          <h2 className="text-2xl md:text-[2rem] font-bold mb-14">Antes de decidir</h2>
          <div>
            {FAQS.map((faq) => (<FaqItem key={faq.q} q={faq.q} a={faq.a} />))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[var(--border)]/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[var(--orange)] rounded-sm flex items-center justify-center">
              <span className="text-[8px] font-black text-black">D</span>
            </div>
            <span className="text-xs font-bold tracking-wide">SEC LABS</span>
          </div>
          <div className="flex gap-6 text-xs text-[var(--text-muted)]">
            <a href="https://youtube.com/@dseclabs" target="_blank" rel="noopener" className="hover:text-white transition-colors">Youtube</a>
            <a href="https://instagram.com/dseclab.io" target="_blank" rel="noopener" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com/alfredp2p" target="_blank" rel="noopener" className="hover:text-white transition-colors">Alfredp2p</a>
            <a href="https://discord.dseclab.io" target="_blank" rel="noopener" className="hover:text-white transition-colors">Discord</a>
            <a href="https://t.me/alfredp2p" target="_blank" rel="noopener" className="hover:text-white transition-colors">Telegram</a>
          </div>
          <p className="text-xs text-[var(--text-muted)]">© 2026 DSEC Labs. No Trust. Do It Yourself.</p>
        </div>
      </footer>
    </main>
  );
}
