import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";

const CourseInfo = ({
  level,
  name,
  modules,
  miniature,
  id,
}: {
  level: string;
  name: string;
  modules: number;
  miniature: string;
  id: string;
}) => {
  return (
    <a href={`/home/courses/${id}`}>
      <Card
        as={"button"}
        className="py-0 px-0 min-w-40 max-w-44 md:max-w-xs h-full  gap-0 shadow-lg shadow-blue-500/50 hover:-translate-y-5 hover:shadow-blue-500 transition-shadow"
      >
        <CardHeader className="pb-0 pt-0 px-0 flex-col items-star w-full">
          <Image
            alt="Course Miniature"
            className="object-cover rounded-none"
            src={miniature}
            width="auto"
          />
        </CardHeader>
        <CardBody className="overflow-visible p-2 md:px-4 w-full text-pretty">
          <small className="text-default-500">{level}</small>
          <span className="font-semibold text-xs md:text-sm w-full">
            {name}
          </span>
        </CardBody>
        <CardFooter className="flex flex-row justify-between p-2 md:p-4">
          <small className="text-default-500">{modules} Módulos</small>
        </CardFooter>
      </Card>
    </a>
  );
};

export default CourseInfo;
