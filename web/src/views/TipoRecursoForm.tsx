"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getToken } from "@/helpers/auth";

export default function TipoRecursoForm() {
  const [tipos, setTipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState<any | null>(null);

  async function carregarTipos() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/tipos-recurso", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTipos(data);
      } else {
        setError("Erro ao carregar tipos");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTipos();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      const url = editando
        ? `http://localhost:3000/tipos-recurso/${editando.id}`
        : "http://localhost:3000/tipos-recurso";
      const method = editando ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome }),
      });
      const data = await res.json();
      if (res.ok) {
        setNome("");
        setShowForm(false);
        setEditando(null);
        carregarTipos();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError(data.message || "Erro ao salvar tipo de recurso");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  function handleEditar(tipo: any) {
    setEditando(tipo);
    setNome(tipo.nome);
    setShowForm(true);
  }

  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3000/tipos-recurso/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        carregarTipos();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError("Erro ao remover tipo");
      }
    } catch (err) {
      setError("Erro de conexão");
    }
  }

  function handleCancelar() {
    setShowForm(false);
    setEditando(null);
    setNome("");
    setError(null);
  }

  function handleNovo() {
    setShowForm(true);
    setEditando(null);
    setNome("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>📁 Tipos de Recurso</h1>
        {!showForm && (
          <Button onClick={handleNovo} style={{ background: "#28a745" }}>
            ➕ Novo Tipo
          </Button>
        )}
      </div>

      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      {showForm ? (
        <Card>
          <h2>{editando ? "✏️ Editar Tipo" : "➕ Novo Tipo"}</h2>
          <form onSubmit={handleSubmit}>
            <Input label="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
            <div style={{ display: "flex", gap: "8px" }}>
              <Button type="submit" disabled={loading} style={{ flex: 1 }}>
                {loading ? "Salvando..." : editando ? "Atualizar" : "Cadastrar"}
              </Button>
              <Button type="button" onClick={handleCancelar} style={{ flex: 1, background: "#6c757d" }}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Carregando...</div>
          ) : tipos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Nenhum tipo cadastrado</p>
              <Button onClick={handleNovo} style={{ background: "#28a745" }}>
                ➕ Cadastrar primeiro tipo
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "16px",
              }}
            >
              {tipos.map(tipo => (
                <Card key={tipo.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{tipo.nome}</h3>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #eee", paddingTop: "12px" }}>
                    <Button onClick={() => handleEditar(tipo)} style={{ background: "#0070f3", flex: 1 }}>
                      ✏️ Editar
                    </Button>
                    <Button onClick={() => handleRemover(tipo.id)} style={{ background: "#dc3545", flex: 1 }}>
                      🗑️ Remover
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
