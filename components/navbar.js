import Head from "next/head";
import React from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <main className={styles.navbar}>
        <h1>
          <a>Mfitly</a>
        </h1>
      </main>
    </div>
  );
}
