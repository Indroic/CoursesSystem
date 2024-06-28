"use client";

import { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";

import {
  MenuSelect,
  MenuSelectBody,
  MenuSelectHeader,
} from "@/components/MenuSelect";
import { GetCourseRequest, GetModulesRequest } from "@/config/axios_auth";
import { CourseInterface, ModuleInterface } from "@/types/courses";
import RealizarExamenButton from "@/components/RealizarExamenButton";

const Course = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<CourseInterface>({} as CourseInterface);
  const [modules, setModules] = useState<ModuleInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = (await GetCourseRequest(params.id)).data;
      const modulesData = (await GetModulesRequest(courseData.id)).data;

      setCourse(courseData);
      setModules(modulesData);
    };

    fetchData();
  }, []);

  return (
    <section className="text-white flex md:flex-row items-between h-full w-full justify-between gap-5">
      <MenuSelect>
        <MenuSelectHeader>
          <span>Módulos</span>
        </MenuSelectHeader>
        <MenuSelectBody>
          {modules.map((module: ModuleInterface) => (
            <a key={module.id} href={`/home/courses/modules/${module.id}`}>
              {module.name}
            </a>
          ))}
        </MenuSelectBody>
      </MenuSelect>
      <section className="w-full grid grid-cols-1 my-10 mx-10">
        <div className="flex flex-1 justify-between max-h-min">
          <section className="flex flex-col">
            <span className="font-bold text-3xl text-white">{course.name}</span>
            <span className="font-light text-white text-xl">
              {course.level}
            </span>
          </section>
          <RealizarExamenButton course={course} />
        </div>

        <Image
          alt="Course Miniature"
          className="w-[90dvw] max-h-[60dvh]"
          height={"auto"}
          src={course.miniature}
        />

        <div>
          <span className="font-semibold text-lg text-white">Descripcion</span>
          <p className="text-white text-base font-medium ">
            {course.description}
          </p>
        </div>
      </section>
    </section>
  );
};

export default Course;
