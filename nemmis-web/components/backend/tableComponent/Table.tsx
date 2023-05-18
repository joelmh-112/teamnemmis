"use client";
import { useEffect, useState } from "react";
import RowColumnData from "./RowData";
import { ColumnType } from "@utils/ColumnType";


export interface IColumnType {
  key: string;
  title: string;
  popup?: boolean;
  type: ColumnType;
}

interface Props {
  columns: IColumnType[];
  data: any[];
}

export function Table({ data,columns }: Props) {  

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="capitalize">{column.title}</th>
          ))}
        </tr>

      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <RowColumnData key={column.key} data={row[column.key]} type={column.type} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
