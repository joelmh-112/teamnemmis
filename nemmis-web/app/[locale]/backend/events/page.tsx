"use client";

import { Table } from "@/components/Table";
import { Event, PrismaClient } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";

interface Props {
  Events: Event[];
}

const Index: NextPage<Props> = ({ Events }) => {
  useEffect(() => {
    console.log(Events);
  }, [Events]);
  return <Table components={Events}></Table>;
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const events = await prisma.event.findFirst();
  return { props: { events } };
};

export default Index;
