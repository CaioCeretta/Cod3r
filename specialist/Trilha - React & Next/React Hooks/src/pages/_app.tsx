import { TemaProvider } from "@/data/context/TemaProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TemaProvider>
            <Component {...pageProps} />
        </TemaProvider>
    );
}
