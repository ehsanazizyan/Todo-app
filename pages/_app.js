import TopBar from "@/TopBar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <TopBar />
            <Component {...pageProps} />
        </>
    );
}
