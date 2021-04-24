import React from "react";
import styles from "../styles/FullPage.module.css";

import Spinner from "../public/spinner.gif";

export default function FullPageLoader() {
  return (
    <div className={styles.fpcontainer}>
      <img src={Spinner} className={styles.fploader} alt="loading" />
    </div>
  );
}
