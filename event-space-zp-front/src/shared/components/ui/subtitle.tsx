import { HTMLAttributes, PropsWithChildren } from "react";

interface SubtitleProps extends PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement>
> {
  className?: string;
}

export default function Subtitle({
  className = "",
  children,
  ...rest
}: SubtitleProps) {
  return (
    <h2 className={`text-xl font-bold mb-2 ${className}`} {...rest}>
      {children}
    </h2>
  );
}
