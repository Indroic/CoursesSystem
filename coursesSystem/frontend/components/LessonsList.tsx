"use client";

import { useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";

import LessonInfo from "./LessonInfo";

import useLessons from "@/store/lessons";

export default function LessonsList({
  getModuleLessons,
  DropDown,
  href,
  accessToken,
  userID,
}: {
  accessToken: string;
  getModuleLessons?: string;
  startElement?: React.ReactElement;
  DropDown?: boolean;
  href?: boolean;
  userID?: string;
}) {
  const { lessons, getLessons } = useLessons();

  useEffect(() => {
    getLessons(getModuleLessons);
  }, [getModuleLessons]);

  return (
    <ScrollShadow hideScrollBar className="p-4 max-h-[60dvh]">
      <ul className="grid grid-cols-2 md:grid-cols-3 w-full items-center md:justify-between justify-between gap-5 top-10">
        {lessons.map((lesson) => (
          <li key={lesson.id} id={lesson.id}>
            <LessonInfo
              key={lesson.id}
              accessToken={accessToken}
              lesson={lesson}
            />
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
}
