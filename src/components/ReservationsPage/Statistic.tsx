export type StatisticProps = {
  statistic: string | number;
  description: string;
};

export const Statistic = ({
  statistic,
  description
}: StatisticProps): JSX.Element => (
  <div className="text-center">
    <h2>{statistic}</h2>
    <p>{description}</p>
  </div>
);
