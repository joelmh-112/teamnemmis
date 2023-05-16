"use client";

import { Translation } from "@prisma/client";
import { useEffect, useState } from "react";

export interface IColumnType<T> {
  key: string;
  title: string;
  width?: number;
  popup?: boolean;
}

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

export function Table<T>({ data, columns }: Props<T>) {
  const [components, setComponents] = useState<any[]>([]);
  useEffect(() => {
    components && setComponents(Object.keys(components[0]));
  }, [components]);

  return (
    <table>
      <thead>
        <tr>
          {components.map((e) => (
            <th key={e}> {e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {components.map((e) => {
          return (
            <tr key={e.id || "noID"}>
              {components.map((f: any) => (
                <td key={f || "noID"}>{e[f]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
