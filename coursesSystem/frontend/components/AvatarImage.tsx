import React, { forwardRef } from "react";
import Image from "next/image";

const AvatarImage = forwardRef(({ ...props }, ref) => {
  return <Image ref={ref} src={props.src} alt="avatar" width={40} height={40} />;
});

export default AvatarImage;