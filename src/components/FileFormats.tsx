import FFTable from "./FileFormatTable";
import Dropdown from "./Dropdown";
import Select from "./Select";
import Filter from "./Filter";
import { Table, Tabs, Tab, Row, Col } from "react-bootstrap";
import { useState } from "react";

const FileFormats = ({
  t,
  formats,
  selected,
  setSelected,
  updateSearchParams,
  ffColumnData,
  setFfColumnData,
  ffRowData,
  fileFormats,
}) => {
  const history = [];
  console.log(selected);
  if (selected.format) {
    for (const format of fileFormats.records) {
      if (format.Name === selected.format) {
        if (format.VersionHistory) {
          for (const row of format.VersionHistory) {
            history.push(row);
          }
        }
      }
    }
  }

  return (
    <>
      <div className="appcontainer">
        <div className="controls">
          <Row>
            <Col xs={6} sm={4} md={4}>
              <Select
                onChange={(e) => {
                  let value = e.value;
                  updateSearchParams("format", value);
                  setSelected((prevState) => ({
                    ...prevState,
                    format: value,
                  }));
                }}
                data={formats}
                t={t}
              />
            </Col>
            <Col xs={6} sm={4} md={4}>
              <Filter
                placeHolder={t("'Filter data'")}
                value={selected.formatFilter ? selected.formatFilter : ""}
                onChange={(e) => {
                  let value = e.target.value;
                  updateSearchParams("formatFilter", value);
                  setSelected((prevState) => ({
                    ...prevState,
                    formatFilter: value,
                  }));
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="content">
          <Tabs
            id="controlled-tab-example"
            activeKey={selected.ffTab ? selected.ffTab : "specs"}
            onSelect={(k) => {
              updateSearchParams("fileFormatTab", k);
              setSelected((prevState) => ({
                ...prevState,
                ffTab: k,
              }));
            }}
            className="mb-3 ff-tabs"
          >
            {history.length > 0 ? (
              <Tab eventKey="version" title={t("version")}>
                <Table className="ff-table">
                  <thead>
                    <tr>
                      <th className="version_title">Document Version</th>
                      <th className="version_title">Schema Version</th>
                      <th className="date_title">Date</th>
                      <th className="comment_title">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row, i) => (
                      <tr key={"row" + i}>
                        <td className="version_col">{row.DocumentVersion}</td>
                        <td className="version_col">{row.SchemaVersion}</td>
                        <td className="date_col">{row.Date}</td>
                        <td className="comment_col">{row.Comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            ) : (
              ""
            )}
            <Tab eventKey="specs" title={t("specs")}>
              <FFTable
                t={t}
                defaultColumns={ffColumnData}
                defaultData={ffRowData}
                selectedFormat={selected.format}
                glblFilter={selected.formatFilter}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default FileFormats;
