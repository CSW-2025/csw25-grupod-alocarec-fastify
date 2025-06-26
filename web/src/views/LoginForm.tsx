"use client";
import { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { API_URL } from "@/helpers/api";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    // Olho aberto
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5"/><circle cx="12" cy="12" r="2.5"/></svg>
  ) : (
    // Olho fechado
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="8" ry="5"/><circle cx="12" cy="12" r="2.5"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        document.cookie = `token=${data.token}; path=/`;
        window.location.href = "/";
      } else {
        setError(data.message || "Erro ao fazer login");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Seja bem-vindo ao nosso SARC</h1>
      <div style={{ maxWidth: 400, margin: "80px auto", backgroundColor: "#111111", padding: "3rem", borderRadius: 8 }}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div style={{ marginBottom: 12 }}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 12, position: 'relative' }}>
            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              name="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              style={{ paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 10,
                top: 36,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#888',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <ErrorMessage message={error || ""} />
          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </>
  );
} 