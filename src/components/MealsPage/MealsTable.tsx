import { Table } from "react-bootstrap";

import { MealRestrictionDto } from "../../types";

type MealsTableProps = {
  meals: MealRestrictionDto[];
};

export const MealsTable = ({ meals }: MealsTableProps): JSX.Element => (
  <Table responsive striped bordered>
    <thead>
      <tr>
        <th>Meal Restriction</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {meals.map(({ restriction, name }) => (
        <tr key={name}>
          <td>{restriction}</td>
          <td>{name}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);
