import { useState } from "react";

import { CreateModuleRequest } from "@/config/axios_auth";

export const useModuleForm = ({
  accessToken,
  courseID,
}: {
  accessToken: string;
  courseID: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    course: courseID,
  });

  const [isInvalid, setIsInvalid] = useState({
    name: false,
    description: false,
  });

  const [errorMessages, setErrorMesages] = useState({
    name: "",
    description: "",
  });

  const isInvalidName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s\.\-]*$/;

    if (!nameRegex.test(name)) {
      setErrorMesages((prevState) => ({
        ...prevState,
        name: "El nombre no es válido.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        name: true,
      }));

      return false;
    }

    setErrorMesages((prevState) => ({
      ...prevState,
      name: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      name: false,
    }));

    return true;
  };

  const isInvalidDescription = (description: string) => {
    const descriptionRegex = /^[a-zA-Z]*$/;

    if (!descriptionRegex.test(description)) {
      setErrorMesages((prevState) => ({
        ...prevState,
        description: "La descripción no es válida.",
      }));

      setIsInvalid((prevState) => ({
        ...prevState,
        description: true,
      }));

      return false;
    }

    setErrorMesages((prevState) => ({
      ...prevState,
      description: "",
    }));

    setIsInvalid((prevState) => ({
      ...prevState,
      description: false,
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
      return false;
    }

    if (fieldName === "description" && !isInvalidDescription(fieldValue)) {
      return false;
    }

    return true;
  };

  const ValidateFieds = () => {
    Object.keys(formData).forEach((key: any) => {
      validateField(key, formData[key]);
    });
  };

  const isFormValid = Object.values(isInvalid).every((value) => !value);

  const handleSubmit = async () => {
    ValidateFieds();

    if (!isFormValid) {
      return false;
    }
    
    const request = await CreateModuleRequest(formData, accessToken);

    return request;
  };

  return {
    formData,
    setFormData,
    isInvalid,
    setIsInvalid,
    errorMessages,
    setErrorMesages,
    handleChange,
    isFormValid,
    handleSubmit,
  };
};

export default useModuleForm;
