import { useFormikContext } from "formik";
import { useEffect } from "react";

export const ProfitCalculator = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const { price, articlePrice } = values;

    if (price && articlePrice) {
      const profit = price - articlePrice;
      const profitMargin = price > 0 ? (profit / price) * 100 : 0;

      setFieldValue("profit", profit.toFixed(2));
      setFieldValue("profitMargin", `${profitMargin.toFixed(2)}`);
    }
  }, [values.price, values.articlePrice, setFieldValue]);

  return null;
};
