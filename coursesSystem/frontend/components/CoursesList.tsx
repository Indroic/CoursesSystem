"use client";

import { useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";

import CourseInfo from "./CourseInfo";
import useCourses from "@/store/courses";
import DropDownCourse from "./DropDownCourse";

export default function CoursesList({
  getUserCourses,
  startElement,
  DropDown,
  href,
  accessToken,
  userID
}: {
  accessToken: string;
  getUserCourses?: string;
  startElement?: React.ReactElement;
  DropDown?: boolean;
  href?: boolean;
  userID?: string;
}) {
  const { courses, getCourses } = useCourses();

  useEffect(() => {
    getCourses(getUserCourses);
  }, [getCourses]);

  return (
    <ScrollShadow hideScrollBar className="p-4 max-h-[60dvh]">
      <ul className="grid grid-cols-2 md:grid-cols-4 w-[90dvw] items-center md:justify-between justify-between gap-5 top-10">
        {startElement}
        {courses.map((course) => (
          <li key={course.id} id={course.id}>
            {href ? (
              <a href={`/home/courses/${course.id}`}>
                <CourseInfo
                  key={course.id}
                  id={course.id}
                  level={course.level}
                  miniature={course.miniature}
                  modules={course.num_modules}
                  name={course.name}
                  DropDown={
                    DropDown ? <DropDownCourse course={course} accessToken={accessToken}  /> : null
                  }
                />
              </a>
            ) : (
              <CourseInfo
                key={course.id}
                id={course.id}
                level={course.level}
                miniature={course.miniature}
                modules={course.num_modules}
                name={course.name}
                DropDown={DropDown ? <DropDownCourse course={course} accessToken={accessToken} /> : null}
              />
            )}
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
}
