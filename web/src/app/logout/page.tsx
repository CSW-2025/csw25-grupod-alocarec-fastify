"use client";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  }, []);

  return <p style={{ padding: 20 }}>Saindo...</p>;
}
