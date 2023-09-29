import "@/styles/globals.scss";
import { LoadingContextProvider } from "@/context/LoadingContext";
import { Loader } from "@/components/Loader/Loader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <LoadingContextProvider>
        <Loader />
        <Component {...pageProps} />
      </LoadingContextProvider>
    </>
  );
}