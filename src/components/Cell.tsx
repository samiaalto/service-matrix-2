import { useCallback, memo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Checkbox from "./Checkbox";
import Button from "./Button";

const CellComponent = ({
  value,
  rowIndex,
  onClick,
  selected,
  columnId,
  width,
  t
}) => {
  //console.log("render", columnId);
  const onCellClick = useCallback(() => {
    onClick(rowIndex, columnId, value);
  }, [onClick, rowIndex, columnId, value]);

  return (
    <>
      {columnId === "serviceName" ? (
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
          <td className="service" style={{ width }} onClick={onCellClick}>
            {t(value)}
          </td>
        </OverlayTrigger>
      ) : columnId === "serviceCode" ? (
        <td className="serviceCode" style={{ width }} onClick={onCellClick}>
          {value}
        </td>
      ) : columnId === "serviceButton" ? (
        <td className="serviceButton" onClick={onCellClick}>
          <Button title="" type="select" />
        </td>
      ) : value !== undefined && value !== null ? (
        <td className="">
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
              <b>{t(rowIndex)}</b>
              {" (" + rowIndex + ")"}
            </Tooltip>
          }
        >
          <td className="unavailable"></td>
        </OverlayTrigger>
      )}
    </>
  );
};

export const Cell = memo(CellComponent);
