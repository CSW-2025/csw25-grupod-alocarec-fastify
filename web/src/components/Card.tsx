import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: 600,
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 20,
        marginBottom: 16,
        color: "#000000",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      {children}
    </div>
  );
} 