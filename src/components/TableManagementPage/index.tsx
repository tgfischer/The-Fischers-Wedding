import { Button, Container } from "react-bootstrap";

import { GuestDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { GuestsSection } from "./GuestsSection";

export type TableManagementPageProps = {
  guests: GuestDto[];
};

export const TableManagementPage = ({ guests }: TableManagementPageProps) => {
  return (
    <Page
      className="vh-100 d-flex flex-column overflow-hidden"
      pageTitle="Manage tables"
    >
      <NavBar className="mb-3 flex-shrink-1" active="tables" />
      <Container className="d-flex align-items-center justify-content-between mb-1">
        <h3 className="m-0">Manage tables</h3>
        <Button>Add table</Button>
      </Container>
      <Container className="d-flex flex-row flex-grow-1 overflow-hidden p-0">
        <GuestsSection
          className="border overflow-auto ms-3 mb-3"
          style={{ flex: "0 0 40%" }}
          guests={guests}
        />
        <div className="flex-grow-1 border overflow-auto p-3 mx-3 mb-3 ">
          Hello, World!
        </div>
      </Container>
    </Page>
  );
};
