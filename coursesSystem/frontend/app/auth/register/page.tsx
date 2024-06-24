"use client";

import { Button, Input, Link, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, } from "@nextui-org/react";

import { useState } from "react";

import useRegisterForm from "@/hooks/registerHooks";
import { redirectlogin } from "@/config/redirectActions";

export default function Register() {
  const {
    name,
    lastName,
    username,
    ci,
    email,
    password,
    repeatPassword,
    isInvalid,
    errorMessage,
    handleSubmit,
    handleChange,
  } = useRegisterForm();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalMessage, changeModalMessage] = useState();

  const registerUser = async (e: any) => {
    const request = handleSubmit(e) // eslint-disable-line
      .then(() => {
        redirectlogin();
      })
      .catch((error) => {
        changeModalMessage(
          error.response.data.non_field_errors.map((error: any) => error),
        );
        onOpen();
      });
  };

  return (
    <form action="" className="absolute w-full px-4" onSubmit={registerUser}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
              <ModalBody>
                <p> {modalMessage} </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <span className="font-extrabold text-5xl">Regístrate</span>
      <section className="flex flex-col my-10 gap-5">
        <article className="flex flex-row gap-3">
          <Input
            required
            errorMessage={errorMessage.name}
            id="name"
            isInvalid={isInvalid.name}
            label="Primer Nombre"
            placeholder="Ingrese su Nombre"
            radius="sm"
            size="sm"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <Input
            required
            errorMessage={errorMessage.lastName}
            isInvalid={isInvalid.lastName}
            id="lastName"
            label="Primer Apellido"
            placeholder="Ingrese su Apellido"
            radius="sm"
            size="sm"
            value={lastName}
            onChange={handleChange}
          />
        </article>
        <Input
          required
          errorMessage={errorMessage.ci}
          isInvalid={isInvalid.ci}
          id="ci"
          label="Ingrese su Cédula de Identidad"
          placeholder="Ingrese su CI"
          radius="sm"
          size="sm"
          startContent={<span className="text-foreground-400 text-sm">V-</span>}
          value={ci}
          onChange={handleChange}
        />
        <Input
          required
          errorMessage={errorMessage.username}
          id="username"
          isInvalid={isInvalid.username}
          label="Usuario"
          placeholder="Ingrese un Usuario"
          radius="sm"
          size="sm"
          value={username}
          onChange={handleChange}
        />
        <Input
          required
          errorMessage={errorMessage.email}
          id="email"
          isInvalid={isInvalid.email}
          label="Correo Electrónico"
          placeholder="Ingrese su Correo Electrónico"
          radius="sm"
          size="sm"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          required
          errorMessage={errorMessage.password}
          id="password"
          isInvalid={isInvalid.password}
          label="Contraseña"
          placeholder="Ingrese una contraseña"
          radius="sm"
          size="sm"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <Input
          required
          errorMessage={errorMessage.repeatPassword}
          id="repeatPassword"
          isInvalid={isInvalid.repeatPassword}
          label="Repita la Contraseña"
          placeholder="Ingrese Contraseña Nuevamente"
          radius="sm"
          size="sm"
          type="password"
          value={repeatPassword}
          onChange={handleChange}
        />
      </section>
      <section className="flex flex-col gap-2 items-center justify-center">
        <Button
          className="w-full"
          color="primary"
          radius="sm"
          size="lg"
          type="submit"
        >
          Regístrarse
        </Button>
        <section className="flex flex-col gap-2 items-center justify-center">
          <span className=" text-foreground-400 text-bold">O</span>
          <Link href="/auth/">Inicia Sesión</Link>
        </section>
      </section>
    </form>
  );
}
