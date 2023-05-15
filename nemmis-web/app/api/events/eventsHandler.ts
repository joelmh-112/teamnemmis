import prisma from "@/utils/prisma";

export default function eventsHandler() {
  return prisma.event.findFirst();
}
