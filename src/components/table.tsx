import { useCallback, useEffect, useMemo, useState } from "react";
import { SvgIcon } from "./svg-icon";
import Checkbox from "./checkbox";

type GenericTableProps<T> = {
  data: T[];
  headers: string[];
  getHeader: (key: string) => string;
  getCell: (row: T, header: string) => React.ReactNode;
  rowsPerPage?: number;
  onSelectionChange?: (data: T[]) => void;
};

type Selectable<T> = T & { isSelected: boolean };

export function Table<T>({
  data,
  headers,
  getHeader,
  getCell,
  rowsPerPage = 10,
  onSelectionChange,
}: GenericTableProps<T>) {
  const [DATA, setDATA] = useState<Selectable<T>[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(DATA.length / rowsPerPage);
  }, [DATA.length, rowsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return DATA.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, DATA, rowsPerPage]);

  const selectedAll = useMemo(() => {
    return !DATA.some((entry) => !entry.isSelected);
  }, [DATA]);

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
      setDATA((prev) => {
        const updated = prev.map((row) => ({ ...row, isSelected: bool }));
        if (onSelectionChange) {
          onSelectionChange(updated.filter((r) => r.isSelected));
        }
        return updated;
      });
    },
    [onSelectionChange]
  );

  const setRowSelection = useCallback(
    (index: number, bool: boolean) => {
      setDATA((prev) => {
        const updated = prev.map((row, i) =>
          i === index ? { ...row, isSelected: bool } : row
        );
        if (onSelectionChange) {
          onSelectionChange(updated.filter((r) => r.isSelected));
        }
        return updated;
      });
    },
    [onSelectionChange]
  );

  return (
    <div className="flex flex-col gap-3">
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
                    onChange={(bool) => setRowSelection(idx, bool)}
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
