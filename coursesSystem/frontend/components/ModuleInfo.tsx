"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import {
  RiBookFill,
  RiGalleryUploadFill,
  RiArrowDownSLine,
} from "@remixicon/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ModalBody,
  Modal,
  useDisclosure,
  ModalFooter,
  ModalContent,
  Button,
  Input,
  Textarea,
  ModalHeader,
  Tabs,
  Tab,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";

import LessonsList from "./LessonsList";

import {
  CreateLessonRequest,
  UpdateModuleRequest,
  DeleteModule,
} from "@/config/axios_auth";
import { LessonInterface, ModuleInterface } from "@/types/courses";
import { useVideoDropZone, useImageDropZone } from "@/hooks/DropZones";
import useLessons from "@/store/lessons";
import useModules from "@/store/modules";

const ModuleInfo = ({
  module,
  accessToken,
  onOpenParentChange,
}: {
  module: ModuleInterface;
  accessToken: string;
  onOpenParentChange: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addLesson } = useLessons();
  const { updateModule, deleteModule } = useModules();
  const [lessonsErrors, setLessonsErrors] = useState({
    title: "",
    description: "",
    video: "",
  });

  const formikLesson = useFormik({
    initialValues: {
      title: "",
      description: "",
      miniature: null,
      video: null,
      module: module.id,
    },
    onSubmit: async (values) => {
      formikLesson.values.miniature = acceptedImageFiles[0];
      formikLesson.values.video = acceptedVideoFiles[0];

      if (!formikLesson.values.video) {
        setLessonsErrors((prevState) => ({
          ...prevState,
          video: "Debe subir un video.",
        }));

        return;
      }

      const response = await CreateLessonRequest(
        formikLesson.values,
        accessToken,
      );

      if (response.status === 201) {
        formikLesson.resetForm();
        let lesson: LessonInterface = response.data;

        module.num_lessons = module.num_lessons + 1;
        updateModule(module);
        addLesson(lesson);
        onOpenChange();
      }
    },
  });

  const formikUpdateModule = useFormik({
    initialValues: {
      name: module.name,
      description: module.description,
    },
    onSubmit: async (values) => {
      const response = await UpdateModuleRequest(
        values,
        module.id,
        accessToken,
      );
    },
  });

  const createLesson = async () => {
    try {
      let response = await formikLesson.submitForm();

      formikLesson.resetForm();
    } catch (e) {
      try {
        let errors = e.response.data;

        console.log(errors);
        if (errors) {
          Object.keys(errors).forEach((key) => {
            console.log(key, errors[key][0]);
            setLessonsErrors({ ...lessonsErrors, [key]: errors[key][0] });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  return (
    <>
      <Modal
        backdrop="blur"
        className="dark"
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="dark:text-white">
                  Módulo: {module.name}
                </ModalHeader>
                <ModalBody>
                  <Tabs>
                    <Tab className="flex flex-col gap-5" title="Editar Módulo">
                      <Input
                        id="name"
                        label="Nombre del Módulo"
                        value={formikUpdateModule.values.name}
                        onChange={formikUpdateModule.handleChange}
                      />
                      <Textarea
                        id="description"
                        label="Descripción del Módulo"
                        value={formikUpdateModule.values.description}
                        onChange={formikUpdateModule.handleChange}
                      />
                      <Button
                        color="primary"
                        onClick={() => {
                          formikUpdateModule.handleSubmit();
                        }}
                      >
                        Editar
                      </Button>
                    </Tab>
                    <Tab title="Lecciones">
                      <LessonsList
                        accessToken={accessToken}
                        getModuleLessons={module.id}
                      />
                    </Tab>
                    <Tab className="flex flex-col gap-5" title="Añadir Lección">
                      <Input
                        required
                        errorMessage={lessonsErrors.title}
                        id="title"
                        isInvalid={lessonsErrors.title ? true : false}
                        label="Titulo de la Lección"
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
                          await createLesson();
                        }}
                      >
                        Crear Lección
                      </Button>
                    </Tab>
                  </Tabs>
                </ModalBody>
                <ModalFooter />
              </>
            );
          }}
        </ModalContent>
      </Modal>

      <Card
        as={"div"}
        className="min-w-40 max-w-44 md:max-w-xs h-full min-h-36  gap-0 shadow-lg shadow-blue-500/50  dark:shadow-blue-900  transition-shadow"
      >
        <CardHeader className="">
          <span className="relative flex flex-col font-semibold text-xs md:text-sm">
            Módulo: {module.name}
          </span>
          <Dropdown className="absolute top-0 right-0">
            <DropdownTrigger>
              <Button className="bg-transparent w-min h-min">
                <RiArrowDownSLine />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem color="primary" onClick={() => onOpen()}>
                Editar Modulo
              </DropdownItem>
              <DropdownItem
                color="danger"
                onClick={() => {
                  DeleteModule(module.id, accessToken);
                  deleteModule(module);
                  onOpenParentChange();
                }}
              >
                Eliminar Modulo
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="relative overflow-visible w-full items-center">
          <RiBookFill />
        </CardBody>
        <CardFooter className="flex flex-row justify-between p-2 md:p-4">
          <small className="text-default-500">
            {module.num_lessons} Lecciones
          </small>
        </CardFooter>
      </Card>
    </>
  );
};

export default ModuleInfo;
