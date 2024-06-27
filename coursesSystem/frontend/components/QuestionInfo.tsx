"useClient";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tabs,
  Tab,
  Input,
  Button,
  Checkbox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";

import OptionInfo from "./OptionInfo";
import { QuestionInterface, OptionInterface } from "@/types/courses";
import { DeleteQuestion, CreateOption } from "@/config/axios_auth";
import { useQuestions, useOptions } from "@/store/exams";
import { RiArrowDownSLine } from "@remixicon/react";

const QuestionInfo = ({
  question,
  accessToken,
}: {
  question: QuestionInterface;
  accessToken: string;
}) => {
  const [selected, setSelected] = useState("options");
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const { deleteQuestion } = useQuestions();
  const { addOption, getOptions, options } = useOptions();
  const optionFormik = useFormik({
    initialValues: {
      content: "",
      is_correct: false,
      question: question.id,
    },
    onSubmit: async (values) => {
      const request = await CreateOption(values, accessToken);

      if (request.status === 201) {
        addOption(request.data);
        optionFormik.resetForm();
        setSelected("options");
      }
    },
  });

  const handleDelete = async () => {
    const request = await DeleteQuestion(question.id, accessToken);
    if (request.status === 204) {
      deleteQuestion(question);
    }
  };

  useEffect(() => {
    getOptions(question.id);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onOpenChange}
        className="dark max-h-sm"
        size="lg"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <span className="font-semibold text-base md:text-lg dark:text-white">
                  {question.question}
                </span>
              </ModalHeader>
              <ModalBody>
                <Tabs
                  aria-label="Options"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab
                    key="options"
                    title="Opciones"
                    className="grid grid-cols-2 gap-10"
                  >
                    {options.map((option: OptionInterface) => (
                      <OptionInfo
                        key={option.id}
                        accessToken={accessToken}
                        option={option}
                      />
                    ))}
                  </Tab>
                  <Tab
                    key="add_option"
                    title="Añadir Opcion"
                    className="flex flex-col gap-5"
                  >
                    <Input
                      label="Contenido de la Opcion"
                      name="content"
                      placeholder="Ingrese el contenido de la Opcion"
                      value={optionFormik.values.content}
                      onChange={optionFormik.handleChange}
                    />
                    <Checkbox
                      checked={optionFormik.values.is_correct}
                      name="is_correct"
                      size="sm"
                      onChange={optionFormik.handleChange}
                    >
                      ¿Esta Opcion es Correcta?
                    </Checkbox>
                    <Button
                      color="primary"
                      onClick={() => optionFormik.handleSubmit()}
                    >
                      Crear Opcion
                    </Button>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Card
        as="div"
        className="relative py-0 px-0 min-w-40 max-w-24  h-full min-h-36  gap-0 shadow-lg shadow-blue-900 hover:shadow-blue-700 transition-shadow"
        onPress={() => onOpen()}
        onClick={() => onOpen()}
      >
        <CardHeader className="absolute top-0 right-0 pb-0 pt-0 px-0 flex-col items-end w-full">
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-transparent">
                <RiArrowDownSLine />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                color="primary"
                onClick={() => {
                  onOpen();
                }}
              >
                Editar Opciones
              </DropdownItem>
              <DropdownItem
                color="danger"
                onClick={() => {
                  handleDelete();
                }}
              >
                Eliminar Pregunta
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="flex flex-1 items-center justify-center overflow-visible w-full text-pretty">
          <span className="font-semibold text-xs md:text-sm w-full">
            {question.question}
          </span>
        </CardBody>
      </Card>
    </>
  );
};

export default QuestionInfo;
