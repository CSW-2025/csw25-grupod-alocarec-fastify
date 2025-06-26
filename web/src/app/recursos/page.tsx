'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserPerfil, getToken } from "@/helpers/auth";
import RecursosView from "@/views/RecursosForm";

export default function RecursosPage() {
  const router = useRouter();
  useEffect(() => {
    const perfil = getUserPerfil();
    const token = getToken();
    if (!token || (perfil !== "Admin" && perfil !== "Coordenador")) {
      router.replace("/");
    }
  }, []);
  return <RecursosView />;
}
