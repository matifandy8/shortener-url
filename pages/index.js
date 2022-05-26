import Head from "next/head";
import React, { useState } from "react";
import Axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchurls } from "../store/actions/urlAction";
import UseFullPageLoader from "../hooks/useFullPageLoader";

export default function Home({ theshorturl, theoriginurl }) {
  const [url, setUrl] = useState("");
  const [shorturl, setshortUrl] = useState("");
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const home =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : "shortenerurl.vercel.app";
  const [loader, showLoader, hideLoader] = UseFullPageLoader();
  // -------redux---------------
  const dispatch = useDispatch();
  const allurls = useSelector((state) => state.allurl);
  const { urls } = allurls;
  const fetchAllUrls = () => {
    dispatch(fetchurls());
  };

  // --------------------------
  function isValidURL(string) {
    let res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  const getShortUrl = async () => {
    showLoader();
    if (!isValidURL(url)) {
      setErrorMessage("Please enter a valid url");
      hideLoader();
      return;
    }

    setLoad(true);
    await Axios.post("/api/createUrl", {
      url: url,
    })
      .then((res) => {
        setshortUrl(`${home}/${res.data}`);
        hideLoader();
        setLoad(false);
        Cookies.set("shorturl", res.data, { expires: 1 / 24 });
        Cookies.set("originurl", url, { expires: 1 / 24 });
        setErrorMessage("");
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
              placeholder="Enter your Url"
              onChange={(e) => setUrl(e.target.value)}
            />
            {errorMessage && <div className="error"> {errorMessage} </div>}
            <button onClick={getShortUrl}>
              {" "}
              {load ? "Loading" : "Shorten"}
            </button>
          </div>
          <div className={styles.urlsList}>
            {shorturl.length > 0 ? (
              <p className="shorturl">{shorturl}</p>
            ) : null}
            {theoriginurl ? (
              <p>
                Origin Url:<a href={theoriginurl}>{theoriginurl}</a>
                <br />
                <br />
                Short Url:
                <a>
                  {home}/{theshorturl}
                </a>
              </p>
            ) : null}
            <button onClick={fetchAllUrls}>All Urls</button>
            <div className={styles.allUrlsList}>
              {urls &&
                urls.map((url, index) => (
                  <p key={index}>
                    {url.data.ourl}
                    <br />
                    <br />
                    {home}/{url.data.shorturl}
                  </p>
                ))}
            </div>
          </div>
        </main>
      </div>
      {loader}
    </>
  );
}

export function getServerSideProps({ req, res }) {
  return {
    props: {
      theshorturl: req.cookies.shorturl || "",
      theoriginurl: req.cookies.originurl || "",
    },
  };
}
