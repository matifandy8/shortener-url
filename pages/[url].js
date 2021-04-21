import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Router from "next/router";

export default function Url() {
  useEffect(async () => {
    let pathname = location.pathname;
    let appId = pathname.split("/");
    let urlpathname = appId[1];
    let showData = await axios.get("/api/getAllData");
    let arraylength = showData.data.data.length;
    console.log(arraylength);
    for (let i = 0; i < showData.data.data.length; i++) {
      let newshorturl = showData.data.data[i].data.shorturl;
      console.log(newshorturl);
      let originurl = showData.data.data[i].data.ourl;
      console.log(showData.data.data[i].data.ourl);
      if (newshorturl === urlpathname) {
        Router.push(originurl);
      }
    }
    setTimeout(() => {
      Router.push("/");
    }, 5000);
  }, []);

  return (
    <>
      <Image
        src="/ads.jpg"
        alt="Picture of the author"
        width={1000}
        height={1000}
      />
    </>
  );
}
