import { type AppProps } from "next/app";

import { DBWrapper } from "@/API/DBContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <DBWrapper>
      <Component {...pageProps} />
    </DBWrapper>
  );
}
