"use client";

import { useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";

import ModuleInfo from "./ModuleInfo";
import AddModule from "./AddModule";

import useModules from "@/store/modules";
import { CourseInterface } from "@/types/courses";

export default function ModulesList({
  course,
  accessToken,
  onOpenParentChange,
}: {
  course: CourseInterface;
  accessToken: string;
  onOpenParentChange: () => void;
}) {
  const { modules, getModules } = useModules();

  useEffect(() => {
    getModules(course.id);
  }, [getModules]);

  return (
    <ScrollShadow hideScrollBar className="p-4">
      <ul className="grid grid-cols-2 md:grid-cols-3 items-center md:justify-between justify-between gap-5 top-10">
        <AddModule accessToken={accessToken} course={course} />
        {modules.map((module) => (
          <li key={module.id} id={module.id}>
            <ModuleInfo
              key={module.id}
              accessToken={accessToken}
              module={module}
              onOpenParentChange={onOpenParentChange}
            />
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
}
