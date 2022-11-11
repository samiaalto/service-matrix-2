import { useState, useCallback, memo } from "react";
import { Header } from "./Header";

const HeaderRowComponent = ({ onCellClick, t, headerGroup, allCols }) => {
  //console.log("render row", row.index);

  const handleClick = useCallback(
    (rowIndex, columnId, value) => {
      onCellClick(rowIndex, columnId, value);
    },
    [onCellClick]
  );

  return (
    <tr>
      {headerGroup.headers.map((header) => {
        //const cellProps = cell.getCellProps();

        let index = allCols.findIndex((e) => e.id === header.column.id);

        if (index > -1) {
          return (
            <Header
              t={t}
              key={header.id}
              value={header}
              header={header}
              onClick={handleClick}
              columnIndex={index}
              highlightRow={header.depth - 1}
            />
          );
        }
      })}
    </tr>
  );
};
export const HeaderRow = HeaderRowComponent;

//export const Row = memo(RowComponent);
