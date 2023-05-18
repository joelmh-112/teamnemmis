import { IColumnType, Table } from "@components/backend/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@utils/ColumnType";

export default async function Index() {
  const teamMembers = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "name", title: "Nombre", type: ColumnType.string },
    { key: "surname1", title: "Primer apellido", type: ColumnType.string },
    {
      key: "surname2",
      title: "Segundo apellido",
      type: ColumnType.string,
    },
    { key: "alias", title: "Alias", type: ColumnType.string },
    { key: "Team", title: "Equipo", type: ColumnType.team },
  ];
  return <Table columns={columns} data={teamMembers}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();

  return await prisma.teamMember.findMany({
    include: {
      Team: {
        include: {
          Title: {
            include: {
              Translations: true,
            },
          },
        },
      },
    },
  });
}
