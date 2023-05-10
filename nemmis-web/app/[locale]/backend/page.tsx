"use client";

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export default function Index() {
  const session: any = useSession();
  if (session.status !== "authenticated" || (session.status === "authenticated" && session?.data?.webUser?.role !== 1)) {
    return notFound;
  } else {
    return <h1>Backend</h1>;
  }
}
