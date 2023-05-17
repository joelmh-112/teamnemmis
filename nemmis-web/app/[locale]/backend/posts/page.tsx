import { IColumnType, Table } from "@/components/tableComponent/Table";
import { PrismaClient, language_code } from "@prisma/client";

import "../../../css/table.css";
import { useLocale } from "next-intl";
import { ColumnType } from "@/utils/ColumnType";

export default async function Index() {
  const posts = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Title", title: "Título", type: ColumnType.Text },
    { key: "Description", title: "Descripción", type: ColumnType.Text },
    { key: "Link", title: "Enlace", type: ColumnType.Text },
    { key: "PostCategories", title: "PostCategories", type: ColumnType.Text },
  ];
  return <Table columns={columns} data={posts}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();

  return await prisma.event.findMany({
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
