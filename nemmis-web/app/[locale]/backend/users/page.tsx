import { IColumnType, Table } from "@/components/backend/tableComponent/Table";
import { PrismaClient } from "@prisma/client";

import "../../../css/table.css";
import { ColumnType } from "@/utils/ColumnType";

export default async function Index() {
  const teams = await getData();

  const columns: IColumnType[] = [
    { key: "id", title: "ID", type: ColumnType.string },
    { key: "nickname", title: "Nombre", type: ColumnType.string },
    { key: "email", title: "Inicio", type: ColumnType.string },
    { key: "avatar", title: "Fin", type: ColumnType.string },
    { key:"UserRoles", title: "Roles", type: ColumnType.array },

  ];
  return <Table columns={columns} data={teams}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();
  return await prisma.user.findMany({
    include: {
      
      UserRoles: true,
    },

  });
}
