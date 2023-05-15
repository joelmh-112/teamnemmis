"use client";

import { useEffect, useState } from "react";

type Props = {
  components?: any[];
};

export const Table = ({ components }: Props) => {
  /* 
    id: bigint;
    title_text_id: bigint;
    description_text_id: bigint;
    date: Date; */

  const [columns, setColumns] = useState<any[]>([]);
  useEffect(() => {
    components && setColumns(Object.keys(components[0]));

    console.log(components, "table");
  }, [components]);

  return (
    <table>
      <tr></tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
      <tr>
        <td>Ernst Handel</td>
        <td>Roland Mendel</td>
        <td>Austria</td>
      </tr>
      <tr>
        <td>Island Trading</td>
        <td>Helen Bennett</td>
        <td>UK</td>
      </tr>
      <tr>
        <td>Laughing Bacchus Winecellars</td>
        <td>Yoshi Tannamuri</td>
        <td>Canada</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
      </tr>
    </table>
  );
};
