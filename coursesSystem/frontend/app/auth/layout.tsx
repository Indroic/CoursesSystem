import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-end justify-end">
      <section className="h-[100dvh] invisible md:visible gap-8 absolute left-0 text-white text-6xl font-extrabold px-10 py-20">
        <p className=" max-w-[100dvh]">
          “ No te enfoques en los errores que tengas al aprender, deja atrás el
          pasado y camina hacia el futuro ”
        </p>
        <section className="relative grid grid-cols-3 gap-4 my-10">
          <Image alt="svelte" height={150} src="/svelte.svg" width={150} />
          <Image alt="css" height={160} src="/css.svg" width={160} />
          <Image alt="angular" height={200} src="/angular.svg" width={200} />
        </section>
      </section>
      <div className=" justify-between relative flex flex-col overflow-visible w-  min-w-80 md:min-w-[65dvh] min-h-screen">
        <div className="wave left-0 ml-[-8dvh]" />
        <main className="container  h-screen bg-white absolute z-1 pt-16 px-6 flex flext-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
