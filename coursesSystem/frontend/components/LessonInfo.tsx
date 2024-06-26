"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { RiArrowDownSLine, RiGalleryUploadFill } from "@remixicon/react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

import { LessonInterface } from "@/types/courses";
import { DeleteLesson } from "@/config/axios_auth";
import useLessons from "@/store/lessons";
import { useVideoDropZone, useImageDropZone } from "@/hooks/DropZones";
import { UpdateLessonRequest } from "@/config/axios_auth";

const LessonInfo = ({
  lesson,
  accessToken,
}: {
  lesson: LessonInterface;
  accessToken: string;
}) => {
  const {
    getVideoRootProps,
    getVideoInputProps,
    isVideoDragActive,
    acceptedVideoFiles,
  } = useVideoDropZone();

  const {
    getImageRootProps,
    getImageInputProps,
    isImageDragActive,
    acceptedImageFiles,
  } = useImageDropZone();

  const { deleteLesson } = useLessons();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [lessonsErrors, setLessonsErrors] = useState({
    title: "",
    description: "",
    video: "",
  });

  const formikLesson = useFormik({
    initialValues: {
      title: lesson.title,
      description: lesson.description,
      miniature: null,
      video: null,
      module: null,
    },
    onSubmit: async (values) => {
      formikLesson.values.miniature = acceptedImageFiles[0];
      formikLesson.values.video = acceptedVideoFiles[0];

      const datosNoNulos = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== null),
      );

      const response = await UpdateLessonRequest(
        datosNoNulos,
        lesson.id,
        accessToken,
      );

      if (response.status === 201) {
        formikLesson.resetForm();
        onOpenChange();
      }
    },
  });

  const updateLesson = async () => {
    try {
      let response = await formikLesson.submitForm();
    } catch (e) {
      let errors = e.response.data;

      console.log(errors);
      if (errors) {
        Object.keys(errors).forEach((key) => {
          console.log(key, errors[key][0]);
          setLessonsErrors({ ...lessonsErrors, [key]: errors[key][0] });
        });
      }
    }
  };

  return (
    <>
      <Modal
        className="flex flex-col gap-5"
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="text-2xl font-bold dark:text-white">
                  Leccion: {lesson.title}
                </h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  required
                  errorMessage={lessonsErrors.title}
                  id="title"
                  isInvalid={lessonsErrors.title ? true : false}
                  label="Titulo de la Lección"
                  value={formikLesson.values.title}
                  onChange={formikLesson.handleChange}
                />
                <section className="flex flex-row gap-5 ">
                  <div
                    className="relative flex items-center justify-center w-full"
                    id="video"
                    {...getVideoRootProps()}
                  >
                    <label
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      htmlFor="dropzone-file"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <RiGalleryUploadFill className="w-10 h-10 mb-3 text-gray-400" />
                        {lessonsErrors.video ? (
                          <p className="text-xs text-red-500">
                            {lessonsErrors.video}
                          </p>
                        ) : (
                          <></>
                        )}
                        {acceptedVideoFiles[0] ? (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {acceptedVideoFiles[0].name}
                          </p>
                        ) : (
                          <>
                            {isVideoDragActive ? (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Suelta aqui para cargar el Video
                              </p>
                            ) : (
                              <>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Haz Click para subir el Video
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  O arrastralo y sueltalo en este recuadro
                                </p>
                              </>
                            )}
                          </>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Solo Archivos de Video( MKV, MP4)
                        </p>
                      </div>
                    </label>
                    <input
                      type="file"
                      {...getVideoInputProps({
                        name: "video-drop-zone",
                        id: "video-drop-zone",
                      })}
                    />
                  </div>

                  <div
                    className="relative flex items-center justify-center w-full"
                    id="miniature"
                    {...getImageRootProps()}
                  >
                    <label
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      htmlFor="dropzone-file"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <RiGalleryUploadFill className="w-10 h-10 mb-3 text-gray-400" />
                        {acceptedImageFiles[0] ? (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {acceptedImageFiles[0].name}
                          </p>
                        ) : (
                          <>
                            {isImageDragActive ? (
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
                      {...getImageInputProps({
                        name: "image-drop-zone",
                        id: "image-drop-zone",
                      })}
                    />
                  </div>
                </section>
                <Textarea
                  required
                  id="description"
                  label="Descripción de la Lección"
                  value={formikLesson.values.description}
                  onChange={formikLesson.handleChange}
                />
                <Button
                  color="primary"
                  onClick={async () => {
                    location.reload();
                    await updateLesson();
                  }}
                >
                  Editar Lección
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card
        as={"div"}
        className="relative py-0 px-0 min-w-40 max-w-44 md:max-w-xs h-full min-h-36  gap-0 shadow-lg shadow-blue-500/50 hover:-translate-y-5 hover:shadow-blue-500 dark:shadow-blue-900 transition-shadow"
      >
        <CardHeader className="relative pb-0 pt-0 px-0 flex flex-col items-center">
          <Image
            alt="Course Miniature"
            className="max-h-44 rounded-none object-cover"
            src={lesson.miniature}
            width="full"
          />
          <Dropdown className="absolute top-0 right-0 z-10">
            <DropdownTrigger>
              <Button className="bg-transparent">
                <RiArrowDownSLine />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem color="primary" onClick={() => onOpen()}>
                Editar Leccion
              </DropdownItem>
              <DropdownItem
                color="danger"
                onClick={() => {
                  DeleteLesson(lesson.id, accessToken);
                  deleteLesson(lesson);
                }}
              >
                Eliminar Lección
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="overflow-visible p-2 md:px-4 w-full text-pretty">
          <span className="font-semibold text-xs md:text-sm w-full">
            {lesson.title}
          </span>
        </CardBody>
        <CardFooter className="flex flex-row justify-between p-2 md:p-4" />
      </Card>
    </>
  );
};

export default LessonInfo;
