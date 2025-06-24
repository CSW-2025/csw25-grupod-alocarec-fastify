"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getToken } from "@/helpers/auth";

export default function PrediosForm() {
  const [predios, setPredios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [rua, setRua] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [editando, setEditando] = useState<any | null>(null);

  async function carregarPredios() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch("http://localhost:3000/predios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setPredios(data);
      } else {
        setError("Erro ao carregar prédios");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPredios();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      const url = editando
        ? `http://localhost:3000/predios/${editando.id}`
        : "http://localhost:3000/predios";
      const method = editando ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          numero,
          nome,
          descricao,
          rua,
          numero_endereco: numeroEndereco,
          complemento,
          bairro,
          cidade,
          uf,
          cep,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        limparForm();
        setShowForm(false);
        setEditando(null);
        carregarPredios();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError(data.message || "Erro ao salvar prédio");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  function handleEditar(predio: any) {
    setEditando(predio);
    setNumero(predio.numero);
    setNome(predio.nome);
    setDescricao(predio.descricao || "");
    setRua(predio.rua);
    setNumeroEndereco(predio.numero_endereco);
    setComplemento(predio.complemento || "");
    setBairro(predio.bairro);
    setCidade(predio.cidade);
    setUf(predio.uf);
    setCep(predio.cep);
    setShowForm(true);
  }

  async function handleRemover(id: number) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:3000/predios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        carregarPredios();
      } else if (res.status === 401 || res.status === 403) {
        setError("Acesso não autorizado. Faça login novamente.");
      } else {
        setError("Erro ao remover prédio");
      }
    } catch (err) {
      setError("Erro de conexão");
    }
  }

  function limparForm() {
    setNumero("");
    setNome("");
    setDescricao("");
    setRua("");
    setNumeroEndereco("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setUf("");
    setCep("");
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
        <h1>🏢 Prédios</h1>
        {!showForm && (
          <Button onClick={handleNovo} style={{ background: "#28a745" }}>
            ➕ Novo Prédio
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
          <h2>{editando ? "✏️ Editar Prédio" : "➕ Novo Prédio"}</h2>
          <form onSubmit={handleSubmit}>
            <Input label="Número" value={numero} onChange={e => setNumero(e.target.value)} required />
            <Input label="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
            <Input label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <Input label="Rua" value={rua} onChange={e => setRua(e.target.value)} required />
            <Input label="Número Endereço" value={numeroEndereco} onChange={e => setNumeroEndereco(e.target.value)} required />
            <Input label="Complemento" value={complemento} onChange={e => setComplemento(e.target.value)} />
            <Input label="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} required />
            <Input label="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} required />
            <Input label="UF" value={uf} onChange={e => setUf(e.target.value)} required />
            <Input label="CEP" value={cep} onChange={e => setCep(e.target.value)} required />
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
          ) : predios.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>Nenhum prédio cadastrado</p>
              <Button onClick={handleNovo} style={{ background: "#28a745" }}>
                ➕ Cadastrar primeiro prédio
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
              {predios.map(predio => (
                <Card key={predio.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{predio.nome}</h3>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Número:</strong> {predio.numero}
                      </p>
                      <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                        <strong>Cidade:</strong> {predio.cidade}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #eee", paddingTop: "12px" }}>
                    <Button onClick={() => handleEditar(predio)} style={{ background: "#0070f3", flex: 1 }}>
                      ✏️ Editar
                    </Button>
                    <Button onClick={() => handleRemover(predio.id)} style={{ background: "#dc3545", flex: 1 }}>
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
