import React, { useEffect } from "react";
import Router from "next/router";
import UseFullPageAds from "../hooks/useFullPageAds";

export default function Url({ Data, pathurl }) {
  const [loader, showLoader, hideLoader] = UseFullPageAds();

  useEffect(async () => {
    showLoader();
    setTimeout(() => {
      let arraylength = Data.data.length;
      for (let i = 0; i < arraylength; i++) {
        const dbshorturl = Data.data[i].data.shorturl;
        const originurl = Data.data[i].data.ourl;
        if (dbshorturl === pathurl.url) {
          hideLoader();
          Router.push(originurl);
        }
      }
    }, 5000);
    setTimeout(() => {
      Router.push("/");
    }, 10000);
  }, []);

  return <>{loader}</>;
}
export async function getServerSideProps(context) {
  const pathurl = context.params;
  const res = await fetch(`http://localhost:3000/api/getAllData`);
  const Data = await res.json();
  return {
    props: { Data, pathurl },
  };
}
