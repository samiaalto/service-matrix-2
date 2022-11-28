import { memo, useEffect, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import emitter from "./Emitter";

const HeaderComponent = ({
  value,
  onClick,
  t,
  header,
  columnIndex,
  highlightRow,
}) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    emitter.subscribe(highlightRow, columnIndex, (isHighlighted) => {
      if (ref.current) {
        // Directly update the class on the DOM node
        ref.current.classList.toggle("highlight-cell", isHighlighted);
      }
    });
  }, [highlightRow, columnIndex]);

  return (
    <>
      {header.depth === 1 ? (
        header.column.id === "serviceName" ||
        header.column.id === "serviceButton" ||
        header.column.id === "serviceCode" ? (
          <th
            key={header.id}
            colSpan={header.colSpan}
            className="headerTitleEmpty"
            onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
            ref={ref}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ) : (
          <OverlayTrigger
            key={"tooltip_" + header.column.id}
            placement="left"
            overlay={
              <Tooltip key={"tooltip_" + header.column.id}>
                <b> {t(header.column.id)} </b> {" (" + header.column.id + ")"}
                <br />
                {t(header.column.id + "_tooltip")}
              </Tooltip>
            }
          >
            <th
              key={header.id}
              colSpan={header.colSpan}
              className="headerTitle"
              onClick={() =>
                onClick(highlightRow, "modal" + columnIndex, header.column.id)
              }
              onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
              ref={ref}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          </OverlayTrigger>
        )
      ) : header.column.id === "serviceName" ? (
        <td
          key={header.column.id}
          colSpan={header.colSpan}
          className="serviceHeader"
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </td>
      ) : header.column.id === "serviceCode" ||
        header.column.id === "serviceButton" ? (
        <td
          key={header.column.id}
          colSpan={header.colSpan}
          className="code"
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </td>
      ) : (
        <td
          key={header.column.id}
          colSpan={header.colSpan}
          className="addonCode"
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </td>
      )}
    </>
  );
};

//export const Cell = CellComponent;
export const Header = memo(HeaderComponent);
