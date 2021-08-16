import { ReactNode } from "react";

export type ComponentProps = {
  className?: string;
};

export type ComponentWithChildrenProps = ComponentProps & {
  children: ReactNode;
};
