"use client";

import { Avatar as NextUIAvatar, Spinner } from "@nextui-org/react";

import { useSession } from "next-auth/react";

export default function Avatar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner color="primary" size="sm" />;
  }

  return (
    <div className="flex flex-row gap-3">
      <NextUIAvatar name={session?.user?.name} src={session?.user?.picture} />
      <span className="font-bold text-white">{session?.user?.name}</span>
    </div>
  );
}
