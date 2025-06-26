'use client';
import Link from "next/link";
import { getToken, getUserPerfil } from "@/helpers/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function HeaderNav() {
  const [isLogged, setIsLogged] = useState(false);
  const [perfil, setPerfil] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLogged(!!getToken());
    setPerfil(getUserPerfil() || "");
  }, []);

  const handleLogout = useCallback(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLogged(false);
    setPerfil("");
    router.push("/login");
  }, [router]);

  return (
    <header style={{
      backgroundColor: '#E9E9E9',
      boxShadow: '0 2px 12px 0 rgba(31,38,135,0.07)',
      padding: '0',
      marginBottom: 32,
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 32px',
        height: 64
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 20, color: '#23272f', letterSpacing: -1, textDecoration: 'none' }}>SARC</Link>
          {(perfil === "Admin" || perfil === "Coordenador") && (
            <>
              <Link href="/salas" style={{ marginLeft: 8, color: '#23272f', fontWeight: 500 }}>Salas</Link>
              <Link href="/recursos" style={{ marginLeft: 8, color: '#23272f', fontWeight: 500 }}>Recursos</Link>
            </>
          )}
          {(perfil === "Admin" || perfil === "Coordenador" || perfil === "Professor") && (
            <Link href="/reservas" style={{ marginLeft: 8, color: '#23272f', fontWeight: 500 }}>Reservas</Link>
          )}
          {perfil === "Admin" && (
            <>
              <Link href="/usuarios" style={{ marginLeft: 8, color: '#23272f', fontWeight: 500 }}>Usuários</Link>              
            </>
          )}
          {isLogged && perfil && (
            <span style={{ marginLeft: 16, color: "#666", fontSize: 15 }}>[{perfil}]</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isLogged ? (
            <button
              onClick={handleLogout}
              style={{
                marginLeft: 16,
                background: 'linear-gradient(90deg, #007aff 0%, #0051a8 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 22px',
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
                outline: 'none',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #0051a8 0%, #007aff 100%)'}
              onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #007aff 0%, #0051a8 100%)'}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" style={{ marginLeft: 8, color: '#007aff', fontWeight: 500 }}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
} 