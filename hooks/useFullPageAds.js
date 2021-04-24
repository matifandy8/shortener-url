import React, { useState } from "react";
import FullPageAds from "../components/fullPageAds";

export default function UseFullPageAds() {
  const [loading, setLoading] = useState(false);

  return [
    loading ? <FullPageAds /> : null,
    () => setLoading(true), //show loader
    () => setLoading(false), //Hide Loader
  ];
}
