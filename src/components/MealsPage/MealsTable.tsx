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
        <th>Table number</th>
      </tr>
    </thead>
    <tbody>
      {meals.length === 0 ? (
        <tr>
          <td colSpan={2} className="text-center">
            There are no meal restrictions yet
          </td>
        </tr>
      ) : (
        meals.map(({ id, firstName, lastName, meal, tableNumber }) => (
          <tr key={id}>
            <td>
              {firstName} {lastName}
            </td>
            <td>{meal}</td>
            <td>{tableNumber}</td>
          </tr>
        ))
      )}
    </tbody>
  </Table>
);
