import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <span>Carregando...</span>
    </div>
  );
} 