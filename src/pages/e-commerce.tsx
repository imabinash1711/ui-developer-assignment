import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SvgIcon } from "../components/svg-icon";
import { useTheme } from "../hooks/use-theme";
import React, { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { Table } from "../components/table";

const CARD_DETAILS = [
  { title: "Customers", count: "3,781", percentage: +11.01 },
  { title: "Orders", count: "1,219", percentage: -0.03 },
  { title: "Revenue", count: "$695", percentage: +15.03 },
  { title: "Growth", count: "30.1%", percentage: +6.08 },
];

const CITY_DETAILS = [
  { city: "New York", percentage: 72 },
  { city: "San Francisco", percentage: 39 },
  { city: "Sydney", percentage: 25 },
  { city: "Singapore", percentage: 61 },
];

const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const projections = [21, 27, 24, 29, 19, 26]; // in millions
const actuals = [17, 21, 18, 23, 16, 22]; // in millions
const HEADERS = ["name", "price", "quantity", "amount"];

const getCardPaddingClass = (idx: number) => {
  switch (idx) {
    case 0:
      return "md:pr-3.5 md:pb-3.5";
    case 1:
      return "md:pl-3.5 md:pb-3.5";
    case 2:
      return "md:pr-3.5 md:pt-3.5";
    case 3:
      return "md:pl-3.5 md:pt-3.5";
    default:
      return "";
  }
};

const getCardBgClass = (idx: number) => {
  switch (idx) {
    case 0:
      return "bg-primary-blue text-light-black fill-light-black";
    case 1:
      return "bg-primary-light dark:bg-white/5 text-light-black dark:text-white fill-light-black dark:fill-white";
    case 2:
      return "bg-primary-light dark:bg-white/5 text-light-black dark:text-white fill-light-black dark:fill-white";
    case 3:
      return "bg-primary-purple text-light-black";
    default:
      return "";
  }
};

function getHeader(key: string): string {
  switch (key) {
    case "name":
      return "Name";
    case "price":
      return "Price";
    case "quantity":
      return "Quantity";
    case "amount":
      return "Amount";
    default:
      return "";
  }
}

function getCell(product: Product, key: string) {
  switch (key) {
    case "name":
      return <p>{product.name}</p>;
    case "price":
      return <p>{product.price}</p>;
    case "quantity":
      return <p>{product.quantity}</p>;
    case "amount":
      return <p>{product.amount}</p>;
    default:
      return <p>-</p>;
  }
}

const Card: React.FC<{
  title: string;
  count: string;
  percentage: number;
  index: number;
}> = ({ title, count, percentage, index }) => {
  return (
    <div
      className={`rounded-2xl flex flex-col gap-2 p-6 w-full min-w-fit ${getCardBgClass(
        index
      )}`}
    >
      <p className="font-semibold text-sm">{title}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">{count}</p>
        <div className="flex items-center text-xs gap-1">
          <p>{`${percentage > 0 ? "+" : ""}${percentage}%`}</p>
          <SvgIcon
            id="ArrowRise"
            size={16}
            className={`${percentage < 0 ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

const BarChart: React.FC = () => {
  const { theme } = useTheme();
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: theme === "dark" ? "#FFFFFF0D" : "#F7F9FB",
      borderRadius: 16,
      height: "252px",
      spacing: [24, 24, 24, 24],
    },
    title: {
      text: "Projections vs Actuals",
      style: {
        color: theme === "dark" ? "#FFFFFF" : "#1C1C1C",
        fontSize: "14px",
        fontWeight: "600",
      },
      align: "left",
    },
    xAxis: {
      categories: categories,
      labels: {
        style: { color: theme === "dark" ? "#FFFFFF66" : "#1C1C1C66" },
      },
    },
    yAxis: {
      min: 0,
      title: { text: "" },
      labels: {
        formatter: function () {
          return this.value + "M";
        },
        style: { color: theme === "dark" ? "#FFFFFF66" : "#1C1C1C66" },
      },
      gridLineColor: theme === "dark" ? "#FFFFFF1A" : "#1C1C1C0D",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        grouping: false,
        borderRadius: 3,
        borderColor: "transparent",
      },
    },
    series: [
      {
        name: "Projections",
        type: "column",
        data: projections,
        color: "#A8C5DA80",
      },
      {
        name: "Actuals",
        type: "column",
        data: actuals,
        color: "#A8C5DA",
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const SeriesLineChart: React.FC = () => {
  const { theme } = useTheme();
  const tooltipFormatter: Highcharts.TooltipFormatterCallbackFunction =
    function (this) {
      let htmlStr = "";
      this.points?.forEach((point) => {
        htmlStr += `<div key=${
          point.series.name
        } style='display: flex; flex-direction: row; color: ${
          point.color
        }; gap: 4px; align-items: center; padding: 4px;'>
        <p style='font-size: 16px; margin-top: -4px;'>&#9679</p>
        <span style='color: ${
          theme === "dark" ? "#FFFFFF" : "#1C1C1C"
        } ; font-size: 12px;'>${point.series.name}</span>
        <span style='color: ${
          theme === "dark" ? "#FFFFFF" : "#1C1C1C"
        } ; font-size: 12px; font-weight:600;'>$${point.y}M</span>
        </div>`;
      });

      return `<div style='display: flex; gap: 16px; align-items: center;'><p style='color: ${
        theme === "dark" ? "#FFFFFF33" : "#1C1C1C33"
      }; font-size: 14px;'>|</p>${htmlStr}</div>`;
    };

  const positioner = function (
    this: Highcharts.Tooltip,
    _labelWidth: number,
    labelHeight: number
  ): { x: number; y: number } {
    return {
      x: this.chart.plotLeft + 32,
      y: this.chart.plotTop - labelHeight - 6,
    };
  };
  const options = {
    chart: {
      type: "spline",
      backgroundColor: theme === "dark" ? "#FFFFFF0D" : "#F7F9FB",
      borderRadius: 16,
      height: "318px",
      spacing: [24, 24, 24, 24],
    },
    title: {
      text: "Revenue",
      style: {
        color: theme === "dark" ? "#FFFFFF" : "#1C1C1C",
        fontSize: "14px",
        fontWeight: "600",
      },
      align: "left",
    },
    xAxis: {
      categories: categories,
      labels: {
        style: { color: theme === "dark" ? "#FFFFFF66" : "#1C1C1C66" },
      },
    },
    yAxis: {
      min: 0,
      title: { text: "" },
      labels: {
        format: "{value}M",
        style: { color: theme === "dark" ? "#FFFFFF66" : "#1C1C1C66" },
      },
      gridLineColor: theme === "dark" ? "#FFFFFF1A" : "#1C1C1C0D",
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      backgroundColor: "transparent",
      formatter: tooltipFormatter,
      useHTML: true,
      style: {
        padding: "5px",
        whiteSpace: "nowrap",
      },
      positioner: positioner,
    },
    plotOptions: {
      spline: {
        lineWidth: 3,
        marker: {
          enabled: false,
          radius: 2,
          symbol: "circle",
        },
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
    series: [
      {
        name: "Current Week",
        data: [18, 11, 13, 20, 22, 20],
        color: theme === "dark" ? "#C6C7F8" : "#1C1C1C",
        zoneAxis: "x",
        zones: [
          {
            value: 3,
          },
          {
            dashStyle: "ShortDash",
            dashLength: 5,
            spaceLength: 20,
          },
        ],
      },
      {
        name: "Previous Week",
        data: [12, 22, 20, 13, 17, 23],
        color: theme === "dark" ? "#A8C5DA" : "#A8C5DA",
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const Map: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 bg-primary-light dark:bg-white/5 h-full rounded-2xl w-full">
      <p className="font-semibold text-light-black dark:text-white">
        Revenue by Location
      </p>
      <img
        src="/assets/world-map.png"
        alt="world-map"
        className="h-20 rounded-lg object-contain"
      />
      {CITY_DETAILS.map((entry) => {
        return (
          <div key={entry.city} className="flex flex-col">
            <div className="flex items-center justify-between text-light-black dark:text-white text-sm w-full">
              <p>{entry.city}</p>
              <p>{entry.percentage}K</p>
            </div>
            <div className="w-full h-0.5 bg-secondary-cyan/40 rounded-full">
              <div
                className="h-0.5 bg-secondary-cyan rounded-full"
                style={{ width: `${Math.min(entry.percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TopSellingProducts: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/assets/jsons/top-selling-products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 bg-primary-light dark:bg-white/5 min-w-full h-full rounded-2xl">
      <p className="font-semibold text-light-black dark:text-white">
        Top Selling Products
      </p>
      <Table
        data={data}
        getCell={getCell}
        getHeader={getHeader}
        headers={HEADERS}
        showRowBorder={false}
      />
    </div>
  );
};

const SalesDonutChart: React.FC = () => {
  const { theme } = useTheme();
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: theme === "dark" ? "#FFFFFF0D" : "#F7F9FB",
      borderRadius: 16,
      spacing: [24, 24, 24, 24],
      height: 344,
    },
    title: {
      text: "Total Sales",
      align: "left",
      style: {
        color: theme === "dark" ? "#FFFFFF" : "#1C1C1C",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    plotOptions: {
      pie: {
        innerSize: "70%",
        borderWidth: 20,
        borderColor: "transparent",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "#1C1C1CCC", // remove default box
      borderWidth: 0,
      shadow: false,
      style: {
        height: 26,
        padding: "4px",
        borderRadius: 8,
        color: "#FFFFFF",
        fontSize: "12px",
        fontWeight: "400",
        textAlign: "center",
      },
      formatter: function () {
        return `${this.percentage?.toFixed(1)}%`;
      },
    },
    legend: {
      useHTML: true,
      enabled: true,
      verticalAlign: "bottom",
      layout: "vertical",
      itemStyle: {
        color: theme === "dark" ? "#FFFFFF" : "#1C1C1C",
        fontSize: "12px",
      },
      itemHoverStyle: {
        color: theme === "dark" ? "#FFFFFF" : "#1C1C1C",
        fontSize: "12px",
        backgroundColor: "transparent",
      },
      symbolHeight: 6,
      symbolWidth: 6,
      symbolRadius: 6,
      itemMarginTop: 12,
      padding: 2,
      labelFormatter: function () {
        const point = this as Highcharts.Point;
        return `
      <div style="
        width: 154px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1px;
      ">
        <span>${point.name}</span>  
        <span>$${point.y?.toFixed(2)}</span>
      </div>`;
      },
    },
    series: [
      {
        type: "pie",
        name: "Sales",
        data: [
          {
            name: "Direct",
            y: 300.56,
            color: theme === "dark" ? "#C6C7F8" : "#1C1C1C",
          },
          {
            name: "Affiliate",
            y: 135.18,
            color: "#BAEDBD",
          },
          {
            name: "Sponsored",
            y: 154.02,
            color: "#95A4FC",
          },
          {
            name: "E-mail",
            y: 48.96,
            color: "#B1E3FF",
          },
        ],
      },
    ],
    credits: { enabled: false },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const Ecommerce = () => {
  return (
    <div className="flex flex-col flex-1 w-full h-full text-sm gap-7">
      <p className="font-semibold text-light-black dark:text-white px-2 py-1">
        eCommerce
      </p>
      <div className="flex md:flex-row flex-col gap-7 -mt-3 w-full">
        <div className="flex flex-wrap gap-4 md:gap-0 w-full">
          {CARD_DETAILS.map((card, idx) => {
            return (
              <div
                key={card.title}
                className={`md:w-1/2 w-full ${getCardPaddingClass(idx)}`}
              >
                <Card
                  title={card.title}
                  count={card.count}
                  percentage={card.percentage}
                  index={idx}
                />
              </div>
            );
          })}
        </div>
        <div className="md:w-1/2 w-full">
          <BarChart />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-7 w-full">
        <div className="md:w-3/4 w-full md:min-h-full">
          <SeriesLineChart />
        </div>
        <div className="flex-1 md:w-1/4 w-full h-full">
          <Map />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-7 w-full">
        <div className="md:w-3/4 w-full md:min-h-full">
          <TopSellingProducts />
        </div>
        <div className="flex-1 md:w-1/4 w-full h-full">
          <SalesDonutChart />
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
