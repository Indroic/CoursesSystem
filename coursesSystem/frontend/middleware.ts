export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home/:path", "/home/courses/:path", "/home/courses/my-courses/:path", "/home/courses/modules/:path"],
};
