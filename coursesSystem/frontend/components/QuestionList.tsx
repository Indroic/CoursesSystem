"use client";

import { useEffect } from "react";

import { useQuestions } from "@/store/exams";
import { QuestionInterface, ExamInterface } from "@/types/courses";
import QuestionInfo from "./QuestionInfo";

const QuestionList = ({
  exam,
  accessToken,
}: {
  exam: ExamInterface;
  accessToken: string;
}) => {
  const { questions, getQuestions } = useQuestions();

  useEffect(() => {
    getQuestions(exam.id);
  }, [exam.id]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {questions.map((question: QuestionInterface) => (
        <QuestionInfo
          key={question.id}
          question={question}
          accessToken={accessToken}
        />
      ))}
    </div>
  );
};

export default QuestionList;