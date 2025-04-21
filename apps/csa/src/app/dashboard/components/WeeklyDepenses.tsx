'use client'

import { BoxContainer } from '_components/custom'
import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import BarChart from '_components/custom/charts/BarChart'
import { barChartData } from './data/data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const WeeklyDepenses = () => {
  return (
    <BoxContainer>
      <BarChart dataChart={barChartData} color={['#079e82', '#F6A724']} />
    </BoxContainer>
  )
}
