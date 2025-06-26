"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getToken } from "@/helpers/auth";
import { API_URL } from "@/helpers/api";

export default function RecursosForm() {
  const [recursos, setRecursos] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [disponivel, setDisponivel] = useState(true);
  const [tipoId, setTipoId] = useState(0);
  const [editando, setEditando] = useState<any | null>(null);

  const statusOpcoes = [
  { id: 0, nome: "Disponível" },
  { id: 1, nome: "Ocupado" },
];

  async function carregarRecursos() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/recursos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setRecursos(data);
      } else {
        setError("Erro ao carregar recursos");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  async function carregarTipos() {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/tipos-recurso`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log('Tipos carregados:', data);
      if (res.ok) {
        setTipos(data);
        if (!data || data.length === 0) {
          setError('Nenhum tipo de recurso cadastrado. Cadastre tipos antes de criar recursos.');
        }
      }
    } catch (err) {
      console.error("Erro ao carregar tipos");
      setError('Erro ao carregar tipos de recurso.');
    }
  }

  useEffect(() => {
    carregarRecursos();
    carregarTipos();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    console.log({ descricao, status, disponivel, tipo_recurso_id: tipoId });
    if (tipoId === 0) {
      setError('Selecione um tipo de recurso válido.');
      setLoading(false);
      return;
    }
    try {
      const token = getToken();
      const url = editando
        ? `${API_URL}/recursos/${editando.id}`
        : `${API_URL}/recursos`;
      const method = editando ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao,
          status,
          disponivel,
          tipo_recurso_id: tipoId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        limparForm();
        setShowForm(false);
        setEditando(null);
        carregarRecursos();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError(data.message || "Erro ao salvar recurso");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  function handleEditar(recurso: any) {
    setEditando(recurso);
    setDescricao(recurso.descricao);
    setStatus(recurso.status);
    setDisponivel(recurso.disponivel);
    setTipoId(recurso.tipo_recurso_id);
    setShowForm(true);
  }

  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/recursos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        carregarRecursos();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError("Erro ao remover recurso");
      }
    } catch (err) {
      setError("Erro de conexão");
    }
  }

  function limparForm() {
    setDescricao("");
    setStatus("");
    setDisponivel(true);
    setTipoId(0);
  }

  function handleCancelar() {
    setShowForm(false);
    setEditando(null);
    limparForm();
    setError(null);
  }

  function handleNovo() {
    setShowForm(true);
    setEditando(null);
    limparForm();
  }

  function nomeTipo(id: number) {
    return tipos.find((t) => t.id === id)?.nome || id;
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
        <h1>📦 Recursos</h1>
        {!showForm && (
          <Button onClick={handleNovo} style={{ background: "#28a745" }}>
            ➕ Novo Recurso
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
          <h2>{editando ? "✏️ Editar Recurso" : "➕ Novo Recurso"}</h2>
          <form onSubmit={handleSubmit}>
            <Input label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              >
                <option value="">Selecione um status</option>
                {statusOpcoes.map((opcao) => (
                  <option key={opcao.id} value={opcao.nome}>
                    {opcao.nome}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>
                Tipo *
              </label>
              <select
                value={tipoId}
                onChange={e => setTipoId(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              >
                <option value={0}>Selecione um tipo</option>
                {tipos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>
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
          ) : recursos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Nenhum recurso cadastrado</p>
              <Button onClick={handleNovo} style={{ background: "#28a745" }}>
                ➕ Cadastrar primeiro recurso
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
              {recursos.map(recurso => (
                <Card key={recurso.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{recurso.descricao}</h3>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Status:</strong> {recurso.status}
                      </p>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Tipo:</strong> {nomeTipo(recurso.tipo_recurso_id)}
                      </p>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Disponível:</strong> {recurso.disponivel ? "Sim" : "Não"}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #eee", paddingTop: "12px" }}>
                    <Button onClick={() => handleEditar(recurso)} style={{ background: "#0070f3", flex: 1 }}>
                      ✏️ Editar
                    </Button>
                    <Button onClick={() => handleRemover(recurso.id)} style={{ background: "#dc3545", flex: 1 }}>
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
