import { Divider } from "@nextui-org/react";

import CoursesList from "@/components/CoursesList";

export default function Home() {
  return (
    <section className="flex flex-1 flex-col mx-10 items-center justify-center">
      <h1 className="text-5xl font-extrabold text-white py-4">Cursos</h1>
      <Divider className="my-5 bg-white" />
      <div>
        <CoursesList href accessToken="" />
      </div>
    </section>
  );
}
