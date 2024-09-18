import React from 'react';
import '../styles/globals.css'; // Make sure this file exists and contains Tailwind directives

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;