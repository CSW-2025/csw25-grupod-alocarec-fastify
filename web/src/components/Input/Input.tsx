import React from "react";
import styles from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        {...props}
        className={styles.input + (error ? ' ' + styles.errorInput : '')}
      />
      {error && <div className={styles.errorMsg}>{error}</div>}
    </div>
  );
} 