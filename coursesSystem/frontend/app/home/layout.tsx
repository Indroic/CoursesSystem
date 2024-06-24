import { Navbar } from "@/components/Navbar";
export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex flex-1 justify-center items-center w-[100dvw]">
        {children}
      </main>
    </div>
  );
}
