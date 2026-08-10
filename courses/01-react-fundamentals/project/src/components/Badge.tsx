import type { ReactNode } from "react";
interface BadgeProps {
  children?: ReactNode;
  variant?: "default" | "category" | "priority" | "tag";
}

export default function Badge(_props: BadgeProps) {
  return <span data-variant={_props.variant}>{_props.children}</span>;
}
