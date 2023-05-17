import { IColumnType } from "@/components/backend/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@/utils/ColumnType";
import ModelTemplate from "@/components/backend/ModelTemplate";

export default async function Index() {
  const teams = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Name", title: "Nombre", type: ColumnType.Text },
    { key: "GiveawayAward", title: "Sorteos", type: ColumnType.array },
  ];

  return <ModelTemplate title="Teams" columns={columns} data={teams} />;
}

async function getData() {
  const prisma = new PrismaClient();
  return await prisma.award.findMany({
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
