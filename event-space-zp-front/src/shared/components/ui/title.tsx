import { HTMLAttributes, PropsWithChildren } from "react";

interface TitleProps extends PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement>
> {
  className?: string;
}

export default function Title({
  className = "",
  children,
  ...rest
}: TitleProps) {
  return (
    <h1
      className={`text-3xl text-primary font-bold mb-3 ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
}
