'use client'
import { useEffect, useState } from "react";
import styles from "./ReservaTableView.module.css";
import { API_URL } from "@/helpers/api";
import { getToken, getUserFromToken } from "@/helpers/auth";

export default function ReservaTableView() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [salas, setSalas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nomeUser, setNomeUser] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = getToken();
        const [resReservas, resUsuarios, resSalas] = await Promise.all([
          fetch(`${API_URL}/reservas`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/usuarios`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/salas`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        const [dataReservas, dataUsuarios, dataSalas] = await Promise.all([
          resReservas.json(),
          resUsuarios.json(),
          resSalas.json()
        ]);
        setReservas(dataReservas);
        setUsuarios(dataUsuarios);
        setSalas(dataSalas);
      } catch (err) {
        setError("Erro ao carregar reservas");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // Pega nome do usuário logado
    const user = getUserFromToken();
    setNomeUser(user?.nome || "");
  }, []);

  function nomeUsuario(id: number) {
    return usuarios.find((u) => u.id === id)?.nome || id;
  }
  function nomeSala(id: number) {
    return salas.find((s) => s.id === id)?.nome || id;
  }

  return (
    <div className={styles.mainWrapper}>
      {nomeUser && (
        <div style={{ fontSize: 30, fontWeight: 600, color: 'white', marginBottom: 24, textAlign: 'center' }}>
          Olá, {nomeUser}!
        </div>
      )}
      <div className={styles.tableContainer}>
        <h1 className={styles.title}>Reservas Recentes</h1>
        <div className={styles.instruction}>
          Veja abaixo todas as reservas feitas no sistema!
        </div>
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.reservaTable}>
              <thead>
                <tr>
                  <th>Sala</th>
                  <th>Usuário</th>
                  <th>Data e Hora</th>
                </tr>
              </thead>
              <tbody>
                {reservas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className={styles.empty}>Nenhuma reserva encontrada</td>
                  </tr>
                ) : (
                  reservas.map((reserva) => (
                    <tr key={reserva.id} className={styles.row}>
                      <td>{nomeSala(reserva.salaId)}</td>
                      <td>{nomeUsuario(reserva.usuarioId)}</td>
                      <td>{new Date(reserva.dataHora).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 