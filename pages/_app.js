import TopBar from "@/TopBar";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Todo App</title>
                <meta name="description" content="Todo App to manage your tasks efficiently" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <TopBar />
            <Component {...pageProps} />
        </>
    );
}
