import { Colors } from "_/theme/colors";
import { VariablesColors } from "_/theme/variables";
import { Weeklys } from "_/utils/generate";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { LuChartNoAxesCombined } from "react-icons/lu";

const statData = [
  {
    icon: <FaMoneyBills />,
    title: "Depense",
    color: "red" as keyof Colors,
    badgeColor: "red",
    percent: 0.9,
    value: 850000,
    iconColor: VariablesColors.red,
  },
  {
    icon: <FaBalanceScaleLeft />,
    title: "Balance",
    color: "blue" as keyof Colors,
    badgeColor: "blue",
    percent: 0.2,
    value: 85000,
    iconColor: VariablesColors.blue,
  },
  {
    icon: <LuChartNoAxesCombined />,
    title: "Sales",
    color: "secondary" as keyof Colors,
    badgeColor: "orange",
    percent: 0.6,
    value: 65000,
    iconColor: VariablesColors.secondary,
  },
  {
    icon: <GiTakeMyMoney />,
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
    labels: item?.month,
    values: {
      EXPECTED_AMOUNT: item.values.EXPECTED_AMOUNT,
      RECEIVED_AMOUNT: item.values.RECEIVED_AMOUNT,
    },
  }),
);

const ordersData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: [
    "Electronics",
    "Home Appliances",
    "Furniture",
    "Clothing",
    "Accessories",
  ][i % 5],
  price: (Math.random() * 1000).toFixed(2),
}));

const recentOrdersData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Command ${i + 1}`,
  category: [
    "Electronics",
    "Home Appliances",
    "Furniture",
    "Clothing",
    "Accessories",
  ][i % 5],
  status: ["NEW", "IN_PROGRESS", "DONE", "REJECTED"][i % 5],
  price: (Math.random() * 1000).toFixed(2),
}));

const totalRecentOrders = {
  orders: 5,
  ordersTable: recentOrdersData,
};

const totalOrders = {
  orders: 20,
  ordersTable: ordersData,
};

export { statData, barChartData, totalOrders, totalRecentOrders };
