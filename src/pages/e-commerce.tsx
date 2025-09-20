import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SvgIcon } from "../components/svg-icon";
import { useTheme } from "../hooks/use-theme";

const CARD_DETAILS = [
  { title: "Customers", count: "3,781", percentage: +11.01 },
  { title: "Orders", count: "1,219", percentage: -0.03 },
  { title: "Revenue", count: "$695", percentage: +15.03 },
  { title: "Growth", count: "30.1%", percentage: +6.08 },
];

const getCardPaddingClass = (idx: number) => {
  switch (idx) {
    case 0:
      return "pr-3.5 pb-3.5";
    case 1:
      return "pl-3.5 pb-3.5";
    case 2:
      return "pr-3.5 pt-3.5";
    case 3:
      return "pl-3.5 pt-3.5";
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

const Card: React.FC<{
  title: string;
  count: string;
  percentage: number;
  index: number;
}> = ({ title, count, percentage, index }) => {
  return (
    <div
      className={`rounded-2xl flex flex-col gap-2 p-6 w-full ${getCardBgClass(
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
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const projections = [21, 27, 24, 29, 19, 26]; // in millions
  const actuals = [17, 21, 18, 23, 16, 22]; // in millions
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

const Ecommerce = () => {
  return (
    <div className="flex flex-col flex-1 w-full h-full text-sm gap-4">
      <p className="font-semibold text-light-black dark:text-white px-2 py-1">
        eCommerce
      </p>
      <div className="flex gap-7">
        <div className="flex flex-wrap w-1/2">
          {CARD_DETAILS.map((card, idx) => {
            return (
              <div
                key={card.title}
                className={`w-1/2 ${getCardPaddingClass(idx)}`}
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
        <div className="w-1/2">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
