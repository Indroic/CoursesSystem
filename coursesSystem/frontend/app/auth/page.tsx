"use client";

import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";

import useLoginForm from "@/hooks/loginHook";
import { redirectCourses } from "@/config/redirectActions";

export default function Login() {
  const {
    username,
    password,
    isInvalid,
    errorMessage,
    handleChange,
    handleSubmit,
    setErrorMessage,
    setIsInvalid,
  } = useLoginForm();

  const onHandleSubmit = async (e: any) => {
    //eslint-disable-line
    const request = await handleSubmit();

    if (request?.error) {
      console.log(request);
      setErrorMessage({
        username: "Usuario o Contraseña Inválidos",
        password: "Usuario o Contraseña Inválidos",
      });
      setIsInvalid({
        username: true,
        password: true,
      });

      return;
    }
    if (request?.ok) {
      return redirectCourses();
    }

    return;
  };

  return (
    <form action={onHandleSubmit} className="absolute w-full px-4">
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
