"use client";

import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

import { OptionInterface, QuestionInterface } from "@/types/courses";
import { GetOptionsOfQuestionRequest } from "@/config/axios_auth";

const OptionsList = ({
  question,
  onChange,
  errorMessage,
  name,
}: {
  question: QuestionInterface;
  onChange: (e: any) => void;
  errorMessage: string | undefined;
  name: string;
}) => {
  const [options, setOptions] = useState<OptionInterface[]>();

  useEffect(() => {
    const fetchData = async () => {
      let response = await GetOptionsOfQuestionRequest(question.id);

      if (response) {
        let optionsData: OptionInterface[] = response.data;

        setOptions(optionsData);
      }
    };

    fetchData();
  }, [question, options]);

  return (
    <RadioGroup
      errorMessage={errorMessage}
      isInvalid={errorMessage ? true : false}
      onChange={(e) => onChange(e)}
      name={name}
    >
      {options?.map((option: OptionInterface) => (
        <Radio key={option.id} value={option.is_correct.toString()}>
          {option.content}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default OptionsList;
