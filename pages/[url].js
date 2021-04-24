import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import UseFullPageAds from "../hooks/useFullPageAds";

export default function Url() {
  const [loader, showLoader, hideLoader] = UseFullPageAds();

  useEffect(async () => {
    showLoader();
    let pathname = location.pathname.split("/");
    let urlpathname = pathname[1];
    // ---- get data for api
    let showData = await axios.get("/api/getAllData");
    setTimeout(() => {
      let arraylength = showData.data.data.length;
      for (let i = 0; i < arraylength; i++) {
        let newshorturl = showData.data.data[i].data.shorturl;
        let originurl = showData.data.data[i].data.ourl;
        if (newshorturl === urlpathname) {
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
