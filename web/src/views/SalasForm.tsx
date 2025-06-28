"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import { getToken } from "@/helpers/auth";
import { API_URL } from "@/helpers/api";
import styles from "./SalasForm.module.css";

export default function SalasView() {
  const [salas, setSalas] = useState<{id: number, nome: string, capacidade: number, predio?: {id: number, nome: string}}[]>([]);
  const [predios, setPredios] = useState<{id: number, nome: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formulário
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [predioId, setPredioId] = useState(0);
  const [editando, setEditando] = useState<{id: number, nome: string, capacidade: number, predio?: {id: number, nome: string}} | null>(null);

  // Buscar salas
  async function carregarSalas() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/salas`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSalas(data as {id: number, nome: string, capacidade: number, predio?: {id: number, nome: string}}[]);
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
      const res = await fetch(`${API_URL}/predios`, {
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
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      const url = editando
        ? `${API_URL}/salas/${editando.id}`
        : `${API_URL}/salas`;
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
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
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
  function handleEditar(sala: any) {
    setEditando(sala);
    setNome(sala.nome);
    setCapacidade(sala.capacidade.toString());
    setPredioId(sala.predio?.id || 0);
    setShowForm(true);
  }

  // Remover sala
  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/salas/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        carregarSalas();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        const data = await res.json();
        setError(data.message || "Erro ao remover sala");
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🏢 Salas</h1>
        {!showForm && (
          <Button onClick={handleNova} className={styles.novoBtn}>
            ➕ Nova Sala
          </Button>
        )}
      </div>

      {error && (
        <div className={styles.error}>
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
              min={1}
              value={capacidade}
              onChange={e => setCapacidade(e.target.value)}
              required
            />
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Prédio *
              </label>
              <select
                value={predioId}
                onChange={e => setPredioId(Number(e.target.value))}
                className={styles.select}
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
            <div className={styles.buttonGroup}>
              <Button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? "Salvando..." : (editando ? "Atualizar" : "Cadastrar")}
              </Button>
              <Button
                type="button"
                onClick={handleCancelar}
                className={styles.cancelBtn}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div>
          {loading ? (
            <div className={styles.loading}>
              Carregando...
            </div>
          ) : salas.length === 0 ? (
            <div className={styles.empty}>
              <p>Nenhuma sala cadastrada</p>
              <Button onClick={handleNova} className={styles.novoBtn}>
                ➕ Cadastrar primeira sala
              </Button>
            </div>
          ) : (
            <div className={styles.grid}>
              {salas.map(sala => (
                <Card key={sala.id}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{sala.nome}</h3>
                      <p className={styles.cardInfo}>
                        <strong>Capacidade:</strong> {sala.capacidade}
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <Button
                      onClick={() => handleEditar(sala)}
                      className={styles.editBtn}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      onClick={() => handleRemover(sala.id)}
                      className={styles.removeBtn}
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