"use client";

import prisma from "@/utils/prisma";
import { Event } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import Table from "../../table";

interface Props {
  Events: Event[];
}

const Index: NextPage<Props> = ({ Events }) => {
  useEffect(() => {
    console.log(Events, "page");
  }, [Events]);
  return <Table components={Events}></Table>;
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await prisma.event.findFirst();
  console.log(events, "getstaticprops");
  return { props: { events } };
};

export default Index;
