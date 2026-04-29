import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonte oficial do design DSEC (confirmado via Figma MCP em 29/04).
// Space Grotesk Bold é usada nos headlines + labels do trust strip.
// Geist Mono mantida como fallback pro `font-mono` em micro-text.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSEC Labs · Curso Mini Bitcoin Privacy",
  description:
    "Aprenda em 5 dias como comprar, guardar e usar Bitcoin com privacidade e controle total. Curso gratuito da DSEC Labs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
