import "react-notion/src/styles.css";
import React from "react";

export default function App({ Component, pageProps, router }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
