import React from "react";

import { RiArrowDownSLine } from "@remixicon/react";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { LessonInterface } from "@/types/courses";
import { DeleteLesson } from "@/config/axios_auth";

const LessonInfo = ({
  lesson,
  accessToken,
}: {
  lesson: LessonInterface;
  accessToken: string;
}) => {
  return (
    <Card
      as={"div"}
      className="relative py-0 px-0 min-w-40 max-w-44 md:max-w-xs h-full min-h-36  gap-0 shadow-lg shadow-blue-500/50 hover:-translate-y-5 hover:shadow-blue-500 transition-shadow"
    >
      <CardHeader className="relative pb-0 pt-0 px-0 flex-col items-star w-full">
        <Image
          alt="Course Miniature"
          className="object-cover rounded-none"
          src={lesson.miniature}
          width="auto"
        />
        <Dropdown className="absolute top-0 right-0 z-10">
          <DropdownTrigger>
            <Button className="bg-transparent">
              <RiArrowDownSLine />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              color="danger"
              onClick={() => DeleteLesson(lesson.id, accessToken)}
            >
              Eliminar Lección
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="overflow-visible p-2 md:px-4 w-full text-pretty">
        <span className="font-semibold text-xs md:text-sm w-full">
          {lesson.title}
        </span>
      </CardBody>
      <CardFooter className="flex flex-row justify-between p-2 md:p-4"></CardFooter>
    </Card>
  );
};

export default LessonInfo;
