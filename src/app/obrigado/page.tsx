import Link from "next/link";

export default function Obrigado() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-lg text-center">
        <div className="w-12 h-12 bg-[var(--orange)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Inscrição confirmada.</h1>
        <p className="text-[var(--text-muted)] mb-8">
          O Dia 1 do mini-curso já está a caminho do seu e-mail. Confira a caixa de entrada (e o spam, por precaução).
        </p>
        <a
          href="https://t.me/alfredp2p"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--orange)] text-black font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Entrar no grupo do Telegram
        </a>
        <p className="text-xs text-[var(--text-muted)] mt-4">
          Sorteios exclusivos e descontos em taxas para membros.
        </p>
        <div className="mt-12">
          <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
