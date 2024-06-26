"use client";

import React, { useState, useEffect, useCallback } from "react";
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

import { CourseInterface } from "@/types/courses";
import useUpdateCourseForm from "@/hooks/UpdateCourseFormHook";

import { DeleteCourse } from "@/config/axios_auth";
import ModulesList from "./ModulesList";

export default function DropdownCourse({
  course,
  accessToken,
  userID
}: {
  course: CourseInterface;
  accessToken: string;
  userID: string;
}) {
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
            location.reload();
          }}
        >
          {" "}
          Eliminar Curso{" "}
        </DropdownItem>
      );
    }
  }, [status, course, session?.user.accessToken]);

  const levels = [
    { label: "Básico", value: "Inicial" },
    { label: "Intermedio", value: "Medio" },
    { label: "Avanzado", value: "Avanzado" },
  ];

  const updateCourse = async () => {
    formData.miniature = acceptedFiles[0];
    console.log(formData)
    try {
      const request = await handleSubmit();
      if (!request) {
        
      }
    } catch (e: any) {
      console.log(e)
      let errors = e.response.data;

      if (errors) {
        Object.keys(errors).forEach((key) => {
          setErrorMesages({ ...errorMessages, [key]: errors[key][0] });
          setIsInvalid({ ...isInvalid, [key]: true });
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
              <ModalHeader className="flex flex-col gap-1">
                {course.name}
              </ModalHeader>
              <ModalBody>
                <Tabs>
                  <Tab key="Editar Curso" title="Editar Curso">
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
                          onClick={async () => {await updateCourse(); location.reload();}}
                        >
                          Editar
                        </Button>
                      </section>
                    </form>
                  </Tab>
                  <Tab key="Módulos" title="Módulos">
                    <ModulesList accessToken={accessToken} course={course} onOpenParentChange={onClose} />
                  </Tab>
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
