import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function Show(props: Props) {
  const { title, children } = props;
  return (
    <div className="p-4">
      <h1>{title}</h1>
      <br/>
      {children}
    </div>
  );
}

export default Show;
