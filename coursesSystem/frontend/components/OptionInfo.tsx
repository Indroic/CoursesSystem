"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { RiArrowDownSLine } from "@remixicon/react";

import { OptionInterface } from "@/types/courses";
import { DeleteOption } from "@/config/axios_auth";
import { useOptions } from "@/store/exams";

const OptionInfo = ({
  option,
  accessToken,
}: {
  option: OptionInterface;
  accessToken: string;
}) => {

  const handleDelete = async () => {
    const request = await DeleteOption(option.id, accessToken);

    const deleteEvent = new CustomEvent('optionDeleted', { detail: option.id });
    
    document.dispatchEvent(deleteEvent)
  };

  return (
    <Card
      as={"div"}
      className="py-0 px-0 min-w-40 max-w-24 h-full min-h-36  gap-0 shadow-lg shadow-blue-900 transition-shadow"
    >
      <CardHeader>
        <Dropdown>
          <DropdownTrigger>
            <Button className="bg-transparent absolute top-0 right-0">
              <RiArrowDownSLine size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem color="danger" onClick={handleDelete}>
              Eliminar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="flex flex-row justify-center items-center overflow-visible p-2 md:px-4 w-full text-pretty">
        <span className="font-semibold text-xs md:text-sm w-full dark:text-white">
          {option.content}
        </span>
      </CardBody>
      <CardFooter className=" p-2 md:p-4">
        <small className="text-default-500">
          {option.is_correct ? "Es Correcta" : "Incorrecta"}
        </small>
      </CardFooter>
    </Card>
  );
};

export default OptionInfo;
