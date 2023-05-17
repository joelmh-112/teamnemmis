"use client";
import { IColumnType, Table } from "@/components/backend/tableComponent/Table";
import { ActionOptions } from "@/utils/TableAction";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  columns: IColumnType[];
  data: any[];
}

function ModelTemplate(props: Props) {
  const { title, columns, data } = props;

  const [action, setAction] = useState<ActionOptions>();
  const [id, setId] = useState<number>();

  useEffect(() => {
    if (action === ActionOptions.delete) {
      console.log("delete", id);
    } else if (action === ActionOptions.edit) {
      console.log("edit", id);
    }
    console.log("puta inesperado");
  }, [action, id]);

  const onClick = (action: ActionOptions | undefined, id: number) => {
    setId(id);
    setAction(action);
  };

  return (
    <>
      <h1>{title}</h1>
      <Table columns={columns} data={data} onClick={onClick}></Table>
    </>
  );
}

export default ModelTemplate;
