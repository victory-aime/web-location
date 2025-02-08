import React, { FC, useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Plugin,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Center,
  createListCollection,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { extractArrays } from "./utils/charts.utils";
import { FiBarChart2 } from "react-icons/fi";
import { BoxIcon } from "_app/private/dashboard/components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type FormatData = {
  date: string[];
  values: Record<string, number[]>;
  maxValues?: Record<string, number>;
};

const BarChart: FC<any> = ({ dataChart, loader, color }) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  const [formatData, setFormatData] = useState<FormatData>({
    date: [],
    values: {},
  });

  useEffect(() => {
    if (dataChart) {
      setFormatData(extractArrays(dataChart));
    }
  }, [dataChart]);

  const getTranslatedLabel = (data: string[] = []) => {
    return data;
  };

  const data: ChartData<"bar"> = {
    labels: getTranslatedLabel(formatData.date),
    datasets: Object.keys(formatData.values).map((key, index) => ({
      label: "BAR_CHART." + key.toUpperCase(),
      data: formatData.values[key],
      backgroundColor: color[index % color.length],
      stack: `Stack ${index}`,
      borderRadius: 999,
    })),
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    animation: {
      duration: 400,
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: false,
        border: {
          display: false,
        },
        grid: {
          display: false,
          offset: true,
        },
      },
      y: {
        display: false,
        ticks: {
          stepSize: Math.ceil(
            Math.max(
              ...Object.keys(formatData.maxValues ?? {}).map(
                (key) => formatData.maxValues?.[key] ?? 0
              )
            ) / 5
          ),
        },
        stacked: true,
        border: {
          display: false,
        },
      },
    },
  };

  const hoverSegment: Plugin<"bar"> = {
    id: "hoverSegment",
    beforeDatasetsDraw: (chart) => {
      const {
        data,
        ctx,
        tooltip,
        chartArea: { top, height },
        scales: { x },
      } = chart;

      ctx.save();

      const segmentWidth = x.width / (data.labels?.length ?? 1) - 20;

      if (tooltip && Array.isArray(tooltip.active) && tooltip.active[0]) {
        const activeElement = tooltip.active[0];
        const xCoor =
          x.getPixelForValue(activeElement.index) - segmentWidth / 2;
        const gradient = ctx.createLinearGradient(
          xCoor,
          top,
          xCoor + segmentWidth,
          top
        );
        gradient.addColorStop(0, "rgba(6, 82, 76, 0.2)");
        gradient.addColorStop(1, "rgba(6, 82, 76, 1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(xCoor, top, 50, height);
      }

      ctx.restore();
    },
  };

  return (
    <Box minH={"100%"}>
      <Flex gap={"10px"} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={{ base: "xs", md: "medium" }}>
          Weekly Incomes vs Expenses
        </Text>
        <BoxIcon color={"primary.500"}>
          <FiBarChart2 />
        </BoxIcon>
      </Flex>
      {!dataChart || loader ? (
        <Spinner />
      ) : (
        <Box>
          <Box width={"100%"} minHeight={"300px"} mt={"30px"} mb={"30px"}>
            {Math.max(...Object?.values(formatData?.maxValues || {})) <
            0 ? null : (
              <Bar
                ref={chartRef}
                data={data}
                options={options}
                plugins={[hoverSegment]}
              />
            )}
          </Box>
          <Center mt={"20px"}>
            <Flex py={"10px"}>Legend</Flex>
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default BarChart;
