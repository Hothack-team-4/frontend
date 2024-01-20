import { type AppProps } from "next/app";

import { DBWrapper } from "@/API/DBContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "../app/globals.css";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <DBWrapper>
      <ToastContainer />
      <Component {...pageProps} />
    </DBWrapper>
  );
}
