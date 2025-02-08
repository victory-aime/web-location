import { Colors } from "_/theme/colors";
import { VariablesColors } from "_/theme/variables";
import { Weeklys } from "_/utils/generate";
import { HomeIcon } from "_assets/svg";

const statData = [
  {
    icon: HomeIcon,
    title: "Depense",
    color: "red" as keyof Colors, // <-- TypeScript comprend que "red" appartient à Colors
    badgeColor: "red",
    percent: 0.9,
    value: 850000,
    iconColor: VariablesColors.red,
  },
  {
    icon: HomeIcon,
    title: "Balance",
    color: "blue" as keyof Colors,
    badgeColor: "blue",
    percent: 0.2,
    value: 85000,
    iconColor: VariablesColors.blue,
  },
  {
    icon: HomeIcon,
    title: "Sales",
    color: "secondary" as keyof Colors,
    badgeColor: "orange",
    percent: 0.6,
    value: 65000,
    iconColor: VariablesColors.secondary,
  },
  {
    icon: HomeIcon,
    title: "Revenu",
    color: "primary" as keyof Colors,
    badgeColor: "green",
    percent: 0.3,
    value: 45000,
    iconColor: VariablesColors.primary,
  },
];

  const formated = () => {
    return Weeklys().map((month) => ({
      month,
      values: {
        EXPECTED_AMOUNT: Math.floor(Math.random() * 10000) + 500,
        RECEIVED_AMOUNT: Math.floor(Math.random() * 8000) + 200,
      },
    }));
  };

  const barChartData = formated()?.map(
    (item: {
      month: string;
      values: { EXPECTED_AMOUNT: number; RECEIVED_AMOUNT: number };
    }) => ({
      date: item?.month,
      values: {
        EXPECTED_AMOUNT: item.values.EXPECTED_AMOUNT,
        RECEIVED_AMOUNT: item.values.RECEIVED_AMOUNT,
      },
    })
  );

export { statData, barChartData };
