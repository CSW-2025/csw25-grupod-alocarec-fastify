import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getToken, getUserPerfil } from "@/helpers/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SARC",
  description: "Sistema de Alocação de Recursos e Controle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isLogged = false;
  let perfil = "";
  if (typeof window !== "undefined") {
    isLogged = !!getToken();
    perfil = getUserPerfil();
  }

  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav style={{ padding: 16, borderBottom: "1px solid #eee", marginBottom: 24 }}>
          <Link href="/">Início</Link> |
          <Link href="/salas" style={{ marginLeft: 8 }}>Salas</Link> |
          <Link href="/reservas" style={{ marginLeft: 8 }}>Reservas</Link> |
          <Link href="/recursos" style={{ marginLeft: 8 }}>Recursos</Link> |
          {isLogged ? (
            <a href="/logout" style={{ marginLeft: 8 }}>Logout</a>
          ) : (
            <Link href="/login" style={{ marginLeft: 8 }}>Login</Link>
          )}
          {isLogged && perfil && (
            <span style={{ marginLeft: 16, color: "#888" }}>[{perfil}]</span>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
