import clsx from "clsx";
import { FC } from "react";

const BaseSection: FC<{ className?: string }> = ({ className, children }) => (
  <div className={clsx(className, "border p-3 mb-3")}>{children}</div>
);

const SectionHeader: FC = ({ children }) => <h5>{children}</h5>;

export const Section = Object.assign(BaseSection, { Header: SectionHeader });
