import { create } from "zustand";

import { GetCoursesRequest } from "@/config/axios_auth";
import { CourseInterface } from "@/types/courses";

interface CourseState {
  courses: CourseInterface[];
  addCourse: (course: any) => void;
  updateCourse: (course: any) => void;
  deleteCourse: (course: any) => void;
  getCourses: (getUserCourses: string) => void;
  getCourse: (id: string) => void;
}

const useCourses = create<CourseState>((set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({ ...state, courses: [...state.courses, course] })),
  updateCourse: (course) =>
    set((state) => ({
      ...state,
      courses: state.courses.map((c: CourseInterface) =>
        c.id === course.id ? course : c,
      ),
    })),
  deleteCourse: (course) =>
    set((state) => ({
      ...state,
      courses: state.courses.filter((c: CourseInterface) => c.id !== course.id),
    })),
  getCourses: async (getUserCourses) => {
    let response = await GetCoursesRequest(getUserCourses);

    if (response.status === 200) {
      let courses = response.data;

      set((state) => ({ ...state, courses }));
    } else {
      set((state) => ({ ...state, courses: [] }));
    }
  },
  getCourse: (id) =>
    set((state) => ({
      ...state,
      courses: state.courses.filter((c: CourseInterface) => c.id === id),
    })),
}));

export default useCourses;
