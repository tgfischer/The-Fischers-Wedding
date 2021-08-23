import { ComponentWithChildrenProps } from "../types";

import { useAuthRouter } from "./hooks";

export const AuthRouter = ({
  children
}: ComponentWithChildrenProps): JSX.Element => {
  useAuthRouter();
  return <>{children}</>;
};
