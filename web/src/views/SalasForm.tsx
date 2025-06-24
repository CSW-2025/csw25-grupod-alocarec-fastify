"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getToken } from "@/helpers/auth";

export default function SalasForm() {
  const [salas, setSalas] = useState([]);
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Formulário
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [predioId, setPredioId] = useState(0);
  const [editando, setEditando] = useState(null);

  // Buscar salas
  async function carregarSalas() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/salas", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSalas(data);
      } else {
        setError("Erro ao carregar salas");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  // Buscar prédios
  async function carregarPredios() {
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/predios", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setPredios(data);
      }
    } catch (err) {
      console.error("Erro ao carregar prédios");
    }
  }

  useEffect(() => {
    carregarSalas();
    carregarPredios();
  }, []);

  // Salvar sala
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      const url = editando
        ? `http://localhost:3000/salas/${editando.id}`
        : "http://localhost:3000/salas";
      const method = editando ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          capacidade: Number(capacidade),
          predioId
        })
      });
      const data = await res.json();
      if (res.ok) {
        setNome("");
        setCapacidade("");
        setPredioId(0);
        setShowForm(false);
        setEditando(null);
        carregarSalas();
      } else {
        setError(data.message || "Erro ao salvar sala");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  // Editar sala
  function handleEditar(sala) {
    setEditando(sala);
    setNome(sala.nome);
    setCapacidade(sala.capacidade.toString());
    setPredioId(sala.predio?.id || 0);
    setShowForm(true);
  }

  // Remover sala
  async function handleRemover(id) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3000/salas/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        carregarSalas();
      } else {
        setError("Erro ao remover sala");
      }
    } catch (err) {
      setError("Erro de conexão");
    }
  }

  // Cancelar formulário
  function handleCancelar() {
    setShowForm(false);
    setEditando(null);
    setNome("");
    setCapacidade("");
    setPredioId(0);
    setError(null);
  }

  // Nova sala
  function handleNova() {
    setShowForm(true);
    setEditando(null);
    setNome("");
    setCapacidade("");
    setPredioId(0);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <h1>🏢 Salas</h1>
        {!showForm && (
          <Button onClick={handleNova} style={{ background: "#28a745" }}>
            ➕ Nova Sala
          </Button>
        )}
      </div>

      {error && (
        <div style={{
          background: "#f8d7da",
          color: "#721c24",
          padding: "12px",
          borderRadius: "4px",
          marginBottom: "16px"
        }}>
          {error}
        </div>
      )}

      {showForm ? (
        <Card>
          <h2>{editando ? "✏️ Editar Sala" : "➕ Nova Sala"}</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <Input
              label="Capacidade"
              type="number"
              value={capacidade}
              onChange={e => setCapacidade(e.target.value)}
              required
            />
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>
                Prédio *
              </label>
              <select
                value={predioId}
                onChange={e => setPredioId(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
                required
              >
                <option value={0}>Selecione um prédio</option>
                {predios.map(predio => (
                  <option key={predio.id} value={predio.id}>
                    {predio.nome}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button type="submit" disabled={loading} style={{ flex: 1 }}>
                {loading ? "Salvando..." : (editando ? "Atualizar" : "Cadastrar")}
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
            <div style={{ textAlign: "center", padding: "40px" }}>
              Carregando...
            </div>
          ) : salas.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Nenhuma sala cadastrada</p>
              <Button onClick={handleNova} style={{ background: "#28a745" }}>
                ➕ Cadastrar primeira sala
              </Button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "16px"
            }}>
              {salas.map(sala => (
                <Card key={sala.id}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px"
                  }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{sala.nome}</h3>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Capacidade:</strong> {sala.capacidade}
                      </p>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Prédio:</strong> {sala.predio?.nome || "-"}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    borderTop: "1px solid #eee",
                    paddingTop: "12px"
                  }}>
                    <Button
                      onClick={() => handleEditar(sala)}
                      style={{ background: "#0070f3", flex: 1 }}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      onClick={() => handleRemover(sala.id)}
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