import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: 8,
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: 4,
          ...((props.style as React.CSSProperties) || {}),
        }}
      />
      {error && <div style={{ color: "red", marginTop: 4 }}>{error}</div>}
    </div>
  );
} 