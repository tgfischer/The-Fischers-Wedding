import { User } from "@supabase/supabase-js";
import { Button, Container } from "react-bootstrap";

import { useModal } from "../../hooks/useModal";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { AddTableModal } from "./AddTableModal";
import { GuestsSection } from "./GuestsSection";
import { TableSection } from "./TablesSection";

export type TableAssignmentsPageProps = {
  user: User | null;
};

export const TableAssignmentsPage = ({ user }: TableAssignmentsPageProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Page
      className="vh-100 d-flex flex-column overflow-hidden"
      pageTitle="Table assignments"
    >
      <NavBar className="mb-3 flex-shrink-1" active="tables" user={user} />
      <Container className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Table assignments</h3>
        <Button onClick={openModal}>Add table</Button>
      </Container>
      <Container className="d-flex flex-row overflow-hidden">
        <GuestsSection
          className="border overflow-auto mb-3"
          style={{ flex: "0 0 55%" }}
        />
        <TableSection className="flex-grow-1 border overflow-auto ms-3 mb-3" />
        <AddTableModal isOpen={isOpen} onHide={closeModal} />
      </Container>
    </Page>
  );
};
