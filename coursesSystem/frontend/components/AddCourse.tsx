import { RiAddCircleFill } from "@remixicon/react";

import { Card, CardBody } from "@nextui-org/react";

const AddCourse = () => {
  return (
    <Card
      as={"button"}
      className="py-0 px-0 h-full max-w-44 md:max-w-xs gap-0 shadow-lg shadow-blue-500/50 hover:-translate-y-5 hover:shadow-blue-500 transition-shadow"
    >
      <CardBody className="overflow-visible h-full w-full text-center items-center justify-center">
        <RiAddCircleFill />
        <span className="text-default-500">Añadir curso</span>
      </CardBody>
    </Card>
  );
};

export default AddCourse;
