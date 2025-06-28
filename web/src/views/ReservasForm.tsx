"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import { getToken } from "@/helpers/auth";
import { API_URL } from "@/helpers/api";
import styles from "./ReservasForm.module.css";

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
      const res = await fetch(`${API_URL}/reservas`, {
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
      const res = await fetch(`${API_URL}/salas`, {
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
      const res = await fetch(`${API_URL}/usuarios`, {
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
        ? `${API_URL}/reservas/${editando.id}`
        : `${API_URL}/reservas`;
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
          dataHora: new Date(dataHora).toISOString(),
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
      const res = await fetch(`${API_URL}/reservas/${id}`, {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📅 Reservas</h1>
        {!showForm && (
          <Button onClick={handleNova} className={styles.novoBtn}>
            ➕ Nova Reserva
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
          <h2>{editando ? "✏️ Editar Reserva" : "➕ Nova Reserva"}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Sala *
              </label>
              <select
                value={salaId}
                onChange={(e) => setSalaId(Number(e.target.value))}
                className={styles.select}
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
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Usuário *
              </label>
              <select
                value={usuarioId}
                onChange={(e) => setUsuarioId(Number(e.target.value))}
                className={styles.select}
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
            <div className={styles.buttonGroup}>
              <Button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? "Salvando..." : editando ? "Atualizar" : "Cadastrar"}
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
            <div className={styles.loading}>Carregando...</div>
          ) : reservas.length === 0 ? (
            <div className={styles.empty}>
              <p>Nenhuma reserva cadastrada</p>
              <Button onClick={handleNova} className={styles.novoBtn}>
                ➕ Cadastrar primeira reserva
              </Button>
            </div>
          ) : (
            <div className={styles.grid}>
              {reservas.map((reserva) => (
                <Card key={reserva.id}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>
                        Sala: {nomeSala(reserva.salaId)}
                      </h3>
                      <p className={styles.cardInfo}>
                        <strong>Usuário:</strong> {nomeUsuario(reserva.usuarioId)}
                      </p>
                      <p className={styles.cardInfo}>
                        <strong>Data:</strong> {new Date(reserva.dataHora).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <Button
                      onClick={() => handleEditar(reserva)}
                      className={styles.editBtn}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      onClick={() => handleRemover(reserva.id)}
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