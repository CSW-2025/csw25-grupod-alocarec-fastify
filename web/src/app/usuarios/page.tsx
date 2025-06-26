'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserPerfil, getToken } from "@/helpers/auth";
import UsuariosView from "@/views/UsuariosForm";

export default function UsuariosPage() {
  const router = useRouter();
  useEffect(() => {
    const perfil = getUserPerfil();
    const token = getToken();
    if (!token || perfil !== "Admin") {
      router.replace("/");
    }
  }, []);
  return <UsuariosView />;
} 
