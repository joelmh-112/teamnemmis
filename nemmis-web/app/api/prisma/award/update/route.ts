import prisma from "@/utils/prisma";
import { Award } from "@prisma/client";

const handler = (data: any) => {
  console.log(typeof data);

  prisma.award.update({ where: { id: data.id }, data });

  return "something";
};

export { handler as GET, handler as POST };
