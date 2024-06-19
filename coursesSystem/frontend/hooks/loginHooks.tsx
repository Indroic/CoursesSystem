"use client";
import { useState } from "react";

import { LoginRequest } from "@/config/axios_auth";

const useLoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isInvalid, setIsInvalid] = useState({
    username: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
  });

  const isInvalidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]*$/;

    if (!usernameRegex.test(username)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        username: "El nombre de usuario no es válido.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        username: true,
      }));

      return false;
    }

    setErrorMessage((prevState) => ({
      ...prevState,
      username: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      username: false,
    }));

    return true;
  };

  const isInvalidPassword = () => {
    const passwordRegex = /^.{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        password: "La contraseña no es válida.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        password: true,
      }));

      return false;
    }

    setErrorMessage((prevState) => ({
      ...prevState,
      password: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      password: false,
    }));

    return true;
  };
  const handleChange = (e: any) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // Actualizar isInvalid según las condiciones que deseas verificar
    setIsInvalid((prevState) => ({
      ...prevState,
      [id]: validateField(id, value),
    }));
  };

  const validateField = (fieldName: any, fieldValue: any) => {
    if (fieldName === "username" && !isInvalidUsername(fieldValue)) {
      return false;
    }

    if (fieldName === "password" && !isInvalidPassword()) {
      return false;
    }

    return true;
  };

  const isFormValid = Object.values(isInvalid).every((value) => !value);

  const handleSubmit = async () => {
    if (!isFormValid) {
      return;
    }

    const request = await LoginRequest({
      username: formData.username,
      password: formData.password,
    });

    return request;
  };

  return {
    username: formData.username,
    password: formData.password,
    isInvalid,
    errorMessage,
    isFormValid,
    setErrorMessage,
    setIsInvalid,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
