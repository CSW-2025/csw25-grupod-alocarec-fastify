"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import { getToken } from "@/helpers/auth";
import { API_URL } from "@/helpers/api";
import styles from "./RecursosForm.module.css";

export default function RecursosView() {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📦 Recursos</h1>
        {!showForm && (
          <Button onClick={handleNovo} className={styles.novoBtn}>
            ➕ Novo Recurso
          </Button>
        )}
      </div>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {showForm ? (
        <Card>
          <h2>{editando ? "✏️ Editar Recurso" : "➕ Novo Recurso"}</h2>
          <form onSubmit={handleSubmit}>
            <Input label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className={styles.select}
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
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Tipo *
              </label>
              <select
                value={tipoId}
                onChange={e => setTipoId(Number(e.target.value))}
                className={styles.select}
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
            <div className={styles.buttonGroup}>
              <Button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? "Salvando..." : editando ? "Atualizar" : "Cadastrar"}
              </Button>
              <Button type="button" onClick={handleCancelar} className={styles.cancelBtn}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div>
          {loading ? (
            <div className={styles.loading}>Carregando...</div>
          ) : recursos.length === 0 ? (
            <div className={styles.empty}>
              <p>Nenhum recurso cadastrado</p>
              <Button onClick={handleNovo} className={styles.novoBtn}>
                ➕ Cadastrar primeiro recurso
              </Button>
            </div>
          ) : (
            <div className={styles.grid}>
              {recursos.map(recurso => (
                <Card key={recurso.id}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{recurso.descricao}</h3>
                      <p className={styles.cardInfo}>
                        <strong>Status:</strong> {recurso.status}
                      </p>                   
                      <p className={styles.cardInfo}>
                        <strong>Disponível:</strong> {recurso.disponivel ? "Sim" : "Não"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <Button onClick={() => handleEditar(recurso)} className={styles.editBtn}>
                      ✏️ Editar
                    </Button>
                    <Button onClick={() => handleRemover(recurso.id)} className={styles.removeBtn}>
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
