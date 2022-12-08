import { Modal, Button, Row, Col, Table, Tabs, Tab } from "react-bootstrap";
import "./styles/Modal_styles.css";
import ServiceDimensions from "./ServiceDimensions";

interface Dimension {
  MinHeight_cm: number;
  MaxHeight_cm: number;
  MinWidth_cm: number;
  MaxWidth_cm: number;
  MinDepth_cm: number;
  MaxDepth_cm: number;
  MinWeight_kg: number;
  MaxWeight_kg: number;
  Circumference_cm: number;
  MessageFormat: string;
  PackageType: string;
  DisplayNameEN: string;
  AdditionalServiceCode: any;
  DimensionName: string;
}

interface Route {
  DepartureCountry: string;
  DestinationCountries: any;
}

interface Destination {
  Country: string;
}

interface Addon {
  addon: string;
}

const ModalWindow = ({
  openModal,
  closeModal,
  data,
  t,
  selected,
  setSelected,
  updateSearchParams,
}) => {
  return (
    <>
      <Modal show={openModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>{t(data.title) + " (" + data.title + ")"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.description && data.dimensions ? (
            <>
              <Row>
                <Col className="modal-text-header left">{t("Description")}</Col>
                <Col className="modal-text-header right">{t("Dimensions")}</Col>
              </Row>
              <Row className="modal-text">
                <Col>
                  {t(data.description)}
                  {data.availability ? (
                    <>
                      <Row>
                        <Col className="modal-text-header">
                          {t("Availability")}
                        </Col>
                      </Row>
                      {data.availability.pudo && data.availability.home ? (
                        <Row>
                          <Col className="modal-text">{t("BOTH")}</Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {!data.availability.pudo && data.availability.home ? (
                        <Row>
                          <Col className="modal-text">{t("HOME")}</Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {data.availability.pudo && !data.availability.home ? (
                        <Row>
                          <Col className="modal-text">{t("PUDO")}</Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {!data.availability.pudo &&
                      !data.availability.home &&
                      data.availability.business ? (
                        <Row>
                          <Col className="modal-text">{t("BUSINESS")}</Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {data.routes ? (
                    <>
                      <Row>
                        <Col className="modal-text-header">{t("Routes")}</Col>
                      </Row>
                      <Row>
                        <Col className="routes-table">
                          <Table className="modal-table">
                            <thead>
                              <tr key={"routes_header"}>
                                <th key={"routes_departure"}>
                                  {t("Departure Country")}
                                </th>
                                <th key={"routes_destination"}>
                                  {t("Destination Country")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.routes.map((route: Route, i: number) => (
                                <tr
                                  key={"row_" + i}
                                  className="routes-departure"
                                >
                                  <td key={"dep_" + i}>
                                    {t(route.DepartureCountry)}
                                  </td>
                                  <td
                                    key={"des_" + i}
                                    className="routes-destination"
                                  >
                                    {route.DestinationCountries.map(
                                      (destination: any, i: number) => (
                                        <div key={"destination_" + i}>
                                          {t(destination.Country)}
                                        </div>
                                      )
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                </Col>
                <Col>
                  <Row className="modal-dimensions-svg">
                    <ServiceDimensions
                      service={data.title}
                      dimensions={data.dimensions}
                      t={t}
                    />
                  </Row>
                  <Table className="modal-table dimension-table">
                    <thead>
                      <tr key={"dimensions_table_header"}>
                        <td key={"dimension_type_header"}></td>
                        {data.dimensions.map(
                          (dimension: Dimension, i: number) =>
                            dimension.MinHeight_cm !== null ? (
                              <td
                                className="dimensions_table_header"
                                key={"dimension_type_" + i}
                              >
                                {dimension.AdditionalServiceCode !== null
                                  ? dimension.DisplayNameEN +
                                    " with " +
                                    t(dimension.AdditionalServiceCode.Addon)
                                  : dimension.DimensionName.indexOf("locker") >
                                    -1
                                  ? dimension.DisplayNameEN +
                                    " to parcel locker"
                                  : dimension.DisplayNameEN}
                              </td>
                            ) : (
                              ""
                            )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={"dimensions_height"}>
                        <td key={"dimension_height_header"}>
                          {t("Height") + " (cm)"}
                        </td>
                        {data.dimensions.map(
                          (dimension: Dimension, i: number) =>
                            dimension.MinHeight_cm !== null ? (
                              <td key={"dimension_height_" + i}>
                                {dimension.MinHeight_cm +
                                  "-" +
                                  dimension.MaxHeight_cm}
                              </td>
                            ) : (
                              ""
                            )
                        )}
                      </tr>
                      <tr key={"dimensions_width"}>
                        <td key={"dimension_width_header"}>
                          {t("Width") + " (cm)"}
                        </td>
                        {data.dimensions.map(
                          (dimension: Dimension, i: number) =>
                            dimension.MinWidth_cm !== null ? (
                              <td key={"dimension_width_" + i}>
                                {dimension.MinWidth_cm +
                                  "-" +
                                  dimension.MaxWidth_cm}
                              </td>
                            ) : (
                              ""
                            )
                        )}
                      </tr>
                      <tr key={"dimensions_depth"}>
                        <td key={"dimension_depth_header"}>
                          {t("Depth") + " (cm)"}
                        </td>
                        {data.dimensions.map(
                          (dimension: Dimension, i: number) =>
                            dimension.MinDepth_cm !== null ? (
                              <td key={"dimension_depth_" + i}>
                                {dimension.MinDepth_cm +
                                  "-" +
                                  dimension.MaxDepth_cm}
                              </td>
                            ) : (
                              ""
                            )
                        )}
                      </tr>
                      <tr key={"dimensions_weight"}>
                        <td key={"dimension_weight_header"}>
                          {t("Weight") + " (kg)"}
                        </td>
                        {data.dimensions.map(
                          (dimension: Dimension, i: number) =>
                            dimension.MinHeight_cm !== null ? (
                              <td key={"dimension_weight_" + i}>
                                {dimension.MinWeight_kg +
                                  "-" +
                                  dimension.MaxWeight_kg}
                              </td>
                            ) : (
                              ""
                            )
                        )}
                      </tr>
                      {data.dimensions.some(
                        (e) => e.Circumference_cm !== null
                      ) ? (
                        <tr key={"dimensions_circumference"}>
                          <td key={"dimension_circumference_header"}>
                            {t("Circumference") + " (cm)"}
                          </td>
                          {data.dimensions.map(
                            (dimension: Dimension, i: number) => (
                              <td key={"dimension_circumference_" + i}>
                                {dimension.Circumference_cm !== null
                                  ? dimension.Circumference_cm
                                  : ""}
                              </td>
                            )
                          )}
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
          {data.description && !data.dimensions ? (
            <>
              <Row>
                <Col className="modal-text-header">{t("Description")}</Col>
              </Row>
              <Row className="modal-text">
                <Col> {t(data.description)}</Col>
              </Row>
            </>
          ) : (
            ""
          )}

          {data.mandatory ? (
            <>
              <Row>
                <Col className="modal-text-header">
                  {t("'Mandatory Information'")}
                </Col>
              </Row>
              <Row>
                <Col>{data.mandatory}</Col>
              </Row>
            </>
          ) : (
            ""
          )}

          {data.countries ? (
            <>
              <Row>
                <Col className="modal-text-header">
                  {t("'Available Countries'")}
                </Col>
              </Row>
              {data.countries.map((country, i: number) => (
                <Row key={"country_row_" + i}>
                  <Col key={"country_" + i}>
                    {t(country) + " (" + country + ")"}
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            ""
          )}

          {data.excluded ? (
            <>
              <Row>
                <Col className="modal-text-header">
                  {t("'Excluded Additional Services'")}
                </Col>
              </Row>
              {data.excluded.map((addon: Addon, i: number) => (
                <Row key={"excluded_row_" + i}>
                  <Col key={"excluded_addon_" + i}>
                    {t(addon) + " (" + addon + ")"}
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            ""
          )}

          {data.fields ? (
            <>
              <Row>
                <Col className="modal-text-header">
                  {t("'Technical Instructions'")}
                </Col>
              </Row>
              <Tabs
                id="controlled-tab-example"
                activeKey={selected.modalTab ? selected.modalTab : ""}
                onSelect={(k) => {
                  updateSearchParams("modalTab", k);
                  setSelected((prevState) => ({
                    ...prevState,
                    modalTab: k,
                  }));
                }}
                className="mb-3 modal-tabs"
              >
                {data.fields.POSTRA ? (
                  <Tab eventKey="postra" title="Postra">
                    <Table className="modal-tech-table">
                      <thead>
                        <tr key={"fields_header"}>
                          <td
                            key={"fields_header_title"}
                            className="attribute_title"
                          >
                            {t("Attribute")}
                          </td>
                          <td
                            key={"fields_header_mandatory"}
                            className="mandatory_title"
                          >
                            {t("Mandatory")}
                          </td>
                          <td key={"fields_header_additional"}>
                            {t("'Additional Information'")}
                          </td>
                          <td
                            key={"fields_header_example"}
                            className="example_title"
                          >
                            {t("Example")}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.fields.POSTRA.map((item, i) => (
                          <tr key={"field_row_" + i}>
                            <td
                              key={"field_attribute_" + i}
                              className="attribute_col"
                            >
                              {item.PropertyName}
                            </td>
                            <td
                              key={"field_mandatory_" + i}
                              className="mandatory_col"
                            >
                              {item.Mandatory ? t("TRUE") : t("FALSE")}
                            </td>
                            <td key={"field_additional_" + i}>
                              {item.AdditionalInfo}
                            </td>
                            <td
                              key={"field_example_" + i}
                              className="example_col"
                            >
                              {item.Sample}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                ) : (
                  ""
                )}
                {data.fields.SMARTSHIP ? (
                  <Tab eventKey="smartship" title="Smartship">
                    <Table className="modal-tech-table">
                      <thead>
                        <tr key={"fields_header"}>
                          <td
                            key={"fields_header_title"}
                            className="attribute_title"
                          >
                            {t("Attribute")}
                          </td>
                          <td
                            key={"fields_header_mandatory"}
                            className="mandatory_title"
                          >
                            {t("Mandatory")}
                          </td>
                          <td key={"fields_header_additional"}>
                            {t("'Additional Information'")}
                          </td>
                          <td
                            key={"fields_header_example"}
                            className="example_title"
                          >
                            {t("Example")}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.fields.SMARTSHIP.map((item, i) => (
                          <tr key={"field_row_" + i}>
                            <td
                              key={"field_attribute_" + i}
                              className="attribute_col"
                            >
                              {item.PropertyName}
                            </td>
                            <td
                              key={"field_mandatory_" + i}
                              className="mandatory_col"
                            >
                              {item.Mandatory ? t("TRUE") : t("FALSE")}
                            </td>
                            <td key={"field_additional_" + i}>
                              {item.AdditionalInfo}
                            </td>
                            <td
                              key={"field_example_" + i}
                              className="example_col"
                            >
                              {item.Sample}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                ) : (
                  ""
                )}

                {data.fields.WAYBILD16A ? (
                  <Tab eventKey="waybil" title="Waybild16a">
                    <Table className="modal-tech-table">
                      <thead>
                        <tr key={"fields_header"}>
                          <td
                            key={"fields_header_title"}
                            className="attribute_title"
                          >
                            {t("Attribute")}
                          </td>
                          <td
                            key={"fields_header_mandatory"}
                            className="mandatory_title"
                          >
                            {t("Mandatory")}
                          </td>
                          <td key={"fields_header_additional"}>
                            {t("'Additional Information'")}
                          </td>
                          <td
                            key={"fields_header_example"}
                            className="example_title"
                          >
                            {t("Example")}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.fields.WAYBILD16A.map((item, i) => (
                          <tr key={"field_row_" + i}>
                            <td
                              key={"field_attribute_" + i}
                              className="attribute_col"
                            >
                              {item.PropertyName}
                            </td>
                            <td
                              key={"field_mandatory_" + i}
                              className="mandatory_col"
                            >
                              {item.Mandatory ? t("TRUE") : t("FALSE")}
                            </td>
                            <td key={"field_additional_" + i}>
                              {item.AdditionalInfo}
                            </td>
                            <td
                              key={"field_example_" + i}
                              className="example_col"
                            >
                              {item.Sample}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                ) : (
                  ""
                )}
              </Tabs>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalWindow;
