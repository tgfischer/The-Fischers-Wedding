import { Button, Container } from "react-bootstrap";

import { useModal } from "../../hooks/useModal";
import { GuestDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { AddTableModal } from "./AddTableModal";
import { GuestsSection } from "./GuestsSection";
import { TableSection } from "./TablesSection";

export type TableManagementPageProps = {
  guests: GuestDto[];
};

export const TableAssignmentsPage = ({ guests }: TableManagementPageProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Page
      className="vh-100 d-flex flex-column overflow-hidden"
      pageTitle="Table assignments"
    >
      <NavBar className="mb-3 flex-shrink-1" active="tables" />
      <Container className="d-flex align-items-center justify-content-between mb-1">
        <h3 className="m-0">Table assignments</h3>
        <Button onClick={openModal}>Add table</Button>
      </Container>
      <Container className="d-flex flex-row overflow-hidden">
        <GuestsSection
          className="border overflow-auto mb-3"
          style={{ flex: "0 0 40%" }}
          guests={guests}
        />
        <TableSection className="flex-grow-1 border overflow-auto ms-3 mb-3" />
        <AddTableModal isOpen={isOpen} onHide={closeModal} />
      </Container>
    </Page>
  );
};