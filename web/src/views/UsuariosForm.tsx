"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import { getToken } from "@/helpers/auth";
import { API_URL } from "@/helpers/api";
import type { Usuario, Perfil } from "@/@types/entities";
import styles from "./UsuariosForm.module.css";

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados do formulário
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [perfilId, setPerfilId] = useState(0);
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);

  // Carregar usuários
  async function carregarUsuarios() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/usuarios`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUsuarios(data);
      } else {
        setError("Erro ao carregar usuários");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  // Carregar perfis
  async function carregarPerfis() {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/perfis`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setPerfis(data);
      }
    } catch (err) {
      console.error("Erro ao carregar perfis");
    }
  }

  useEffect(() => {
    carregarUsuarios();
    carregarPerfis();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = getToken();
      const url = editando
        ? `${API_URL}/usuarios/${editando.id}`
        : `${API_URL}/usuarios`;
      
      const method = editando ? "PUT" : "POST";
      
      const payload = editando ? {
        nome,
        email,
        sexo,
        dataNascimento: dataNascimento ? `${dataNascimento}T00:00:00.000Z` : undefined,
      } : {
        nome,
        email,
        senha,
        sexo,
        perfilId,
        dataNascimento: dataNascimento ? `${dataNascimento}T00:00:00.000Z` : undefined,
        telefones: [{ numero: telefone, descricao: "Principal" }]
      };

      // Remover campos undefined do payload
      Object.keys(payload).forEach((key) => {
        if ((payload as any)[key] === undefined) {
          delete (payload as any)[key];
        }
      });
      
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (res.ok) {
        // Limpar formulário
        setNome("");
        setEmail("");
        setSenha("");
        setDataNascimento("");
        setSexo("");
        setTelefone("");
        setPerfilId(0);
        setShowForm(false);
        setEditando(null);
        // Recarregar lista
        carregarUsuarios();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError(data.message || "Erro ao salvar usuário");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  // Editar usuário
  function handleEditar(usuario: Usuario) {
    if (!usuario) {
      setError("Usuário não encontrado");
      return;
    }
    
    setEditando(usuario);
    setNome(usuario.nome || "");
    setEmail(usuario.email || "");
    setDataNascimento(usuario.dataNascimento?.slice(0, 10) || "");
    setSexo(usuario.sexo || "");
    setTelefone(usuario.telefones?.[0]?.numero || "");
    setPerfilId(usuario.perfil?.id || 0);
    setShowForm(true);
  }

  // Remover usuário
  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        carregarUsuarios();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError("Erro ao remover usuário");
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
    setEmail("");
    setSenha("");
    setDataNascimento("");
    setSexo("");
    setTelefone("");
    setPerfilId(0);
    setError(null);
  }

  // Novo usuário
  function handleNovo() {
    setShowForm(true);
    setEditando(null);
    setNome("");
    setEmail("");
    setSenha("");
    setDataNascimento("");
    setSexo("");
    setTelefone("");
    setPerfilId(0);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>👥 Usuários</h1>
        {!showForm && (
          <Button onClick={handleNovo} className={styles.novoBtn}>
            ➕ Novo Usuário
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
          <h2>{editando ? "✏️ Editar Usuário" : "➕ Novo Usuário"}</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              label="Data de Nascimento"
              type="date"
              value={dataNascimento}
              onChange={e => setDataNascimento(e.target.value)}
              required
            />
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Sexo *
              </label>
              <select
                value={sexo}
                onChange={e => setSexo(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Selecione o sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <Input
              label="Telefone"
              type="tel"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
              required
            />
            {!editando && (
              <Input
                label="Senha"
                type="password"
                minLength={6}
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            )}
            <div className={styles.selectContainer}>
              <label className={styles.label}>
                Perfil *
              </label>
              <select
                value={perfilId}
                onChange={e => setPerfilId(Number(e.target.value))}
                className={styles.select}
                required
              >
                <option value={0}>Selecione um perfil</option>
                {perfis.map(perfil => (
                  <option key={perfil.id} value={perfil.id}>
                    {perfil.nome}
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
          ) : usuarios.length === 0 ? (
            <div className={styles.empty}>
              <p>Nenhum usuário cadastrado</p>
              <Button onClick={handleNovo} className={styles.novoBtn}>
                ➕ Cadastrar primeiro usuário
              </Button>
            </div>
          ) : (
            <div className={styles.grid}>
              {usuarios.map(usuario => (
                <Card key={usuario.id}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{usuario.nome}</h3>
                      <p className={styles.cardInfo}>
                        <strong>📧 Email:</strong> {usuario.email}
                      </p>
                      <p className={styles.cardInfo}>
                        <strong>👤 Perfil:</strong> {usuario.perfil?.nome}
                      </p>
                    </div>
                    <span className={`${styles.status} ${(usuario.ativo !== undefined ? usuario.ativo : true) ? styles.active : styles.inactive}`}>
                      {(usuario.ativo !== undefined ? usuario.ativo : true) ? "✅ Ativo" : "❌ Inativo"}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    <Button 
                      onClick={() => handleEditar(usuario)}
                      className={styles.editBtn}
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      onClick={() => handleRemover(usuario.id)}
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