import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { id } = await req.json();
  return await prisma.award
    .delete({ where: { id: BigInt(id) } })
    .then((res) => {
      return NextResponse.json({ err: false, message: res });
    })
    .catch((err) => {
      return NextResponse.json({ err: true, message: err });
    });

  /* THIS IS FUNNY :d ONLY TOOK 20 HOURS :d */
};

export { handler as POST };
