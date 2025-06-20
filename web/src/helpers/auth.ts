import { jwtDecode } from "jwt-decode";

export function getToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token) as any;
  } catch {
    return null;
  }
}

export function getUserId() {
  const user = getUserFromToken();
  return user?.id;
}

export function getUserPerfil() {
  const user = getUserFromToken();
  return user?.perfil?.nome;
}
