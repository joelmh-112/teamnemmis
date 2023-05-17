import { IColumnType, Table } from "@/components/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@/utils/ColumnType";

export default async function Index() {
  const teams = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Name", title: "Nombre", type: ColumnType.Text },
    { key: "start_date", title: "Inicio", type: ColumnType.date },
    { key: "due_date", title: "Fin", type: ColumnType.date },
    { key:"GiveawayAward", title: "Sorteos", type: ColumnType.array },

  ];
  return <Table columns={columns} data={teams}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();
  return await prisma.giveaway.findMany({
    include: {
      Name: {
        include: {
          Translations: true,
        },
      },
      GiveawayAward: true,
    },

  });
}
