import { useState, useCallback, memo } from "react";
import { Cell } from "./Cell";

const RowComponent = ({ row, onCellClick, t, highlightRow }) => {
  //console.log("render row", row.index);

  const handleClick = useCallback(
    (rowIndex, columnId, value) => {
      onCellClick(rowIndex, columnId, value);
    },
    [onCellClick]
  );

  return (
    <tr>
      {row.getAllCells().map((cell, i) => {
        //const cellProps = cell.getCellProps();

        if (cell.column.getIsVisible()) {
          return (
            <Cell
              t={t}
              key={cell.id}
              value={cell.getValue()}
              rowIndex={cell.row.index}
              service={cell.row}
              columnIndex={i}
              onClick={handleClick}
              columnId={cell.column.id}
              highlightRow={highlightRow}
            />
          );
        }
      })}
    </tr>
  );
};
export const Row = RowComponent;

//export const Row = memo(RowComponent);
