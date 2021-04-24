import React from "react";
import styles from "../styles/FullPage.module.css";
import Ads from "../public/ads.jpg";
import Image from "next/image";

export default function fullPageAds() {
  return (
    <div className={styles.fpcontainer}>
      <Image
        height="800px"
        width="1400px"
        src={Ads}
        className={styles.fploader}
        alt="ads"
      />
    </div>
  );
}
