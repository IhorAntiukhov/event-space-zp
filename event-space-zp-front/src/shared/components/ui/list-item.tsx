import { HTMLAttributes, PropsWithChildren } from "react";

interface ListItemProps extends PropsWithChildren<
  HTMLAttributes<HTMLLIElement>
> {
  className?: string;
}

export default function ListItem({
  className = "",
  children,
  ...rest
}: ListItemProps) {
  return (
    <li className={className} {...rest}>
      • {children}
    </li>
  );
}
