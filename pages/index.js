import Head from "next/head";
import Main from "@/components/Main/Main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Developed By - Ishan Sachdeva" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Main />
      </div>
    </>
  );
}
