import Head from "next/head";
import React, { useState } from "react";
import Axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shorturl, setshortUrl] = useState("");
  const [originUrl, setOriginUrl] = useState("");

  const [load, setLoad] = useState(false);
  const home =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : "pagina.vercel.app";

  const getShortUrl = async () => {
    setLoad(true);
    await Axios.post("/api/createUrl", {
      url: url,
    })
      .then((res) => {
        setshortUrl(`${home}/${res.data}`);
        setLoad(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>Shortener Url</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Image
            className={styles.image}
            src="/img.svg"
            width="200px"
            height="200px"
          />
          <h1 className={styles.title}>Shorten any Url</h1>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Enter or Paste your Url"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={getShortUrl}>
              {" "}
              {load ? "Loading" : "Shorten"}
            </button>
          </div>
          {shorturl.length > 0 ? <p className="shorturl">{shorturl}</p> : null}
        </main>
      </div>
    </>
  );
}
