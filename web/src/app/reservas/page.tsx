'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserPerfil, getToken } from "@/helpers/auth";
import ReservasView from "@/views/ReservasForm";

export default function ReservasPage() {
  const router = useRouter();
  useEffect(() => {
    const perfil = getUserPerfil();
    const token = getToken();
    if (!token || (perfil !== "Admin" && perfil !== "Coordenador" && perfil !== "Professor")) {
      router.replace("/");
    }
  }, []);
  return <ReservasView />;
}
