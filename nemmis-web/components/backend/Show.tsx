import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function Show(props: Props) {
  const { title, children } = props;
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
}

export default Show;
