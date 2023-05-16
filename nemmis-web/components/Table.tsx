"use client";

import { useEffect, useState } from "react";

type Props = {
  components: any[];
};

export const Table = ({ components }: Props) => {
  const [columns, setColumns] = useState<any[]>([]);
  useEffect(() => {
    components && setColumns(Object.keys(components[0]));
  }, [components]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((e) => (
            <th key={e}> {e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {components.map((e) => {
          return (
            <tr key={e.id || "noID"}>
              {columns.map((f: any) => (
                <td key={f || "noID"}>{e[f]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
