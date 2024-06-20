"use client";

import { Avatar as NextUIAvatar } from "@nextui-org/react";

import { useSession } from "next-auth/react";

export default function Avatar() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Spinner color="primary" size="sm" />;
      }

    return  <NextUIAvatar src={session?.user?.picture} name={session?.user?.piname} />
}
