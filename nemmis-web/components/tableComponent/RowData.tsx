import { ReactNode, useEffect, useState } from "react";
import { ColumnType } from "@/utils/ColumnType";
import { Text, Translation } from "@prisma/client";
import Link from "next/link";

interface Props {
  data: any;
  type: ColumnType;
}

function RowColumnData({ data, type }: Props) {
  const [parsedData, setParsedData] = useState<string | ReactNode>("");

  useEffect(() => {
    setParsedData(parseData(data));
  }, [data]);

  const parseData = (data: any) => {
    let parsedData: string | ReactNode = "";
    if (!data) return parsedData;

    switch (type) {
      case ColumnType.bigint:
        parsedData = data.toString();
        break;
      case ColumnType.string:
        parsedData = data;
        break;
      case ColumnType.date:
        const dateTry = new Date(data);
        if (dateTry.toString() !== "Invalid Date") {
          parsedData = `${dateTry.getDate()}/${
            dateTry.getMonth() + 1
          }/${dateTry.getFullYear()} ${dateTry.getHours()}:${dateTry.getMinutes()}`;
          break;
        }
        parsedData = "Invalid Date";
        break;
      case ColumnType.Text:
        let text = data as Text & { Translations?: Translation[] };
        parsedData = (
          <>
            {text.Translations?.map((t, index) => (
              <p key={index}>{t.text}</p>
            ))}
          </>
        );
        break;
      case ColumnType.array:
        parsedData = data.length;
        break;
      case ColumnType.link:
        parsedData = (
          <Link href={data}>
            {data.substring(0, 20)}
            {data.length > 20 && "..."}
          </Link>
        );
      default:
        parsedData = data ? data.toString() : "";
        break;
    }
    return parsedData;
  };

  return <td>{parsedData}</td>;
}

export default RowColumnData;
