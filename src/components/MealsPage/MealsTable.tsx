import { Table } from "react-bootstrap";

import { MealRestrictionDto } from "../../types";

type MealsTableProps = {
  meals: MealRestrictionDto[];
};

export const MealsTable = ({ meals }: MealsTableProps): JSX.Element => (
  <Table responsive striped bordered>
    <thead>
      <tr>
        <th>Table number</th>
        <th>Name</th>
        <th>Meal Restriction</th>
      </tr>
    </thead>
    <tbody>
      {meals.length === 0 ? (
        <tr>
          <td colSpan={3} className="text-center">
            There are no meal restrictions yet
          </td>
        </tr>
      ) : (
        meals.map(({ id, firstName, lastName, meal, tableNumber }) => (
          <tr key={id}>
            <td>{tableNumber ?? <i>No table assigned</i>}</td>
            <td>
              {firstName} {lastName}
            </td>
            <td>{meal}</td>
          </tr>
        ))
      )}
    </tbody>
  </Table>
);
