import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { data } = await req.json();
  return await prisma.award
    .update({ where: { id: BigInt(data.id) }, data })
    .then((res) => {
      return NextResponse.json({ err: false, message: res });
    })
    .catch((err) => {
      return NextResponse.json({ err: true, message: err });
    });
};

export { handler as POST };
