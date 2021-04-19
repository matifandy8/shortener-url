import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Url() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("https://www.google.com/");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/img.svg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
