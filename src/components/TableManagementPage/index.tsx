import { NavBar } from "../NavBar";
import { Page } from "../Page";

export const TableManagementPage = () => {
  return (
    <Page pageTitle="Manage tables">
      <NavBar className="mb-3" active="tables" />
      <h3>Manage tables</h3>
    </Page>
  );
};
