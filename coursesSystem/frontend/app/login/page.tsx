"use client";

import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";

import useLoginForm from "@/hooks/loginHooks";

export default function Login() {
  const {
    username,
    password,
    isInvalid,
    errorMessage,
    setErrorMessage,
    setIsInvalid,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  const login = async () => {
    try {
      const request = await handleSubmit();

      sessionStorage.setItem("token", request.access);
      sessionStorage.setItem("refresh", request.refresh);
      setErrorMessage((prevState) => ({
        ...prevState,
        username: "",
        password: "",
      }));
      setIsInvalid((prevState) => ({
        ...prevState,
        username: false,
        password: false,
      }));
    } catch (error: any) {
      if (error.response.status === 401) {
        setErrorMessage((prevState) => ({
          ...prevState,
          username: "Usuario o Contraseña Inválidos",
          password: "Usuario o Contraseña Inválidos",
        }));
        setIsInvalid((prevState) => ({
          ...prevState,
          username: true,
          password: true,
        }));
      }

      return;
    }
  };

  return (
    <form action={login} className="absolute w-full px-4">
      <section className="grid gap-2 relative">
        <Image
          alt="chico en laptop"
          className="absolute right-0 bottom-0"
          height={250}
          src="/guy.png"
          width={250}
        />
        <span className="font-extrabold text-6xl">Inicia</span>
        <span className="font-extrabold text-6xl ml-10">Sesión</span>
      </section>
      <section className="flex flex-col my-10 gap-8">
        <Input
          required
          errorMessage={errorMessage.username}
          id="username"
          isInvalid={isInvalid.username}
          label="Usuario"
          placeholder="Ingrese su Usuario"
          radius="sm"
          size="md"
          value={username}
          onChange={handleChange}
        />
        <article className="flex flex-col gap-3">
          <Input
            required
            errorMessage={errorMessage.password}
            id="password"
            isInvalid={isInvalid.password}
            label="Contraseña"
            placeholder="Ingrese su Contraseña"
            radius="sm"
            size="md"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Link>He olvidado mi Contraseña</Link>
        </article>
      </section>
      <section className="flex flex-col gap-10 items-center justify-center">
        <Button
          className="w-full"
          color="primary"
          radius="sm"
          size="lg"
          type="submit"
        >
          Iniciar Sesión
        </Button>
        <section className="flex flex-col gap-10 items-center justify-center">
          <span className=" text-foreground-400 text-bold">O</span>
          <Link href="/register/">Registrate</Link>
        </section>
      </section>
    </form>
  );
}
