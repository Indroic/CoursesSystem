import { useState } from "react";

import { RegisterRequest } from "@/config/axios_auth";

const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    ci: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [isInvalid, setIsInvalid] = useState({
    name: false,
    lastName: false,
    username: false,
    ci: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    lastName: "",
    username: "",
    ci: "",
    email: "",
    password: "",
    repeatPassword: "",
    errorMessageRequest: "",
  });

  const isInvalidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        email: "El correo electrónico no es válido.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        email: true,
      }));

      return false;
    }

    setErrorMessage((prevState) => ({
      ...prevState,
      email: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      email: false,
    }));

    return true;
  };

  const isInvalidName = (name: string) => {
    const nameRegex = /^[a-zA-Z]*$/;

    if (nameRegex.test(name) !== true) {
      setErrorMessage((prevState) => ({
        ...prevState,
        name: "El nombre no es válido.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        name: true,
      }));

      return false;
    }

    setErrorMessage((prevState) => ({
      ...prevState,
      name: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      name: false,
    }));

    return true;
  };

  const isInvalidLastName = (lastName: string) => {
    const lastNameRegex = /^[a-zA-Z]*$/;

    if (!lastNameRegex.test(lastName)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        lastName: "El apellido no es válido.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        lastName: true,
      }));

      return false;
    }
    setErrorMessage((prevState) => ({
      ...prevState,
      lastName: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      lastName: false,
    }));

    return true;
  };

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

  const isInvalidCi = (ci: string) => {
    const ciRegex = /^[0-9]*$/;

    if (!ciRegex.test(ci)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ci: "El CI no es válido.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        ci: true,
      }));

      return false;
    }
    setErrorMessage((prevState) => ({
      ...prevState,
      ci: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      ci: false,
    }));

    return true;
  };

  const isInvalidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/ ; // eslint-disable-line

    if (!passwordRegex.test(password)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        password: "La contraseña no es válida.Contener al menos una letra minúscula. Contener al menos una letra mayúscula. Contener al menos un carácter especial(!@#$%^&*).Tener una longitud mínima de 8 caracteres.",// eslint-disable-line
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

  const isInvalidRepeatPassword = (repeatPassword: string) => {
    if (repeatPassword !== formData.password) {
      setErrorMessage((prevState) => ({
        ...prevState,
        repeatPassword: "Las contraseñas no coinciden.",
      }));
      
      setIsInvalid((prevState) => ({
        ...prevState,
        repeatPassword: true,
      }));

      return false;
    }

    setErrorMessage((prevState) => ({
      ...prevState,
      repeatPassword: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      repeatPassword: false,
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
    if (fieldName === "name" && !isInvalidName(fieldValue)) {
      setIsInvalid((prevState) => ({
        ...prevState,
        name: false,
      }));

      return false;
    }

    if (fieldName === "lastName" && !isInvalidLastName(fieldValue)) {
      return false;
    }

    if (fieldName === "username" && !isInvalidUsername(fieldValue)) {
      return false;
    }

    if (fieldName === "ci" && !isInvalidCi(fieldValue)) {
      return false;
    }

    if (fieldName === "email" && !isInvalidEmail(fieldValue)) {
      return false;
    }

    if (fieldName === "password" && !isInvalidPassword(fieldValue)) {
      return false;
    }

    if (fieldName === "repeatPassword" && !isInvalidRepeatPassword(fieldValue)) {
      return false;
    }

    return true;
  };

  const isFormValid = Object.values(isInvalid).every((value) => !value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    const request = await RegisterRequest({
      first_name: formData.name,
      last_name: formData.lastName,
      username: formData.username,
      ci: formData.ci,
      email: formData.email,
      password: formData.password,
    });

    return request;
  };

  return {
    name: formData.name,
    lastName: formData.lastName,
    username: formData.username,
    ci: formData.ci,
    email: formData.email,
    password: formData.password,
    repeatPassword: formData.repeatPassword,
    isInvalid,
    errorMessage,
    isFormValid,
    setErrorMessage,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
