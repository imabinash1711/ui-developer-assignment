import { useState, useEffect, useMemo } from "react";
import Input from "../components/input";
import { SvgIcon } from "../components/svg-icon";
import type { Order } from "../types/order-type";
import { Table } from "../components/table";

const ICON_CLASS = "fill-light-black dark:fill-white m-1";
const SIZE = 28;

const headers = [
  "orderId",
  "user",
  "project",
  "address",
  "date",
  "status",
  "action",
];

function getHeaders(key: string) {
  switch (key) {
    case "orderId":
      return "Order ID";
    case "user":
      return "User";
    case "project":
      return "Project";
    case "address":
      return "Address";
    case "date":
      return "Date";
    case "status":
      return "Status";
    default:
      return "";
  }
}

function getStatusClass(key: string) {
  switch (key) {
    case "In Progress":
      return ["fill-secondary-indigo", "text-progress"];
    case "Complete":
      return ["fill-secondary-green", "text-complete"];
    case "Pending":
      return ["fill-secondary-blue", "text-pending"];
    case "Approved":
      return ["fill-secondary-yellow", "text-approved"];
    case "Rejected":
      return [
        "fill-light-black/40 dark:fill-white/40",
        "text-light-black/40 dark:text-white/40",
      ];
    default:
      return "";
  }
}

function getCell(contacts: Record<string, string>) {
  return (order: Order, key: string) => {
    switch (key) {
      case "orderId":
        return <p>{order.orderId}</p>;
      case "user":
        return (
          <div className="flex gap-2 items-center">
            <img
              src={contacts[order.user] || ""}
              alt={order.user}
              className="w-6 h-6 rounded-lg"
            />
            <div className="text-light-black dark:text-white truncate place-self-center -mt-0.5 w-48">
              {order.user}
            </div>
          </div>
        );
      case "project":
        return <p>{order.project}</p>;
      case "address":
        return (
          <div className="flex gap-1 items-center relative">
            <p>{order.address}</p>
            <SvgIcon
              id="ClipboardText"
              size={16}
              className="fill-light-black dark:fill-white invisible group-hover:visible"
            />
          </div>
        );
      case "date":
        return (
          <div className="flex gap-1 items-center">
            <SvgIcon
              id="CalendarBlank"
              size={16}
              className="fill-light-black dark:fill-white"
            />
            <p>{order.date}</p>
          </div>
        );
      case "status": {
        const [iconClass, textClass] = getStatusClass(order.status);
        return (
          <div className="flex items-center">
            <SvgIcon id="Dot" size={16} className={iconClass} />
            <p className={textClass}>{order.status}</p>
          </div>
        );
      }
      case "action": {
        return (
          <SvgIcon
            id="DotsThreeOutlineVertical"
            size={16}
            className="fill-light-black dark:fill-white invisible group-hover:visible"
          />
        );
      }
      default:
        return <p>-</p>;
    }
  };
}

const FilterSection: React.FC<{
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-primary-light dark:bg-white/5 p-2 h-fit">
      <div className="flex items-center gap-2">
        <SvgIcon id="Add" size={SIZE} className={ICON_CLASS} />
        <SvgIcon id="FunnelSimple" size={SIZE} className={ICON_CLASS} />
        <SvgIcon id="ArrowsDownUp" size={SIZE} className={ICON_CLASS} />
      </div>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        leftIcon="Search"
        placeholder="Search"
        className="bg-white/40 dark:bg-light-black/40 border border-light-black/10 dark:border-white/10"
      />
    </div>
  );
};

const OrderList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<Order[]>([]);
  const [selectedData, setSelectedData] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/assets/jsons/order-list.json")
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
    fetch("/assets/jsons/contacts.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function filterOrders(list: Order[], searchTerm: string) {
    const term = searchTerm.toLowerCase();
    if (term == "") {
      return list;
    }
    return list.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }

  const filteredData = useMemo(() => {
    return filterOrders(data, searchValue);
  }, [data, searchValue]);

  return (
    <div className="flex flex-col flex-1 w-full h-full text-sm gap-4">
      <p className="font-semibold text-light-black dark:text-white px-2 py-1">
        Order List
      </p>
      <FilterSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Table
        data={filteredData}
        headers={headers}
        getHeader={getHeaders}
        getCell={getCell(contacts)}
        onSelectionChange={(data) => setSelectedData(data)}
      />
    </div>
  );
};

export default OrderList;
