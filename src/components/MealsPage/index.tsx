import { User } from "@supabase/supabase-js";
import { Container, Row, Col } from "react-bootstrap";

import { MealRestrictionDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { MealsTable } from "./MealsTable";

export type MealsPageProps = {
  meals: MealRestrictionDto[];
  user: User | null;
};

export const MealsPage = ({ meals, user }: MealsPageProps): JSX.Element => (
  <Page pageTitle="Meal Restrictions">
    <NavBar className="mb-3" active="meals" user={user} />
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
