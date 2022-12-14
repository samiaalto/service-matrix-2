import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  RowData,
  FilterFn,
} from "@tanstack/react-table";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import "../styles/Table_styles.css";
import { Row } from "./Row";
import { HeaderRow } from "./HeaderRow";
import emitter from "./Emitter";

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
      } else if (
        value.substring(value.indexOf("-") + 1, value.length) !== "FI" &&
        item === value.substring(0, value.indexOf("-")) + "-ALL"
      ) {
        passed = item;
        value = value.substring(0, value.indexOf("-")) + "-ALL";
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
  } else if (columnId === "weight") {
    let passed;
    let array: any = row.getValue(columnId);
    for (let item of array) {
      if (item.maxWeight === value) {
        passed = item.maxWeight;
        break;
      }
    }
    itemRank = rankItem(passed, value);
  } else if (columnId === "width") {
    let passed: number;
    let array: any = row.getValue(columnId);
    for (let item of array) {
      if (item.maxWidth === value) {
        passed = item.maxWidth;
        break;
      }
    }
    itemRank = rankItem(passed, value);
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
  handleCellClick,
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
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
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

  const onCellClick = useCallback(
    (rowIndex, columnId, value) => {
      if (
        columnId !== "serviceCode" &&
        columnId !== "serviceName" &&
        columnId !== "serviceButton" &&
        columnId.substring(0, 5) !== "modal"
      ) {
        table.options.meta?.updateData(rowIndex, columnId, !value);
        table.options.meta?.selection(rowIndex, columnId, !value);
      } else {
        handleCellClick(rowIndex, columnId, value);
      }
    },
    [handleCellClick]
  );

  useEffect(() => {
    filteredRows(table.getPreFilteredRowModel());
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
          <table
            className="serviceMatrix-table"
            onMouseLeave={() => emitter.highlight(0, 0)}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <HeaderRow
                    t={t}
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                    allCols={table.getAllColumns()}
                    onCellClick={onCellClick}
                  />
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Row
                    t={t}
                    key={row.index}
                    row={row}
                    onCellClick={onCellClick}
                    highlightRow={row.index + 2}
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
