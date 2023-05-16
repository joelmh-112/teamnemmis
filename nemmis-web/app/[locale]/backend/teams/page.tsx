import { Table } from "@/components/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";

interface MyTeams {
  id: string;
  title: string | undefined;
  description: string | undefined;
}

export default async function Index() {
  const teams = await getData();

  return <Table components={teams}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();
  const teams = await prisma.team.findMany();
  const aux: MyTeams[] = await Promise.all(
    teams.map(async (e) => {
      const description = (
        await prisma.translation.findFirst({
          where: { text_id: e.description_text_id },
          select: { text: true },
        })
      )?.text;
      const title = (
        await prisma.translation.findFirst({
          where: { text_id: e.title_text_id },
          select: { text: true },
        })
      )?.text;
      const aux: MyTeams = {
        id: e.id.toString(),
        description,
        title,
      };

      return aux;
    })
  );
  return aux;
}
