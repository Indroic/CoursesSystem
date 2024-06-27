"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { RiArrowDownSLine, RiGalleryUploadFill } from "@remixicon/react";
import { useDropzone } from "react-dropzone";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Textarea,
  Select,
  SelectItem,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";

import { useSession } from "next-auth/react";

import {
  CourseInterface,
  ExamInterface,
  QuestionInterface,
} from "@/types/courses";
import useUpdateCourseForm from "@/hooks/UpdateCourseFormHook";

import { DeleteCourse, CreateExam, CreateQuestion } from "@/config/axios_auth";
import ModulesList from "./ModulesList";

import useCourses from "@/store/courses";
import QuestionList from "./QuestionList";
import { useExams, useQuestions } from "@/store/exams";

export default function DropdownCourse({
  course,
  accessToken,
  userID,
}: {
  course: CourseInterface;
  accessToken: string;
  userID: string;
}) {
  const [selected, setSelected] = React.useState("Editar_Curso");
  const { addQuestion } = useQuestions();
  const { getExams, exams } = useExams();
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [useDeleteButton, setDeleteButton] = useState<React.ReactElement>(
    <></>
  );
  const {
    formData,
    errorMessages,
    isInvalid,
    setFormData,
    setErrorMesages,
    setIsInvalid,
    handleSubmit,
    handleChange,
  } = useUpdateCourseForm({ accessToken: accessToken, course });
  const { deleteCourse } = useCourses();
  const onDrop = useCallback((acceptedFiles: any) => {}, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpeg"],
      },
      maxFiles: 1,
    });

  useEffect(() => {
    if (status !== "loading") {
      setDeleteButton(
        <DropdownItem
          color="danger"
          onClick={() => {
            DeleteCourse(course.id, accessToken);
            deleteCourse(course);
          }}
        >
          {" "}
          Eliminar Curso{" "}
        </DropdownItem>
      );
    }

    getExams(course.id);
  }, [status, course, session?.user.accessToken]);

  const levels = [
    { label: "Básico", value: "Inicial" },
    { label: "Intermedio", value: "Medio" },
    { label: "Avanzado", value: "Avanzado" },
  ];

  const updateCourse = async () => {
    formData.miniature = acceptedFiles[0];
    console.log(formData);
    try {
      const request = await handleSubmit();
      if (!request) {
      }
    } catch (e: any) {
      console.log(e);
      let errors = e.response.data;

      if (errors) {
        Object.keys(errors).forEach((key) => {
          setErrorMesages({ ...errorMessages, [key]: errors[key][0] });
          setIsInvalid({ ...isInvalid, [key]: true });
        });
      }
    }
  };

  const examInitialValues = {
    title: "",
    course: course.id,
  };

  const examFormik = useFormik({
    initialValues: examInitialValues,
    onSubmit: async (values) => {
      const response = await CreateExam(values, accessToken);

      if (response.status === 400) {
        let errors = response.data;
        if (errors) {
          Object.keys(errors).forEach((key) => {
            questionFormik.setFieldError(key, errors[key][0]);
          });
        }
      }

      if (response.status === 201 || response.status === 200) {
        console.log(response.data);
      }
    },
  });

  const [isInvalidInputTitle, setIsInvalidInputTitle] = useState(false);

  const handleSutmitExam = async () => {
    try {
      const response = await examFormik.submitForm();
      getExams(course.id);
    } catch (e) {
      let errors = e.response.data;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          questionFormik.setFieldError(key, errors[key][0]);
          setIsInvalidInputTitle(true);
        });
      }
    }
  };

  const questionFormik = useFormik({
    initialValues: {
      question: "",
      exam: "",
    },
    onSubmit: async (values) => {
      const request = await CreateQuestion(values, accessToken);

      if (request.status === 201) {
        let question: QuestionInterface = request.data;

        addQuestion(question);

        questionFormik.resetForm();
      }

      if (request.status === 400) {
        let errors = request.data;
        if (errors) {
          Object.keys(errors).forEach((key) => {
            questionFormik.setFieldError(key, errors[key][0]);
          });
        }
      }
    },
  });

  const handleSutmitQuestion = async (examID) => {
    try {
      const values = questionFormik.values;
      values.exam = examID;
      const response = await CreateQuestion(values, accessToken);
      questionFormik.resetForm();
      setSelected("Examen");
    } catch (e) {
      let errors = e.response.data;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          questionFormik.setFieldError(key, errors[key][0]);
        });
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        className="min-h-96 dark"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                {course.name}
              </ModalHeader>
              <ModalBody>
                <Tabs         selectedKey={selected}
        onSelectionChange={setSelected}>
                  <Tab key="Editar_Curso" title="Editar Curso">
                    <form className="flex flex-col gap-5 w-full min-h-full justify-between">
                      <section className="flex flex-row gap-5">
                        <section className="flex flex-col gap-5 justify-between w-full">
                          <Input
                            required
                            errorMessage={errorMessages.name}
                            id="name"
                            isInvalid={isInvalid.name}
                            label="Nombre del Curso"
                            placeholder="Ingrese un Nombre para el Curso"
                            value={formData.name}
                            variant="flat"
                            onChange={handleChange}
                          />

                          <Select
                            required
                            errorMessage={errorMessages.level}
                            id="level"
                            isInvalid={isInvalid.level}
                            label="Nivel del Curso"
                            name="level"
                            placeholder="Seleccione un Nivel para el Curso"
                            selectionMode="single"
                            variant="flat"
                            value={formData.level}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                level: e.target.value,
                              });
                            }}
                          >
                            {levels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </section>
                        <div
                          className="relative flex items-center justify-center w-full"
                          {...getRootProps()}
                        >
                          <label
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            htmlFor="dropzone-file"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <RiGalleryUploadFill className="w-10 h-10 mb-3 text-gray-400" />
                              {errorMessages.miniature ? (
                                <p className="text-xs text-red-500 dark:text-red-400">
                                  {errorMessages.miniature}
                                </p>
                              ) : (
                                <></>
                              )}
                              {acceptedFiles[0] ? (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {acceptedFiles[0].name}
                                </p>
                              ) : (
                                <>
                                  {isDragActive ? (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Suelta aqui para cargar la Miniatura
                                    </p>
                                  ) : (
                                    <>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Haz Click para subir la Miniatura
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        O arrastrala y sueltala en este recuadro
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Solo Archivos de Imágenes( PNG, JPG, JPEG)
                              </p>
                            </div>
                          </label>
                          <input
                            type="file"
                            {...getInputProps({
                              name: "drop-zone",
                              id: "drop-zone",
                            })}
                          />
                        </div>
                      </section>
                      <Textarea
                        required
                        errorMessage={errorMessages.description}
                        id="description"
                        isInvalid={isInvalid.description}
                        label="Descripción"
                        placeholder="Ingrese una Descripción del Curso"
                        value={formData.description}
                        variant="flat"
                        onChange={handleChange}
                      />
                      <section>
                        <Button
                          className="w-full"
                          color="primary"
                          onClick={async () => {
                            await updateCourse();
                            location.reload();
                          }}
                        >
                          Editar
                        </Button>
                      </section>
                    </form>
                  </Tab>
                  <Tab key="Módulos" title="Módulos">
                    <ModulesList
                      accessToken={accessToken}
                      course={course}
                      onOpenParentChange={onClose}
                    />
                  </Tab>
                  <Tab key="Examen" title="Examen">
                    {exams.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        <span className="dark:text-white font-bold">
                          Examen: {exams[0].title}
                        </span>
                        <QuestionList
                          accessToken={accessToken}
                          exam={exams[0]}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <Input
                          required
                          errorMessage={examFormik.errors.title}
                          isInvalid={isInvalidInputTitle}
                          label="Título del Examen"
                          name="title"
                          placeholder="Ingrese un Título para el Examen"
                          value={examFormik.values.title}
                          onChange={examFormik.handleChange}
                        />
                        <Button
                          color="primary"
                          onClick={() => handleSutmitExam()}
                        >
                          Crear Examen
                        </Button>
                      </div>
                    )}
                  </Tab>
                  {exams.length > 0 ? (
                    <Tab
                      title="Añadir Pregunta"
                      className="flex flex-col gap-5"
                    >
                      <Input
                        name="question"
                        label="Pregunta"
                        placeholder="Ingrese una Pregunta"
                        onChange={questionFormik.handleChange}
                      />
                      <Button
                        color="primary"
                        onClick={() => handleSutmitQuestion(exams[0].id)}
                      >
                        Añadir Pregunta
                      </Button>
                    </Tab>
                  ) : (
                    <Tab
                      title="Añadir Pregunta"
                      className="dark:text-white font-bold"
                    >
                      Primero Crea el Examen !!
                    </Tab>
                  )}
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            <RiArrowDownSLine />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            color="primary"
            onClick={() => {
              onOpen();
            }}
          >
            Editar Curso
          </DropdownItem>
          {useDeleteButton}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
