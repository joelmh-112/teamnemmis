import { ReactNode } from "react";
import Menu from "@/components/backend/Menu";

function Layout({ children }: { children: ReactNode }) {
  return <div><Menu/>{children}</div>;
}

export default Layout;
