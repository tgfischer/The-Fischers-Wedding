import { Container, Row, Col } from "react-bootstrap";

import { MealRestrictionDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { MealsTable } from "./MealsTable";

export type MealsPageProps = {
  meals: MealRestrictionDto[];
};

export const MealsPage = ({ meals }: MealsPageProps): JSX.Element => (
  <Page pageTitle="Meal Restrictions">
    <NavBar className="mb-3" active="meals" />
    <Container>
      <Row>
        <Col sm={12}>
          <h3>Meal Restrictions</h3>
          <MealsTable meals={meals} />
        </Col>
      </Row>
    </Container>
  </Page>
);
