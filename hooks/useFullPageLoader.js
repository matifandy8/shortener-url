import React, { useState } from "react";
import FullPageLoader from "../components/fullPageLoader";

export default function UseFullPageLoader() {
  const [loading, setLoading] = useState(false);

  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true), //show loader
    () => setLoading(false), //Hide Loader
  ];
}
