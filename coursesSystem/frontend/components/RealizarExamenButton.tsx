"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

import {
  VerifyRequest,
  CreateExamRealized,
  CreateCertificate,
} from "@/config/axios_auth";
import {
  CourseInterface,
  ExamInterface,
  QuestionInterface,
} from "@/types/courses";
import { useExams, useQuestions, useOptions } from "@/store/exams";
import OptionsList from "./OptionsList";

const RealizarExamenButton = ({ course }: { course: CourseInterface }) => {
  const [examen, setExamen] = useState<ExamInterface>();
  const [data, setData] = useState({
    accessToken: "",
    userID: "",
  });
  const { getExam } = useExams();
  const { getQuestions, questions } = useQuestions();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      let examen = await getExam(course.id);

      if (examen) {
        setExamen(examen);
        getQuestions(examen.id);
      }

      if (status !== "loading") {
        let verify = await VerifyRequest(
          session?.user.name,
          session?.user.accessToken
        );

        if (verify.status === 200) {
          setData({
            accessToken: session?.user.accessToken,
            userID: verify.data.user_id,
          });
        }
      }
    };

    fetchData();
  }, [getExam, session, status]);

  const createCertificado = async () => {
    let response = await CreateExamRealized({
      exam: examen?.id,
      user: data.userID,
    });

    if (response.status === 201 || response.status === 200) {
      let examenRealizado = response.data;

      let response2 = await CreateCertificate({
        user: data.userID,
        examrealized: examenRealizado.id,
        course: course.id,
      });

      if (response2.status === 201 || response2.status === 200) {
        window.location.href = response2.data.pdf;
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  <span>Examen: {examen?.title}</span>
                </ModalHeader>
                <ModalBody>
                  {questions?.map((question: QuestionInterface) => (
                    <section key={question.id} className="flex flex-col gap-2">
                      <p className="flex flex-col font-bold">{question.question}</p>
                      <div className="ml-2 flex flex-col gap-2 ">
                        <OptionsList question={question} />
                      </div>
                    </section>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="bordered"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button color="primary" onClick={() => createCertificado()}>
                    Realizar
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <Button color="primary" className="max-w-min" onClick={() => onOpen()}>
        Realizar Examen
      </Button>
    </>
  );
};

export default RealizarExamenButton;
