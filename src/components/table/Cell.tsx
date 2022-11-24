import { useCallback, memo, useEffect, useRef } from "react";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import Checkbox from "../Checkbox";
import Button from "../Button";
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

  let weightFilter: number;
  let widthFilter: number;
  let showMessage = false;
  let message = "";
  if (service.columnFiltersMeta.hasOwnProperty("weight")) {
    weightFilter = service.columnFiltersMeta.weight.itemRank.rankedValue;
  }
  if (service.columnFiltersMeta.hasOwnProperty("width")) {
    widthFilter = service.columnFiltersMeta.width.itemRank.rankedValue;
  }
  if (
    service.columnFilters.hasOwnProperty("weight") &&
    typeof weightFilter !== "undefined"
  ) {
    let weights = [];
    for (let item of service.original.weight) {
      if (
        item.maxWeight === weightFilter &&
        item.addon !== null &&
        (!service.original[item.addon] || service.original[item.addon] === null)
      ) {
        showMessage = true;
        weights.push(item.maxWeight);
      } else {
        weights.push(item.maxWeight);
      }
    }
    weights.sort((a, b) => parseFloat(a) - parseFloat(b));
    let index = weights.indexOf(weightFilter);
    message =
      "Additional service " +
      t("3174") +
      " (3174) is required when upgrading from " +
      weights[index - 1] +
      " kg to " +
      weightFilter +
      " kg";
  }
  if (
    service.columnFilters.hasOwnProperty("width") &&
    typeof widthFilter !== "undefined"
  ) {
    let widths = [];
    for (let item of service.original.width) {
      if (
        item.maxWidth === widthFilter &&
        item.addon !== null &&
        (!service.original[item.addon] || service.original[item.addon] === null)
      ) {
        showMessage = true;
        widths.push(item.maxWidth);
      } else {
        widths.push(item.maxWidth);
      }
    }
    widths.sort((a, b) => parseFloat(a) - parseFloat(b));
    let index = widths.indexOf(widthFilter);
    message =
      "Additional service " +
      t("3174") +
      " (3174) is required when upgrading from " +
      widths[index - 1] +
      " cm to " +
      widthFilter +
      " cm";
  }

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
            {showMessage ? (
              <>
                <OverlayTrigger
                  key={"tooltip_badge_" + columnId + rowIndex}
                  placement="top"
                  overlay={
                    <Tooltip key={columnId + rowIndex}>
                      <b>NOTE!</b>
                      <br />
                      {message}
                    </Tooltip>
                  }
                >
                  <Badge pill bg="warning" text="dark">
                    !
                  </Badge>
                </OverlayTrigger>
                {t(value)}
              </>
            ) : (
              t(value)
            )}
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
            {showMessage ? (
              <>
                <OverlayTrigger
                  key={"tooltip_badge_" + columnId + rowIndex}
                  placement="top"
                  overlay={
                    <Tooltip key={columnId + rowIndex}>
                      <b>NOTE!</b>
                      <br />
                      {message}
                    </Tooltip>
                  }
                >
                  <Badge pill bg="warning" text="dark">
                    !
                  </Badge>
                </OverlayTrigger>
                {t(value)}
              </>
            ) : (
              t(value)
            )}
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
          className="check"
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
