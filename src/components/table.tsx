import { useCallback, useEffect, useMemo, useState } from "react";
import { SvgIcon } from "./svg-icon";
import Checkbox from "./checkbox";
import Input from "./input";

type GenericTableProps<T> = {
  data: T[];
  headers: string[];
  getHeader: (key: string) => string;
  getCell: (row: T, header: string) => React.ReactNode;
  rowsPerPage?: number;
  onSelectionChange?: (data: T[]) => void;
  getRowId?: (row: T) => string | number;
};

type Selectable<T> = T & { isSelected: boolean };

const ICON_CLASS = "fill-light-black dark:fill-white m-1";
const SIZE = 28;

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

export function Table<T>({
  data,
  headers,
  getHeader,
  getCell,
  rowsPerPage = 10,
  onSelectionChange,
  getRowId,
}: GenericTableProps<T>) {
  const [searchValue, setSearchValue] = useState("");
  const [DATA, setDATA] = useState<Selectable<T>[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    const term = searchValue.toLowerCase();
    if (term == "") {
      return DATA;
    }
    return DATA.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [DATA, searchValue]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / rowsPerPage);
  }, [filteredData.length, rowsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, filteredData, rowsPerPage]);

  const selectedAll = useMemo(() => {
    if (filteredData.length === 0) {
      return false;
    }
    return !filteredData.some((entry) => !entry.isSelected);
  }, [filteredData]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    const selectableDATA = data.map((entry) => ({
      ...entry,
      isSelected: false,
    }));
    setDATA(selectableDATA);
  }, [data]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const selectAll = useCallback(
    (bool: boolean) => {
      if (getRowId) {
        const details = filteredData.map((row) => getRowId(row));
        setDATA((prev) =>
          prev.map((row) =>
            details.includes(getRowId(row)) ? { ...row, isSelected: bool } : row
          )
        );
      }
    },
    [filteredData, getRowId]
  );

  const setRowSelection = useCallback(
    (detail: T, bool: boolean) => {
      if (getRowId) {
        setDATA((prev) =>
          prev.map((row) =>
            getRowId(row) === getRowId(detail)
              ? { ...row, isSelected: bool }
              : row
          )
        );
      }
    },
    [getRowId]
  );

  return (
    <div className="flex flex-col gap-3">
      <FilterSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <table className="w-full">
        <thead>
          <tr className="border-b border-light-black/20 dark:border-white/20 text-xs">
            {onSelectionChange && (
              <th
                className="p-3 text-light-black/40 dark:text-white/40 text-start font-normal"
                key="selector"
              >
                <Checkbox
                  checked={selectedAll}
                  onChange={(bool) => {
                    selectAll(bool);
                  }}
                />
              </th>
            )}
            {headers.map((header) => (
              <th
                className="p-3 text-light-black/40 dark:text-white/40 text-start font-normal"
                key={header}
              >
                {getHeader(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr
              key={idx}
              className="group border-b border-light-black/5 dark:border-white/10 text-xs cursor-pointer hover:bg-light-black/5 dark:hover:bg-white/10"
            >
              {onSelectionChange && (
                <td
                  className="p-3 text-light-black dark:text-white text-start font-normal rounded-l-lg"
                  key={`selector-${idx}`}
                >
                  <Checkbox
                    checked={row.isSelected}
                    onChange={(bool) => setRowSelection(row, bool)}
                    className={
                      row.isSelected ? "" : "invisible group-hover:visible"
                    }
                  />
                </td>
              )}
              {headers.map((header, index) => {
                const isFirst = onSelectionChange ? false : index === 0;
                const isLast = index === headers.length - 1;
                return (
                  <td
                    className={`p-3 text-light-black dark:text-white text-start font-normal ${
                      isFirst ? "rounded-l-lg" : ""
                    } ${isLast ? "rounded-r-lg" : ""}`}
                    key={`${header}-${idx}`}
                  >
                    {getCell(row, header)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex gap-2 items-center place-self-end">
          <SvgIcon
            id="ArrowLineRight"
            size={28}
            className="fill-light-black dark:fill-white hover:bg-light-black/5 dark:hover:bg-white/10 rounded-lg rotate-180"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => {
            return (
              <p
                key={`page-${i}`}
                onClick={() => goToPage(i + 1)}
                className={`flex w-7 py-1 rounded-lg text-sm text-light-black dark:text-white hover:bg-light-black/5 dark:hover:bg-white/10 items-center justify-center cursor-pointer select-none ${
                  currentPage === i + 1
                    ? "bg-light-black/5 dark:bg-white/10"
                    : ""
                }`}
              >
                {i + 1}
              </p>
            );
          })}
          <SvgIcon
            id="ArrowLineRight"
            size={28}
            className="fill-light-black dark:fill-white hover:bg-light-black/5 dark:hover:bg-white/10 rounded-lg"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </div>
  );
}
