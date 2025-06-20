import React from "react";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return <div style={{ color: "red", marginBottom: 12 }}>{message}</div>;
} 