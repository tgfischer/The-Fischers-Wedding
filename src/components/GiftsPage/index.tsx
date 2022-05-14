import { Container, Row, Col, Button } from "react-bootstrap";

import { useModal } from "../../hooks/useModal";
import { GiftDto, GiftGuestDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { AddGiftModal } from "./AddGiftModal";
import { GiftsTable } from "./GiftsTable";
import { useGiftsQuery } from "./hooks";

export type GiftsPageProps = {
  guests: GiftGuestDto[];
  gifts: GiftDto[];
};

export const GiftsPage = ({ guests, gifts }: GiftsPageProps): JSX.Element => {
  const { data } = useGiftsQuery({ initialData: gifts });
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <Page pageTitle="Gifts">
      <NavBar className="mb-3" active="gifts" />
      <Container>
        <Row>
          <Col sm={12}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <h3>Received gifts</h3>
              <Button onClick={() => openModal()}>Add gift</Button>
            </div>
            <GiftsTable gifts={data} />
          </Col>
        </Row>
        <AddGiftModal isOpen={isOpen} onHide={closeModal} guests={guests} />
      </Container>
    </Page>
  );
};
