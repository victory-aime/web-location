"use client";

import React, { FC, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Flex, Box, Center, Spinner, Text } from "@chakra-ui/react";
import { sum } from "lodash";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BoxIcon } from "../boxIcon";
import { PiChartDonutFill } from "react-icons/pi";
import { NoDataFoundLottieAnimation } from "_lottie/animations/LottieAnimation";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutProps {
  dataChart?: any;
  setPeriodicity: (value: any) => void;
  periodicity: string;
  loader?: boolean;
  backgroundColors?: string[];
  tooltipBackgroundColor?: string;
  tooltipTitleFontSize?: number;
  tooltipBodyFontSize?: number;
  title?: string;
}
const DonutChartV2: FC<any> = ({
  dataChart,
  centerText,
  loader,
  currency,
  backgroundColors = ["#1A3C8A", "#e67300"],
  tooltipBackgroundColor = "#333",
  tooltipTitleFontSize = 12,
  tooltipBodyFontSize = 14,
}) => {
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);
  const sortedData = dataChart?.sort(
    (a: { count: number }, b: { count: number }) => b.count - a.count
  );
  const data = {
    labels: sortedData?.map((item: { category: any }) => item?.category),
    datasets: [
      {
        data: sortedData?.map((item: { count: any }) => item.count),
        backgroundColor: backgroundColors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
  const options: any = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: tooltipBackgroundColor,
        titleFont: { size: tooltipTitleFontSize },
        bodyFont: { size: tooltipBodyFontSize },
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            return value;
          },
        },
      },
    },
    maintainAspectRatio: true,
  };

  const centerTextPlugin = {
    id: "centerText",
    afterDraw(chart: any) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();

      const total = sum(data.datasets[0].data);
      const rawValue = currency ? `${total}` : total.toString();
      let displayValue = rawValue;
      const maxWidth = width * 0.6;
      const tooltipValue = rawValue;

      ctx.font = "bold 16px Poppins";
      const textWidth = ctx.measureText(displayValue).width;
      if (textWidth > maxWidth) {
        displayValue = rawValue.toString();
        while (
          ctx.measureText(displayValue + "...").width > maxWidth &&
          displayValue.length > 0
        ) {
          displayValue = displayValue?.slice(0, -1);
        }
        displayValue += "...";
      }
      ctx.fillStyle = "#079e82";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(displayValue, width / 2, height / 2 + 10);
      chart.canvas.title = tooltipValue;
      if (centerText) {
        ctx.font = "normal 16px Poppins";
        ctx.fillStyle = "#909090";
        ctx.fillText(centerText, width / 2, height / 2 - 10);
      }
      ctx.restore();
    },
  };

  return (
    <Box h="100%">
      <Flex gap={"10px"} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={{ base: "xs", md: "medium" }}>Finance du Mois</Text>
        <BoxIcon color={"secondary.500"}>
          <PiChartDonutFill />
        </BoxIcon>
      </Flex>
      {!dataChart || loader ? (
        <Spinner />
      ) : (
        <Box width={"full"} height={"full"}>
          {dataChart?.length !== 0 ? (
            <Flex
              gap={"20px"}
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Center mt={"20px"}>
                <Doughnut
                  ref={chartRef}
                  data={data}
                  options={options}
                  plugins={[centerTextPlugin]}
                />
              </Center>
              CustomLegend
            </Flex>
          ) : (
            <Center mt={8} minH={"20rem"}>
              <NoDataFoundLottieAnimation />
            </Center>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DonutChartV2;
