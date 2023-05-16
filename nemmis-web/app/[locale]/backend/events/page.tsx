import { IColumnType, Table } from "@/components/tableComponent/Table";
import { PrismaClient, language_code } from "@prisma/client";

import "../../../css/table.css";
import { useLocale } from "next-intl";
import { ColumnType } from "@/utils/ColumnType";

export default async function Index() {
  const events = await getData(useLocale());

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Title", title: "Título", type: ColumnType.Text },
    { key: "Description", title: "Descripción", type: ColumnType.Text },
    { key: "date", title: "Fecha", type: ColumnType.date },
  ];
  return <Table columns={columns} data={events}></Table>;
}

async function getData(locale: string) {
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
