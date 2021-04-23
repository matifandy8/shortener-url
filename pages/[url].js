import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Router from "next/router";

export default function Url() {
  useEffect(async () => {
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
          Router.push(originurl);
        }
      }
    }, 5000);
    setTimeout(() => {
      Router.push("/");
    }, 10000);
  }, []);

  return (
    <>
      <Image
        src="/ads.jpg"
        alt="Picture of the author"
        width={1400}
        height={1000}
      />
    </>
  );
}
