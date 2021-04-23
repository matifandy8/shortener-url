import React from "react";
import styles from "../styles/FullPageLoader.module.css";
import Image from "next/image";

import Spinner from "../public/spinner.gif";

export default function FullPageLoader() {
  return (
    <div className={styles.fpcontainer}>
      <img src={Spinner} className={styles.fploader} alt="loading" />
    </div>
  );
}
