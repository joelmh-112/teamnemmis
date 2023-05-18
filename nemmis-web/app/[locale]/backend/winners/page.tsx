import { IColumnType, Table } from "@components/backend/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@utils/ColumnType";

export default async function Index() {
  const teams = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key:"giveaway_award", title: "Roles", type: ColumnType.array },
    { key:"user", title: "User", type: ColumnType.array },

  ];
  return <Table columns={columns} data={teams}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();
  return await prisma.winner.findMany({
    include: {
      giveaway_award: true,
      user: true,
      
    },

  });
}
