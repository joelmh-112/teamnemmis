"use client";

import { ColumnType } from "@/utils/ColumnType";
import { Type } from "@/utils/Type";
import { Translation } from "@prisma/client";
import { ReactNode, useEffect, useState } from "react";


import TextTranslationsInputValue from "./TextTranslationsInputValue";

interface Props {
  type: ColumnType;
  name: string;
  value: any;
}

export default function InputDynamicForm(props: Props) {

  
  const [children, setChildren] = useState<ReactNode>();
  const [value, setValue] = useState<any>(props.value);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
    

  useEffect(() => {
    switch (props.type) {
      case ColumnType.Text:
      
        setChildren(
          <TextTranslationsInputValue onChange={handleOnChange} value={value} name={props.name}/>
        );
        break;
      case ColumnType.string:
        setChildren("text");
        break;
      case ColumnType.bigint:
        setChildren("number");
        break;
      case ColumnType.boolean:
        setChildren("checkbox");
        break;
      case ColumnType.date:
        setChildren("date");
        break;
      case ColumnType.email:
        setChildren("email");
        break;
      default:
        setChildren("text");
        break;
    }
  }, [props.type]);

  return <>{children}</>;
}
