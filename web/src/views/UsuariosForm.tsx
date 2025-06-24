"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getToken } from "@/helpers/auth";

export default function UsuariosForm() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados do formulário
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [perfilId, setPerfilId] = useState(0);
  const [perfis, setPerfis] = useState([]);
  const [editando, setEditando] = useState(null);

  // Carregar usuários
  async function carregarUsuarios() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/usuarios", {
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
      const res = await fetch("http://localhost:3000/perfis", {
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

  
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = getToken();
      const url = editando 
        ? `http://localhost:3000/usuarios/${editando.id}`
        : "http://localhost:3000/usuarios";
      
      const method = editando ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          email,
          senha: editando ? undefined : senha,
          perfilId,
          dataNascimento
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        // Limpar formulário
        setNome("");
        setEmail("");
        setSenha("");
        setDataNascimento("");
        setPerfilId(0);
        setShowForm(false);
        setEditando(null);
        // Recarregar lista
        carregarUsuarios();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso n\u00e3o autorizado. Faça login novamente.");
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
  function handleEditar(usuario) {
    setEditando(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setDataNascimento(usuario.dataNascimento?.slice(0, 10) || "");
    setPerfilId(usuario.perfil.id);
    setShowForm(true);
  }

  // Remover usuário
  async function handleRemover(id) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        carregarUsuarios();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso n\u00e3o autorizado. Faça login novamente.");
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
    setPerfilId(0);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", height: "100vh" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        
      }}>
        <h1>👥 Usuários</h1>
        {!showForm && (
          <Button onClick={handleNovo} style={{ background: "#28a745" }}>
            ➕ Novo Usuário
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
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>
                Perfil *
              </label>
              <select
                value={perfilId}
                onChange={e => setPerfilId(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
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
          ) : usuarios.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Nenhum usuário cadastrado</p>
              <Button onClick={handleNovo} style={{ background: "#28a745" }}>
                ➕ Cadastrar primeiro usuário
              </Button>
            </div>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "16px"
            }}>
              {usuarios.map(usuario => (
                <Card key={usuario.id}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-start",
                    marginBottom: "16px"
                  }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{usuario.nome}</h3>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>📧 Email:</strong> {usuario.email}
                      </p>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>👤 Perfil:</strong> {usuario.perfil?.nome}
                      </p>
                    </div>
                    <span style={{ 
                      background: usuario.ativo ? "green" : "red", 
                      color: "white", 
                      padding: "4px 8px", 
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}>
                      {usuario.ativo ? "✅ Ativo" : "❌ Inativo"}
                    </span>
                  </div>
                  <div style={{ 
                    display: "flex", 
                    gap: "8px",
                    borderTop: "1px solid #eee",
                    paddingTop: "12px"
                  }}>
                    <Button 
                      onClick={() => handleEditar(usuario)}
                      style={{ background: "#0070f3", flex: 1 }}
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      onClick={() => handleRemover(usuario.id)}
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