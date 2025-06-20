import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: 10,
        borderRadius: 6,
        border: "1px solid #ccc",
        background: props.disabled ? "#eee" : "#0070f3",
        color: props.disabled ? "#888" : "#fff",
        cursor: props.disabled ? "not-allowed" : "pointer",
        ...((props.style as React.CSSProperties) || {}),
      }}
    >
      {children}
    </button>
  );
} 