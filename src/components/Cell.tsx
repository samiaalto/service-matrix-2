import { useCallback, memo, useState, useEffect, useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Checkbox from "./Checkbox";
import Button from "./Button";
import emitter from "./Emitter";

const CellComponent = ({
  value,
  rowIndex,
  onClick,
  columnId,
  t,
  service,
  columnIndex,
  highlightRow,
}) => {
  const ref = useRef<any>();
  useEffect(() => {
    emitter.subscribe(highlightRow, columnIndex, (isHighlighted) => {
      if (ref.current) {
        // Directly update the class on the DOM node
        ref.current.classList.toggle("highlight-cell", isHighlighted);
      }
    });
  }, [highlightRow, columnIndex]);

  const onCellClick = useCallback(() => {
    onClick(rowIndex, columnId, value);
  }, [onClick, rowIndex, columnId, value]);

  return (
    <>
      {columnId === "serviceName" && service.original.serviceButton === true ? (
        <OverlayTrigger
          key={"tooltip_" + columnId + rowIndex}
          placement="right"
          overlay={
            <Tooltip key={columnId + rowIndex}>
              <b> {t(value)} </b> {" (" + value + ")"}
              <br />
              {t(value + "_tooltip")}
            </Tooltip>
          }
        >
          <td
            className="service selected"
            onClick={onCellClick}
            onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
            ref={ref}
          >
            {t(value)}
          </td>
        </OverlayTrigger>
      ) : columnId === "serviceName" &&
        service.original.serviceButton !== true ? (
        <OverlayTrigger
          key={"tooltip_" + columnId + rowIndex}
          placement="right"
          overlay={
            <Tooltip key={columnId + rowIndex}>
              <b> {t(value)} </b> {" (" + value + ")"}
              <br />
              {t(value + "_tooltip")}
            </Tooltip>
          }
        >
          <td
            className="service"
            onClick={onCellClick}
            onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
            ref={ref}
          >
            {t(value)}
          </td>
        </OverlayTrigger>
      ) : columnId === "serviceCode" &&
        service.original.serviceButton === true ? (
        <td
          className="serviceCode selected"
          onClick={onCellClick}
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          {value}
        </td>
      ) : columnId === "serviceCode" &&
        service.original.serviceButton !== true ? (
        <td
          className="serviceCode"
          onClick={onCellClick}
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          {value}
        </td>
      ) : columnId === "serviceButton" && value === true ? (
        <td
          className="serviceButton selected"
          onClick={onCellClick}
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          <Button
            title=""
            type="select"
            onClick={(e) => console.log("click")}
          />
        </td>
      ) : columnId === "serviceButton" && value !== true ? (
        <td
          className="serviceButton"
          onClick={onCellClick}
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          <Button
            title=""
            type="select"
            onClick={(e) => console.log("click")}
          />
        </td>
      ) : value !== undefined && value !== null ? (
        <td
          className=""
          onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
          ref={ref}
        >
          <Checkbox
            value={value}
            row={rowIndex}
            column={columnId}
            onClick={onCellClick}
            title={""}
            classname={""}
          />
        </td>
      ) : (
        <OverlayTrigger
          key={"tooltip_" + rowIndex + "_" + columnId}
          placement="top"
          overlay={
            <Tooltip key={rowIndex + "_" + columnId}>
              <b> {t(columnId)} </b> {" (" + columnId + ")"}
              <br /> {t("'is not available for'")}
              <br />
              <b>{t(service.original.serviceCode)}</b>
              {" (" + service.original.serviceCode + ")"}
            </Tooltip>
          }
        >
          <td
            className="unavailable"
            onMouseEnter={() => emitter.highlight(highlightRow, columnIndex)}
            ref={ref}
          ></td>
        </OverlayTrigger>
      )}
    </>
  );
};

//export const Cell = CellComponent;
export const Cell = memo(CellComponent);
