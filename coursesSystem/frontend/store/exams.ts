import { create } from "zustand";

import {
  GetExamsOfCourseRequest,
  GetQuestionsOfExamRequest,
  GetOptionsOfQuestionRequest,
} from "@/config/axios_auth";
import {
  ExamInterface,
  QuestionInterface,
  OptionInterface,
} from "@/types/courses";

interface ExamState {
  exams: ExamInterface[];
  getExams: (courseID: string) => void;
  getExam: (id: string) => Promise<ExamInterface>;
  addExam: (exam: ExamInterface) => void;
  updateExam: (exam: ExamInterface) => void;
  deleteExam: (exam: ExamInterface) => void;
}

interface QuestionState {
  questions: QuestionInterface[];
  getQuestions: (examID: string) => void;
  getQuestion: (id: string) => void;
  addQuestion: (question: QuestionInterface) => void;
  updateQuestion: (question: QuestionInterface) => void;
  deleteQuestion: (question: QuestionInterface) => void;
}

interface OptionState {
  options: OptionInterface[];
  getOptions: (questionID: string) => void;
  getOption: (id: string) => void;
  addOption: (option: OptionInterface) => void;
  updateOption: (option: OptionInterface) => void;
  deleteOption: (option: OptionInterface) => void;
}

const useExams = create<ExamState>((set) => ({
  exams: [],
  addExam: (exam) =>
    set((state) => ({ ...state, exams: [...state.exams, exam] })),
  updateExam: (exam) =>
    set((state) => ({
      ...state,
      exams: state.exams.map((e: ExamInterface) =>
        e.id === exam.id ? exam : e
      ),
    })),
  deleteExam: (exam) =>
    set((state) => ({
      ...state,
      exams: state.exams.filter((e: ExamInterface) => e.id !== exam.id),
    })),
  getExams: async (courseID) => {
    let response = await GetExamsOfCourseRequest(courseID);

    if (response.status === 200) {
      let exams = response.data;

      set((state) => ({ ...state, exams }));
    } else {
      set((state) => ({ ...state, exams: [] }));
    }
  },
  getExam: async (id) => {
    const response = await GetExamsOfCourseRequest(id);
    const examen: ExamInterface = response.data[0];

    return examen;
  },
}));
// Questions store
const useQuestions = create<QuestionState>((set) => ({
  questions: [],
  addQuestion: (question) =>
    set((state) => ({ ...state, questions: [...state.questions, question] })),
  updateQuestion: (question) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q: QuestionInterface) =>
        q.id === question.id ? question : q
      ),
    })),
  deleteQuestion: (question) =>
    set((state) => ({
      ...state,
      questions: state.questions.filter(
        (q: QuestionInterface) => q.id !== question.id
      ),
    })),
  getQuestions: async (examID) => {
    let response = await GetQuestionsOfExamRequest(examID);

    if (response.status === 200) {
      let questions = response.data;

      set((state) => ({ ...state, questions }));
    } else {
      set((state) => ({ ...state, questions: [] }));
    }
  },
  getQuestion: (id) =>
    set((state) => ({
      ...state,
      questions: state.questions.filter((q: QuestionInterface) => q.id === id),
    })),
}));

// Options store
const useOptions = create<OptionState>((set) => ({
  options: [],
  addOption: (option) =>
    set((state) => ({ ...state, options: [...state.options, option] })),
  updateOption: (option) =>
    set((state) => ({
      ...state,
      options: state.options.map((o: OptionInterface) =>
        o.id === option.id ? option : o
      ),
    })),
  deleteOption: (option) =>
    set((state) => ({
      ...state,
      options: state.options.filter((o: OptionInterface) => o.id !== option.id),
    })),
  getOptions: async (questionID) => {
    let response = await GetOptionsOfQuestionRequest(questionID);

    if (response.status === 200) {
      let options = response.data;

      set((state) => ({ ...state, options }));
    } else {
      set((state) => ({ ...state, options: [] }));
    }
  },
  getOption: (id) =>
    set((state) => ({
      ...state,
      options: state.options.filter((o: OptionInterface) => o.id === id),
    })),
}));

export { useExams, useQuestions, useOptions };
