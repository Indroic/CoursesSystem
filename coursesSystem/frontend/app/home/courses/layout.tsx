export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="w-[90dvw] h-[90dvh] md:mx-5 md:my-0">
        {children}
      </main>
    </div>
  );
}
