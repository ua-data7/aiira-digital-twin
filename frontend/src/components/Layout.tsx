import Head from "next/head";
import { ReactNode } from "react";

import NavBar from "./NavBar";

type LayoutProps = { children?: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>AIIRA Digital Twin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
