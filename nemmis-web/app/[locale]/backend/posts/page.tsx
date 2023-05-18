import { IColumnType, Table } from "@components/backend/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@utils/ColumnType";

export default async function Index() {
  const posts = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.bigint },
    { key: "Title", title: "Título", type: ColumnType.Text },
    { key: "Description", title: "Descripción", type: ColumnType.Text },
    { key: "Link", title: "Enlace", type: ColumnType.link },
    { key: "PostCategories", title: "PostCategories", type: ColumnType.Text },
  ];
  return <Table columns={columns} data={posts}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();

  return await prisma.post.findMany({
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
      PostCategory: true,
    },
  });
}
