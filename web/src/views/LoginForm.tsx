"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { API_URL } from "@/helpers/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div style={{ maxWidth: 400, margin: "80px auto", backgroundColor: "#111111", padding: "2rem", borderRadius: 8 }}>
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
        <div style={{ marginBottom: 12 }}>
          <Input
            label="Senha"
            type="password"
            name="senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </div>
        <ErrorMessage message={error || ""} />
        <Button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
} 