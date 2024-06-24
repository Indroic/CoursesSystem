"use client";

import React, { useState, useEffect } from "react";
import {
  ModuleInterface,
  CourseInterface,
  LessonInterface,
} from "@/types/courses";
import Video from "next-video";
import {
  MenuSelect,
  MenuSelectBody,
  MenuSelectHeader,
  MenuSelectBodyItem,
} from "@/components/MenuSelect";
import {
  GetCourseRequest,
  GetModulesRequest,
  GetModuleRequest,
  GetLessonsOfModuleRequest,
} from "@/config/axios_auth";

export default function Lesson({ params }: { params: { id: string } }) {
  const [module, setModule] = useState<ModuleInterface | null>(null);
  const [course, setCourse] = useState<CourseInterface | null>(null);
  const [lesson, setLesson] = useState<LessonInterface | null>(null);
  const [modulesWithLessons, setModulesWithLessons] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const moduleData = (await GetModuleRequest(params.id)).data;
      const courseData = (await GetCourseRequest(moduleData.course)).data;
      const lessonData = (await GetLessonsOfModuleRequest(moduleData.id)).data;

      setModule(moduleData);
      setCourse(courseData);
      setLesson(lessonData[0]);

      const modulesData = (await GetModulesRequest(courseData.id)).data;
      const modulesWithLessonsData = await Promise.all(
        modulesData.map(async (module: ModuleInterface) => {
          const lessonsData = (await GetLessonsOfModuleRequest(module.id)).data;

          return { module, lessons: lessonsData };
        })
      );

      setModulesWithLessons(modulesWithLessonsData);
    };

    fetchData();
  }, [params.id]);

  return (
    <section className="text-white flex md:flex-row items-between h-full w-full justify-between gap-5">
      <MenuSelect>
        <MenuSelectHeader>
          <span className="font-bold text-2xl">{course?.name}</span>
        </MenuSelectHeader>
        <MenuSelectBody>
          {modulesWithLessons.map((moduleWithLessons) => (
            <MenuSelectBodyItem
              key={moduleWithLessons.module.id}
              title={moduleWithLessons.module.name}
            >
              {moduleWithLessons.lessons.map((lesson: LessonInterface) => (
                <button
                  onClick={() => {
                    setLesson(lesson);
                    setModule(moduleWithLessons.module);
                  }}
                  className="m-0 p-0 text-start justify-start"
                  key={lesson.id}
                >
                  {lesson.title}
                </button>
              ))}
            </MenuSelectBodyItem>
          ))}
        </MenuSelectBody>
      </MenuSelect>
      <section className="w-full flex flex-1 flex-col gap-5 my-10 mx-10">
        <Video
          className="min-w-[80%] max-w-[80%] max-h-[55dvh] rounded-lg"
          src={lesson?.video}
        />
        <div className="flex flex-col max-h-min">
          <span className="font-light text-white text-xl">{module?.name}</span>
          <span className="font-bold text-3xl text-white">{lesson?.title}</span>
        </div>

        <div>
          <span className="font-semibold text-lg text-white">Descripcion</span>
          <p className="text-white text-base font-medium ">
            {course?.description}
          </p>
        </div>
      </section>
    </section>
  );
}
