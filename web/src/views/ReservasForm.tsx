"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getToken } from "@/helpers/auth";

export default function ReservasForm() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [salas, setSalas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [salaId, setSalaId] = useState<number>(0);
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [dataHora, setDataHora] = useState<string>("");
  const [editando, setEditando] = useState<any | null>(null);

  async function carregarReservas() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/reservas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setReservas(data);
      } else {
        setError("Erro ao carregar reservas");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  async function carregarSalas() {
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/salas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSalas(data);
      }
    } catch (err) {
      console.error("Erro ao carregar salas");
    }
  }

  async function carregarUsuarios() {
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsuarios(data);
      }
    } catch (err) {
      console.error("Erro ao carregar usuários");
    }
  }

  useEffect(() => {
    carregarReservas();
    carregarSalas();
    carregarUsuarios();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      const url = editando
        ? `http://localhost:3000/reservas/${editando.id}`
        : "http://localhost:3000/reservas";
      const method = editando ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          salaId,
          usuarioId,
          dataHora,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSalaId(0);
        setUsuarioId(0);
        setDataHora("");
        setShowForm(false);
        setEditando(null);
        carregarReservas();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError(data.message || "Erro ao salvar reserva");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  function handleEditar(reserva: any) {
    setEditando(reserva);
    setSalaId(reserva.salaId);
    setUsuarioId(reserva.usuarioId);
    setDataHora(new Date(reserva.dataHora).toISOString().slice(0, 16));
    setShowForm(true);
  }

  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3000/reservas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        carregarReservas();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError("Erro ao remover reserva");
      }
    } catch (err) {
      setError("Erro de conexão");
    }
  }

  function handleCancelar() {
    setShowForm(false);
    setEditando(null);
    setSalaId(0);
    setUsuarioId(0);
    setDataHora("");
    setError(null);
  }

  function handleNova() {
    setShowForm(true);
    setEditando(null);
    setSalaId(0);
    setUsuarioId(0);
    setDataHora("");
  }

  function nomeSala(id: number) {
    return salas.find((s) => s.id === id)?.nome || id;
  }

  function nomeUsuario(id: number) {
    return usuarios.find((u) => u.id === id)?.nome || id;
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
        <h1>📅 Reservas</h1>
        {!showForm && (
          <Button onClick={handleNova} style={{ background: "#28a745" }}>
            ➕ Nova Reserva
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
          <h2>{editando ? "✏️ Editar Reserva" : "➕ Nova Reserva"}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>
                Sala *
              </label>
              <select
                value={salaId}
                onChange={(e) => setSalaId(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              >
                <option value={0}>Selecione uma sala</option>
                {salas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>
                Usuário *
              </label>
              <select
                value={usuarioId}
                onChange={(e) => setUsuarioId(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              >
                <option value={0}>Selecione um usuário</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Data e Hora"
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <Button type="submit" disabled={loading} style={{ flex: 1 }}>
                {loading ? "Salvando..." : editando ? "Atualizar" : "Cadastrar"}
              </Button>
              <Button
                type="button"
                onClick={handleCancelar}
                style={{ flex: 1, background: "#6c757d" }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Carregando...</div>
          ) : reservas.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Nenhuma reserva cadastrada</p>
              <Button onClick={handleNova} style={{ background: "#28a745" }}>
                ➕ Cadastrar primeira reserva
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
              {reservas.map((reserva) => (
                <Card key={reserva.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>
                        Sala: {nomeSala(reserva.salaId)}
                      </h3>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Usuário:</strong> {nomeUsuario(reserva.usuarioId)}
                      </p>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Data:</strong> {new Date(reserva.dataHora).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      borderTop: "1px solid #eee",
                      paddingTop: "12px",
                    }}
                  >
                    <Button
                      onClick={() => handleEditar(reserva)}
                      style={{ background: "#0070f3", flex: 1 }}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      onClick={() => handleRemover(reserva.id)}
                      style={{ background: "#dc3545", flex: 1 }}
                    >
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
