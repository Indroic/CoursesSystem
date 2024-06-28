"use server";

import { redirect } from "next/navigation";

const redirectlogin = async () => {
  return await redirect("/auth/login");
};

const redirectCourses = async () => {
  return await redirect("/home");
};

const redirectCourseInfo = async (id: string) => {
  return await redirect(`/home/courses/${id}`);
};

export { redirectlogin, redirectCourses, redirectCourseInfo };
