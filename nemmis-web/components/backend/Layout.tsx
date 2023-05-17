import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Menu from "./Menu";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full">
        <Menu />
        {children}
      </div>
    </main>
  );
}

export default Layout;
