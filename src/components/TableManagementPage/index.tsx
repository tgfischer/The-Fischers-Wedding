import { Container, ListGroup } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import type { TableManagementPageProps } from "./types";

export * from "./types";

export const TableManagementPage = ({ guests }: TableManagementPageProps) => {
  return (
    <Page
      className="vh-100 d-flex flex-column overflow-hidden"
      pageTitle="Manage tables"
    >
      <NavBar className="mb-3 flex-shrink-1" active="tables" />
      <Container>
        <h3>Manage tables</h3>
      </Container>
      <Container className="d-flex flex-row flex-grow-1 p-0 overflow-hidden">
        <ListGroup
          className="ms-3 mb-3 border overflow-auto"
          style={{ flex: "0 0 40%" }}
          variant="flush"
        >
          {guests.map(({ id, firstName, lastName }) => (
            <ListGroup.Item key={id}>
              {firstName} {lastName}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="p-3 mx-3 mb-3 flex-grow-1 border overflow-auto">
          Hello, World!
        </div>
      </Container>
    </Page>
  );
};
