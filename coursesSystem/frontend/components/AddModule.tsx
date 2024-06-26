"use client";

import React, { useCallback } from "react";
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
  Input,
} from "@nextui-org/react";

import useModuleForm from "@/hooks/ModuleFormHook";

const AddModule = ({
  courseID,
  accessToken,
}: {
  courseID: string;
  accessToken: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    formData,
    errorMessages,
    isInvalid,
    setErrorMesages,
    setIsInvalid,
    handleSubmit,
    handleChange,
  } = useModuleForm({ accessToken, courseID });

  const createModule = async () => {
    try {
      const request = await handleSubmit();
      location.reload();
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

                return await createModule();
              }}
            >
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                Crear un Nuevo Curso
              </ModalHeader>
              <ModalBody className="flex flex-row justify-between gap-3">
                <section className="flex flex-col gap-5 w-full min-h-full justify-between">
                  <Input
                    required
                    errorMessage={errorMessages.name}
                    id="name"
                    isInvalid={isInvalid.name}
                    label="Nombre"
                    placeholder="Ingrese el Nombre del Modulo"
                    value={formData.name}
                    variant="flat"
                    onChange={handleChange}
                  />

                  <Textarea
                    required
                    errorMessage={errorMessages.description}
                    id="description"
                    isInvalid={isInvalid.description}
                    label="Descripción"
                    placeholder="Ingrese una Descripción del Modulo"
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
            <span className="text-default-500 w-max">Añadir Modulo</span>
          </CardBody>
        </Card>
      </button>
    </>
  );
};

export default AddModule;
