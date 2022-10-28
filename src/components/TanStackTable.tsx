import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnDef,
  flexRender,
  RowData,
  FilterFn,
} from "@tanstack/react-table";
import {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./styles/Table_styles.css";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { Row } from "./Row";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    selection: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

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

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

function TanStackTable({
  t,
  defaultData,
  defaultColumns,
  hiddenColumns,
  openModal,
  filteredRows,
  selection,
  updateRows,
  serviceGroup,
  service,
  weight,
  width,
  deliveryLocation,
  addons,
  route,
  reset,
  setReset,
  serviceSelection,
}) {
  const [data, setData] = useState(() => [...defaultData]);
  const [rows, setRows] = useState(0);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [columnVisibility, setColumnVisibility] = useState(hiddenColumns);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

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
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      selection: (rowIndex, columnId, value) => {
        selection({
          row: rowIndex,
          service: data[rowIndex].serviceCode,
          addon: columnId,
          value: value,
        });
      },
    },
  });

  const onCellClick = useCallback((rowIndex, columnId, value) => {
    //setActiveRow(rowIndex);
    if (columnId === "serviceName") {
      openModal(value);
    } else if (columnId === "serviceButton") {
      serviceSelection(rowIndex, !value, table.getFilteredRowModel());
    } else if (columnId !== "serviceCode") {
      table.options.meta?.updateData(rowIndex, columnId, !value);
      table.options.meta?.selection(rowIndex, columnId, !value);
    }
  }, []);

  useEffect(() => {
    filteredRows(table.getFilteredRowModel());
    let fRows = table.getFilteredRowModel();
    setRows(fRows["rows"].length);
  }, [table.getFilteredRowModel()]);

  useEffect(() => {
    setColumnVisibility(hiddenColumns);
  }, [hiddenColumns]);

  useEffect(() => {
    if (updateRows !== undefined) {
      updateRows.map((row) =>
        table.options.meta?.updateData(row.row, row.column, row.value)
      );
    }
  }, [updateRows]);

  useEffect(() => {
    table.getColumn("serviceGroup").setFilterValue(serviceGroup || undefined);
  }, [serviceGroup]);

  useEffect(() => {
    table.getColumn("serviceCode").setFilterValue(service || undefined);
  }, [service]);

  useEffect(() => {
    table.getColumn("routes").setFilterValue(route || undefined);
  }, [route]);

  useEffect(() => {
    table.getColumn("weight").setFilterValue(weight || undefined);
  }, [weight]);

  useEffect(() => {
    table.getColumn("width").setFilterValue(width || undefined);
  }, [width]);

  useEffect(() => {
    table
      .getColumn("deliveryLocation")
      .setFilterValue(deliveryLocation || undefined);
  }, [deliveryLocation]);

  useEffect(() => {
    table.getColumn("additionalServices").setFilterValue(addons || undefined);
  }, [addons]);

  useEffect(() => {
    setData(defaultData);
    setReset(false);
  }, [reset]);

  return (
    <>
      {rows > 0 ? (
        <div className="MatrixContainer">
          <table className="serviceMatrix-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.depth === 1) {
                      if (
                        header.column.id === "serviceName" ||
                        header.column.id === "serviceButton" ||
                        header.column.id === "serviceCode"
                      ) {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className="headerTitleEmpty"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        );
                      } else {
                        return (
                          <OverlayTrigger
                            key={"tooltip_" + header.column.id}
                            placement="left"
                            overlay={
                              <Tooltip key={"tooltip_" + header.column.id}>
                                <b> {t(header.column.id)} </b>{" "}
                                {" (" + header.column.id + ")"}
                                <br />
                                {t(header.column.id + "_tooltip")}
                              </Tooltip>
                            }
                          >
                            <th
                              key={header.id}
                              colSpan={header.colSpan}
                              className="headerTitle"
                              onClick={() => openModal(header.column.id)}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </th>
                          </OverlayTrigger>
                        );
                      }
                    } else if (header.column.id === "serviceName") {
                      return (
                        <td
                          key={header.column.id}
                          colSpan={header.colSpan}
                          className="serviceHeader"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </td>
                      );
                    } else if (
                      header.column.id === "serviceCode" ||
                      header.column.id === "serviceButton"
                    ) {
                      return (
                        <td
                          key={header.column.id}
                          colSpan={header.colSpan}
                          className="code"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={header.column.id}
                          colSpan={header.colSpan}
                          className="addonCode"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                //const cells = row.getVisibleCells();
                //const rowProps = row.getRowProps();
                return (
                  <Row
                    t={t}
                    key={row.index}
                    row={row}
                    onCellClick={onCellClick}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        t("'No results for filter value'")
      )}
    </>
  );
}

export default TanStackTable;
