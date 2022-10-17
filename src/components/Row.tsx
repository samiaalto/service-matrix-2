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
  FilterFn
} from "@tanstack/react-table";
import { useState, useCallback, memo } from "react";
import { Cell } from "./Cell";

const RowComponent = ({ row, selected, onCellClick, t }) => {
  //console.log("render row", row.index);

  const handleClick = useCallback(
    (rowIndex, columnId, value) => {
      onCellClick(rowIndex, columnId, value);
    },
    [onCellClick]
  );

  return (
    <tr>
      {row.getVisibleCells().map((cell) => {
        //const cellProps = cell.getCellProps();

        return (
          <Cell
            t={t}
            key={cell.id}
            value={cell.getValue()}
            rowIndex={cell.row.index}
            onClick={handleClick}
            columnId={cell.column.id}
          />
        );
      })}
    </tr>
  );
};

export const Row = memo(RowComponent);
