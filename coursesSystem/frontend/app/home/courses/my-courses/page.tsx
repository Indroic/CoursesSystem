"use client";

import { Divider } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import CoursesList from "@/components/CoursesList";
import AddCourse from "@/components/AddCourse";
import { VerifyRequest } from "@/config/axios_auth";

export default function MyCourses() {
  const [courses, setCourses] = useState<React.ReactElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      const response = VerifyRequest(
        session?.user?.name,
        session?.user?.accessToken,
      ).then((response) => {
        setCourses(
          <CoursesList
            DropDown
            accessToken={session?.user.accessToken}
            getUserCourses={session?.user?.name}
            startElement={
              <AddCourse
                accessToken={session?.user.accessToken}
                userID={response.data.user_id}
              />
            }
          />,
        );
      });
    }
  }, [session?.user?.name]);

  return (
    <section className="flex flex-1 flex-col mx-10 items-center justify-center">
      <h1 className="text-5xl font-extrabold text-white py-4">Mis Cursos</h1>
      <Divider className="my-5 bg-white" />
      <div>{courses}</div>
    </section>
  );
}
