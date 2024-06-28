interface BaseInterface {
  id: string;
}

interface CourseInterface extends BaseInterface {
  name: string;
  description: string;
  level: string;
  miniature: any;
  num_modules: number;
  created_at: string;
  updated_at: string;
}

interface ModuleInterface extends BaseInterface {
  course: string;
  name: string;
  description: string;
  num_lessons: number;
  created_at: string;
  updated_at: string;
}

interface LessonInterface extends BaseInterface {
  module: string;
  title: string;
  description: string;
  miniature: string;
  video?: any;
  created_at: string;
  updated_at: string;
}

interface ExamInterface extends BaseInterface {
  course: string;
  title: string;
  num_questions: number;
}

interface QuestionInterface extends BaseInterface {
  exam: string;
  question: string;
  num_options: number;
}

interface OptionInterface extends BaseInterface {
  question: string;
  content: string;
  is_correct: boolean;
}

export type {
  CourseInterface,
  ModuleInterface,
  LessonInterface,
  ExamInterface,
  QuestionInterface,
  OptionInterface,
};
