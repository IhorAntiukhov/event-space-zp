import { HTMLAttributes, PropsWithChildren } from "react";

interface TextProps extends PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> {
  className?: string;
}

export default function Text({ className = "", children, ...rest }: TextProps) {
  return (
    <p className={className} {...rest}>
      {children}
    </p>
  );
}
