import { updateTranslations } from "@/utils/UpdateFunctions";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { data } = await req.json();

  return await updateTranslations(...data.Title, ...data.Description)
    .then((_) => {
      return NextResponse.json({ err: false, message: "ok" });
    })
    .catch((err) => {
      console.log(err, "err");
      return NextResponse.json({ err: true, message: err });
    });
};

export { handler as POST, handler as GET };
