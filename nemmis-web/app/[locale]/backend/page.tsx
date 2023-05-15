"use client";

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export default function Index() {
  const session: any = useSession();
  return <h1>Backend</h1>;
}
