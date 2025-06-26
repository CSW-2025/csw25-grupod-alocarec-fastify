import React from "react";
import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return <div className={styles.error}>{message}</div>;
} 