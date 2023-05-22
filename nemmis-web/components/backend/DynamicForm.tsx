import { Type } from "@/utils/Type";
import { IColumnType } from "./tableComponent/Table";
import { useState } from "react";
import InputDynamicForm from "./InputDynamicForm/InputDynamicForm";

interface Props{
    onSubmit: () => void;
    data: any;
    columns: IColumnType[];
    type: Type;
}

export default function DynamicForm(props:Props) {

    const {onSubmit,columns,type,data} = props;

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const a = true;

        if(a){
            onSubmit();
        }else{
            alert("error");
        }
    }

    
  return (
    <form onSubmit={handleOnSubmit}>
        {columns.map((column,index) => (
                <InputDynamicForm type={column.type} name={column.key} value={data[column.key]} key={index}/>
        ))}

        <button type="submit">Submit</button>
    </form>
  )
}
