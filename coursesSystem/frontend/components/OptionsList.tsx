"use client";

import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { OptionInterface, QuestionInterface } from "@/types/courses";
import { GetOptionsOfQuestionRequest } from "@/config/axios_auth";

const OptionsList = ({ question }: { question: QuestionInterface }) => {
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
    <CheckboxGroup>
      {options?.map((option: OptionInterface) => (
        <Checkbox key={option.id} value={option.id}>
          {option.content}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default OptionsList;
