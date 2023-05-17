"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import RowColumnData from "./RowData";
import { ColumnType } from "@/utils/ColumnType";
import Button from "@/components/backend/Button";
import { ActionOptions } from "@utils/TableAction";

export interface IColumnType {
  key: string;
  title: string;
  popup?: boolean;
  type: ColumnType;
}

export interface Props {
  columns: IColumnType[];
  data: any[];
  onClick: (action: ActionOptions | undefined, row: number) => void;
}

export function Table({ data, columns, onClick }: Props) {
  const handleOnClickButton = (
    action: ActionOptions | undefined,
    row: number
  ) => {
    onClick(action, row);
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="capitalize">
              {column.title}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <RowColumnData
                key={column.key}
                data={row[column.key]}
                type={column.type}
              />
            ))}
            <td>
              <Button
                className={"bg-green-600"}
                onClick={() => {
                  handleOnClickButton(ActionOptions.edit, row.id);
                }}
              >
                <PencilSquareIcon className="h-6 w-6" />
              </Button>
              <Button
                className={"bg-red-600"}
                onClick={() => {
                  handleOnClickButton(ActionOptions.delete, row.id);
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
