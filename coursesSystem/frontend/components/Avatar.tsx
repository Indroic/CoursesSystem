"use client";
import { Avatar as NextUIAvatar, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Avatar() {
  const { data: session, status } = useSession();
  const [userData, changeUserData] = useState({ username: "", picture: "" });

  if (status === "loading") {
    return <Spinner color="primary" size="sm" />;
  }

  if (status === "authenticated") {
    changeUserData({
      username: session?.user?.name,
      picture: session?.user?.picture, // eslint-disable-line
    });
  }

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <NextUIAvatar name={userData.username} src={userData.picture} />
      <span className="font-bold text-white">{session?.user?.name}</span>
    </div>
  );
}
