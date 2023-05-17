import { ActionOptions } from "@/utils/TableAction";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button(props: Props) {
  const { children, className, onClick } = props;

  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className={`${className} text-white bg-black p-2 rounded-md `}
      onClick={() => {
        handleOnClick();
      }}
    >
      {children}
    </button>
  );
}
