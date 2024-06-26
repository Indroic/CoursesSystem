import { create } from "zustand";

import { GetLessonsOfModuleRequest } from "@/config/axios_auth";
import { LessonInterface } from "@/types/courses";

interface LessonState {
  lessons: LessonInterface[];
  addLesson: (lesson: any) => void;
  updateLesson: (lesson: any) => void;
  deleteLesson: (lesson: any) => void;
  getLessons: (moduleID: string) => void;
  getLesson: (id: string) => void;
}

const useLessons = create<LessonState>((set) => ({
  lessons: [],
  addLesson: (lesson) =>
    set((state) => ({ ...state, lessons: [...state.lessons, lesson] })),
  updateLesson: (lesson) =>
    set((state) => ({
      ...state,
      lessons: state.lessons.map((l: LessonInterface) =>
        l.id === lesson.id ? lesson : l,
      ),
    })),
  deleteLesson: (lesson) =>
    set((state) => ({
      ...state,
      lessons: state.lessons.filter((l: LessonInterface) => l.id !== lesson.id),
    })),
  getLessons: async (moduleID) => {
    let response = await GetLessonsOfModuleRequest(moduleID);

    if (response.status === 200) {
      let lessons = response.data;

      set((state) => ({ ...state, lessons }));
    } else {
      set((state) => ({ ...state, lessons: [] }));
    }
  },
  getLesson: (id) =>
    set((state) => ({
      ...state,
      lessons: state.lessons.filter((l: LessonInterface) => l.id === id),
    })),
}));

export default useLessons;