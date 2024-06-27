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
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";

import { VerifyRequest, CreateExamRealized, CreateCertificate } from "@/config/axios_auth";

import {
  CourseInterface,
  ExamInterface,
  QuestionInterface,
  OptionInterface,
} from "@/types/courses";
import { useSession } from "next-auth/react";
import { useExams, useQuestions, useOptions } from "@/store/exams";

const RealizarExamenButton = ({ course }: { course: CourseInterface }) => {
  const [examen, setExamen] = useState<ExamInterface>();
  const [data, setData] = useState({
    accessToken: "",
    userID: "",
  });
  const { getExam } = useExams();
  const { getQuestions, questions } = useQuestions();
  const { getOptions, options } = useOptions();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();

  useEffect(() => {
    let examen = getExam(course.id);

    if (examen) {
      setExamen(examen);
      getQuestions(examen.id);
      getOptions(examen.id);
    }
    if (status !== "loading") {
      let verify = VerifyRequest(
        session?.user.name,
        session?.user.accessToken
      ).then((response) => {
        setData({
          accessToken: session?.user.accessToken,
          userID: response.data.user_id,
        });
      });
    }
  }, [getExam, session, status]);

  const createCertificado = async () => {
    let response = await CreateExamRealized(
      user: data.userID,
      exam: examen?.id,

    )

    if (response.status === 201 || response.status === 200) {
      let examenRealizado = response.data

      let response2 = await CreateCertificate(
        user: data.userID,
        examrealized: examenRealizado.id,
        course: course.id
      )

      if (response2.status === 201 || response2.status === 200) {
        console.log("Certificado creado");
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
                    <section key={question.id}>
                      <p>{question.question}</p>
                      <CheckboxGroup>
                        {options?.map((option: OptionInterface) => (
                          <Checkbox key={option.id} value={option.id}>
                            {option.content}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
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
                  <Button color="primary">Realizar</Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <Button color="primary" onClick={() => onOpen()}>
        Realizar Examen
      </Button>
    </>
  );
};
