import { Table } from "@/components/Table";
import { PrismaClient, Translation } from "@prisma/client";

import "../../../css/table.css";

interface MyEvent {
  id: string;
  title: string | undefined;
  description: string | undefined;
  date: string;
}

export default async function Index() {
  const events = await getData();

  return <Table components={events}></Table>;
}

async function getData() {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany();
  const aux: MyEvent[] = await Promise.all(
    events.map(async (e) => {
      const description = (
        await prisma.translation.findFirst({
          where: { text_id: e.description_text_id },
          select: { text: true },
        })
      )?.text;
      const title = (
        await prisma.translation.findFirst({
          where: { text_id: e.title_text_id },
          select: { text: true },
        })
      )?.text;
      const aux: MyEvent = {
        id: e.id.toString(),
        date: e.date.toString(),
        description,
        title,
      };

      return aux;
    })
  );
  return aux;
}
