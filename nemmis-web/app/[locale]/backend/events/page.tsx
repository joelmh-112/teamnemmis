"use server";
import { IColumnType, Table } from "@/components/tableComponent/Table";
import { PrismaClient, language_code } from "@prisma/client";

import "../../../css/table.css";
import { useLocale } from "next-intl";

interface MyEvent {
  date: string;
  id: string;
  titles: Text[];
  descriptions: Text[];
}

interface Text {
  text: string;
  language_code: language_code;
}

export default async function Index() {
  "use server";
  const events = await getData(useLocale());

  console.log(
    JSON.stringify(
      events,
      (key, value) => (typeof value === "bigint" ? value.toString() : value),
      2
    ),
    "events"
  );

  const columns: IColumnType<MyEvent>[] = [
    { key: "title", title: "title", popup: true },
    { key: "description", title: "description", popup: true },
    { key: "date", title: "date" },
    { key: "id", title: "id" },
  ];
  const data: MyEvent[] = [];

  return <Table columns={columns} data={data}></Table>;
}

async function getData(locale: string) {
  const prisma = new PrismaClient();

  return (
    await prisma.event.findMany({
      select: {
        Title: {
          select: {
            Translations: { select: { text: true, language_code: true } },
          },
        },
        Description: {
          select: {
            Translations: { select: { text: true, language_code: true } },
          },
        },
        date: true,
        id: true,
      },
    })
  ).map((e) => {
    return {
      date: e.date.toString(),
      id: e.id.toString(),
      titles: e.Title.Translations,
      description: e.Description.Translations,
    };
  });
}
