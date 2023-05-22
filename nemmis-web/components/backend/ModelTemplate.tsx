"use client";
import { IColumnType, Table } from "@/components/backend/tableComponent/Table";
import { ActionOptions } from "@/utils/TableAction";
import { Type } from "@/utils/Type";
import { headers } from "@/utils/headers";
import { useEffect, useState } from "react";
import DynamicForm from "./DynamicForm";
import Button from "./Button";
import {  useRouter } from "next/navigation";

interface Props {
  title: string;
  type: Type;
  columns: IColumnType[];
  data: any[];
}

function ModelTemplate(props: Props) {
  const { title, columns, data, type} = props;

  const [action, setAction] = useState<ActionOptions>();
  const [row, setRow] = useState<any>()
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (action === ActionOptions.delete) {
        console.log("delete", row.id);
        const res = await fetch("/api/prisma/award/delete", {
          method: "POST",
          headers: { ...headers },
          body: JSON.stringify({ id: row.id?.toString() }),
        });
        console.log(await res.json());
      } else if (action === ActionOptions.edit) {
        setFormOpen(true);
      }
      console.log("puta inesperado");
    })();
  }, [action, row]);

  

  const onClick = (action: ActionOptions | undefined, row:any) => {
    setRow(row);
    setAction(action);
  };


  const handleOnSubmit = () =>{
    if(window !== undefined){
      alert("refresh");
      location.reload();
    }
  }

  return (
    <>
      <h1>{title}</h1>
      {formOpen ? <DynamicForm onSubmit={handleOnSubmit} data={row} columns={columns} type={type} /> : <Table columns={columns} data={data} onClick={onClick}/>}
    </>
  );
}

export default ModelTemplate;
