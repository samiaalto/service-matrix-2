import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  flexRender,
  FilterFn,
} from "@tanstack/react-table";
import { useState, useEffect, useMemo } from "react";
import "./styles/FFTable_styles.css";
import AllowedValues from "./AllowedValues";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  let itemRank;
  if (columnId === "routes") {
    let passed;
    let array: any = row.getValue(columnId);
    for (let item of array) {
      if (item === value) {
        passed = item;
        break;
      }
    }
    itemRank = rankItem(passed, value);
  } else if (columnId === "additionalServices") {
    let passed;
    let count = 0;
    let items = [];
    let array: any = row.getValue(columnId);
    for (let item of array) {
      if (value.includes(item)) {
        count++;
        items.push(item);
      }
    }
    if (count === value.length) {
      passed = row.getValue(columnId);
    }
    itemRank = rankItem(passed, value);
  } else if (columnId === "weight" || columnId === "width") {
    if (row.getValue(columnId) === value) {
      itemRank = rankItem(row.getValue(columnId), value);
    } else {
      itemRank = rankItem("", value);
    }
  } else {
    itemRank = rankItem(row.getValue(columnId), value);
  }
  //console.log(itemRank);
  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function FFTable({
  t,
  defaultData,
  defaultColumns,
  selectedFormat,
  glblFilter,
}) {
  const [data] = useState(() => [...defaultData]);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  let dataMemo = useMemo(() => data, [data]);
  let columnsMemo = useMemo(() => columns, []);

  const table = useReactTable({
    data: dataMemo,
    columns: columnsMemo,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  useEffect(() => {
    table.getColumn("format").setFilterValue(selectedFormat || undefined);
    if (selectedFormat === "WAYBILD16A") {
      setColumnVisibility({ format: false, tooltip: false });
    } else {
      setColumnVisibility({ format: false, tooltip: false, position: false });
    }
  }, [selectedFormat, table]);

  useEffect(() => {
    setGlobalFilter(glblFilter || undefined);
  }, [glblFilter]);

  return (
    <>
      {selectedFormat ? (
        <div className="FFContainer">
          <table className="ff-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.column.id}
                        colSpan={header.colSpan}
                        className={header.column.id + "_title"}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                if (
                  row.original.type === "Array" ||
                  row.original.type === "Object" ||
                  row.original.attribute.props.children.includes("RecordType")
                ) {
                  return (
                    <tr key={row.index} className="ff-boldRow">
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === "attribute") {
                          return (
                            <td
                              key={cell.id}
                              className={cell.column.id + "Name_col"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={cell.id}
                              className={cell.column.id + "_col"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                } else {
                  return (
                    <tr key={row.index} className="ff-row">
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === "attribute") {
                          return (
                            <td
                              key={cell.id}
                              className={cell.column.id + "Name_col"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        } else if (
                          cell.column.id === "description" &&
                          cell.row.original.tooltip.length > 0
                        ) {
                          return (
                            <td
                              key={cell.id}
                              className={cell.column.id + "_col"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                              <AllowedValues
                                data={cell.row.original.tooltip}
                                t={t}
                              />
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={cell.id}
                              className={cell.column.id + "_col"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export default FFTable;
