"use client";

import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import LessonsList from "./LessonsList";
import {
  CreateLessonRequest,
  UpdateModuleRequest,
  DeleteModule,
} from "@/config/axios_auth";
import { ModuleInterface } from "@/types/courses";

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
import { title } from "process";

const useVideoDropZone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {}, []);
  const dropzoneProps = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mkv", ".mp4"],
    },
    maxFiles: 1,
  });

  return {
    getVideoRootProps: dropzoneProps.getRootProps,
    getVideoInputProps: dropzoneProps.getInputProps,
    isVideoDragActive: dropzoneProps.isDragActive,
    acceptedVideoFiles: dropzoneProps.acceptedFiles,
  };
};

const useImageDropZone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {}, []);
  const dropzoneProps = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpeg"],
    },
    maxFiles: 1,
  });

  return {
    getImageRootProps: dropzoneProps.getRootProps,
    getImageInputProps: dropzoneProps.getInputProps,
    isImageDragActive: dropzoneProps.isDragActive,
    acceptedImageFiles: dropzoneProps.acceptedFiles,
  };
};

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
        accessToken
      );
      if (response.status === 201) {
        formikLesson.resetForm();
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
        accessToken
      );
    },
  });

  const createLesson = async () => {
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="4xl"
        className="dark"
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
                    <Tab title="Editar Módulo" className="flex flex-col gap-5">
                      <Input
                        id="name"
                        label="Nombre del Módulo"
                        onChange={formikUpdateModule.handleChange}
                        value={formikUpdateModule.values.name}
                      />
                      <Textarea
                        id="description"
                        label="Descripción del Módulo"
                        onChange={formikUpdateModule.handleChange}
                        value={formikUpdateModule.values.description}
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
                        getModuleLessons={module.id}
                        accessToken={accessToken}
                      />
                    </Tab>
                    <Tab title="Añadir Lección" className="flex flex-col gap-5">
                      <Input
                        required
                        id="title"
                        label="Titulo de la Lección"
                        onChange={formikLesson.handleChange}
                        errorMessage={lessonsErrors.title}
                        isInvalid={lessonsErrors.title ? true : false}
                      />
                      <section className="flex flex-row gap-5 ">
                        <div
                          id="video"
                          className="relative flex items-center justify-center w-full"
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
                          id="miniature"
                          className="relative flex items-center justify-center w-full"
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
                        onChange={formikLesson.handleChange}
                        value={formikLesson.values.description}
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
                <ModalFooter></ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>

      <Card className="min-w-40 max-w-44 md:max-w-xs h-full min-h-36  gap-0 shadow-lg shadow-blue-500/50 hover:shadow-blue-500 transition-shadow">
        <CardHeader className="">
          <span className="relative flex font-semibold text-xs md:text-sm w-[50%]">
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
                  onOpenParentChange(false);
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
