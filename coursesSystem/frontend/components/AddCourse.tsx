"use client";
import { RiGalleryUploadFill } from "@remixicon/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { RiAddCircleFill } from "@remixicon/react";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";

import useCourseForm from "@/hooks/CourseFormHook";
import useCourses from "@/store/courses";

const AddCourse = ({
  userID,
  accessToken,
}: {
  userID: string;
  accessToken: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    formData,
    errorMessages,
    isInvalid,
    setFormData,
    setErrorMesages,
    setIsInvalid,
    handleSubmit,
    handleChange,
  } = useCourseForm({ accessToken: accessToken, userID: userID });

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
  const levels = [
    { label: "Básico", value: "Inicial" },
    { label: "Intermedio", value: "Medio" },
    { label: "Avanzado", value: "Avanzado" },
  ];

  const { addCourse } = useCourses();

  const createCourse = async () => {
    formData.miniature = acceptedFiles[0];

    try {
      const request = await handleSubmit();

      if (request) {
        let curse = request.data;

        addCourse(curse);
        onOpenChange();
      }
    } catch (e: any) {
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
        className="dark"
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                return await createCourse();
              }}
            >
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                Crear un Nuevo Curso
              </ModalHeader>
              <ModalBody className="flex flex-row justify-between gap-3">
                <section className="flex flex-col gap-5 w-full min-h-full justify-between">
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
                        onChange={(e) => {
                          setFormData({ ...formData, level: e.target.value });
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
                </section>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Crear
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <button onClick={() => onOpen()}>
        <Card className="rounded-full p-5 flex flex-1 gap-0 shadow-lg shadow-blue-500/50 hover:shadow-blue-500 transition-shadow">
          <CardBody className="text-center p-0 m-0 items-center justify-center">
            <RiAddCircleFill />
            <span className="text-default-500 w-max">Añadir curso</span>
          </CardBody>
        </Card>
      </button>
    </>
  );
};

export default AddCourse;
