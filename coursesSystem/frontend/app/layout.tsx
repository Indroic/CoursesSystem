import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Image from "next/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={clsx(
          "p-0 m-0 relative min-w-screen min-h-screen flex flex-row justify-end bg-gradient-to-r from-zinc-900 from-30% to-blue-950 font-sans ",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <section className="gap-8 absolute left-0 text-white text-6xl font-extrabold px-10 py-20 min-h-screen max-h-screen">
            <p className=" max-w-[100dvh]">
              “ No te enfoques en los errores que tengas al aprender, deja atrás
              el pasado y camina hacia el futuro ”
            </p>
            <section className="relative grid grid-cols-3 gap-4 my-10">
              <Image alt="svelte" height={150} src="/svelte.svg" width={150} />
              <Image alt="css" height={160} src="/css.svg" width={160} />
              <Image
                alt="angular"
                height={200}
                src="/angular.svg"
                width={200}
              />
            </section>
          </section>
          <div className=" justify-between relative flex flex-col overflow-visible w-  min-w-80 md:min-w-[65dvh] min-h-screen">
            <div className="wave left-0 ml-[-8dvh]" />
            <main className="container  h-screen bg-white absolute z-1 pt-16 px-6 flex flext-col items-center justify-center">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
