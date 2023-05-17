import { IColumnType, Table } from "@/components/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@/utils/ColumnType";

export default async function Index() {
  const categories = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Title", title: "Título", type: ColumnType.Text },
    { key: "Description", title: "Descripción", type: ColumnType.Text },
  ];
  return <Table columns={columns} data={categories}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();

  return await prisma.category.findMany({
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
    },
  });
}
