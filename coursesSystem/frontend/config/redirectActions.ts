"use server";

import { redirect } from "next/navigation";

const redirectlogin = async () => {
  return await redirect("/courses");
};

const redirectCourses = async () => {
  return await redirect("/courses");
};

export { redirectlogin, redirectCourses };
