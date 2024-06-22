"use client";
import { Avatar as NextUIAvatar, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const AvatarImage = ({children, ...props}) => {

  return <Image src={props.src} alt="avatar" width={40} height={40} />
}

export default function Avatar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner color="primary" size="sm" />;
  }

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <NextUIAvatar name={session?.user?.name} src={session?.user?.picture} ImgComponent={AvatarImage}/>
      <span className="font-bold text-white">{session?.user?.name}</span>
    </div>
  );
}
