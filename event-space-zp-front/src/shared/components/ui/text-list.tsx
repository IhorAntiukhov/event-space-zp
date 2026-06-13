import { HTMLAttributes, PropsWithChildren } from "react";

interface TextListProps extends PropsWithChildren<HTMLAttributes<HTMLUListElement>> {
  className?: string;
}

export default function TextList({ className = "", children, ...rest }: TextListProps) {
  return (
    <ul className={className} {...rest}>
      {children}
    </ul>
  );
}
