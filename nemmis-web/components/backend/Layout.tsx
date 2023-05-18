"use client"
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Menu from "./Menu";

function Layout({ children }: { children: ReactNode }) {

  const [open, setOpen] = useState(false);

  const handleOnClickToggle = () => {
    setOpen(!open);
  }

  return (
    <main className="flex">
      <Sidebar open={open}/>
      <div className="w-full">
        <Menu onClickToggle={handleOnClickToggle}/>
        {children}
      </div>
    </main>
  );
}

export default Layout;
