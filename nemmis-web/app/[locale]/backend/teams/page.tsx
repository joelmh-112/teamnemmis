import { IColumnType, Table } from "@/components/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@/utils/ColumnType";

interface MyTeams {
  id: string;
  title: string | undefined;
  description: string | undefined;
}

export default async function Index() {
  const teams = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Title", title: "Título", type: ColumnType.Text },
    { key: "Description", title: "Descripción", type: ColumnType.Text },
    { key: "TeamMember", title: "Miembros", type: ColumnType.array },
    { key: "TeamCategory", title: "Categorías", type: ColumnType.array },
  ];
  return <Table columns={columns} data={teams}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();
  return await prisma.team.findMany({
    include: {
      Title: {
        include: {
          Translations: true,
        },
      },
      Description: {
        include: {
          Translations: true,
        },
      },
      TeamMember: true,
      TeamCategory: true,
    },

  });
}
