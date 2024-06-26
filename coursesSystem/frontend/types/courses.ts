interface CourseInterface {
  id: string;
  name: string;
  description: string;
  level: string;
  miniature: any;
  num_modules: number;
  created_at: string;
  updated_at: string;
  uploaded_by: string;
}

interface ModuleInterface {
  id: string;
  course: string;
  name: string;
  description: string;
  num_lessons: number;
  created_at: string;
  updated_at: string;
}

interface LessonInterface {
  id: string;
  module: string;
  title: string;
  description: string;
  miniature: string;
  video?: any;
  created_at: string;
  updated_at: string;
}

export type { CourseInterface, ModuleInterface, LessonInterface };
