'use client';

import DonutChart from '_/components/custom/charts/DonutChart';
import BoxContainer from '_/components/custom/container/BoxContainer';
import React from 'react';

export const MonthlyIncomes = () => {
  const dataChart = [
    { category: 'DONUT_CHART.CATEGORY.SCHOLARSHIP', count: 1500 },
    { category: 'DONUT_CHART.CATEGORY.EXPENSES', count: 700 },
    { category: 'DONUT_CHART.CATEGORY.EXPENSES_MISCELLANEOUS', count: 300 },
    { category: 'DONUT_CHART.CATEGORY.REVENUES', count: 200 },
  ];

  const setPeriodicity = () => {};

  const currency = {
    symbol: '$',
    decimals: 3,
  };

  const centerText = 'Total';
  const backgroundColors = ['#079e82', '#F6A724', '#072a38', '#71717a'];

  return (
    <BoxContainer>
      <DonutChart
        dataChart={dataChart}
        periodicity="Annuellement"
        setPeriodicity={setPeriodicity}
        loader={false}
        currency={currency}
        centerText={centerText}
        title={'DONUT_CHART.FINANCE_INCOMES&OUTCOMES'}
        backgroundColors={backgroundColors}
      />
    </BoxContainer>
  );
};
