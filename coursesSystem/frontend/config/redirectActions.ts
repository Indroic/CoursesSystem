"use server";

import { redirect } from "next/navigation";

const redirectlogin = async () => {
  return await redirect("/login");
};

export { redirectlogin };
