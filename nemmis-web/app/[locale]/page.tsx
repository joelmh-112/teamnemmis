"use client";

import { useTranslations } from "next-intl";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Index() {
  const t = useTranslations("pages.test");
  const session:any = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{session.status === "authenticated" ? session?.data?.webUser?.id : "not logged in"}</p>
      {session.status === "authenticated" ? (
        <button onClick={() => signOut()} className="bg-red-200 p-2 rounded-md">
          Sign out
        </button>
      ) : (
        <button onClick={() => signIn()} className="bg-green-200 p-2 rounded-md">
          Sign in
        </button>
      )}
    </>
  );
}
