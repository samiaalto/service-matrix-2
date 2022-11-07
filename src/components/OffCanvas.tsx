import { Offcanvas, Tabs, Tab, Form } from "react-bootstrap";
import ParcelLabel from "./labels/ParcelLabel";
import UPULabel from "./labels/UPULabel";
import FreightLabel from "./labels/FreightLabel";
import ParcelConnectLabel from "./labels/ParcelConnectLabel";
import BringLabel from "./labels/BringLabel";
import SampleCodeView from "./SampleCodeView";
import "./styles/OffCanvas_styles.css";

interface offCanvasProps {
  openCanvas: boolean;
  closeCanvas: () => void;
  data: any;
  showOptional: any;
  showSamples: any;
  t: any;
  setKey: (string) => void;
}

const OffCanvas = ({
  openCanvas,
  closeCanvas,
  data,
  t,
  showOptional,
  showSamples,
  setKey,
}: offCanvasProps) => {
  const renderSwitch = (param) => {
    switch (param) {
      case "FREIGHT":
        return <FreightLabel data={data} />;
      case "UPU":
        return <UPULabel data={data} />;
      case "BRING":
        return <BringLabel data={data} />;
      case "PARCELCONNECT":
        return <ParcelConnectLabel data={data} />;
      default:
        return <ParcelLabel data={data} />;
    }
  };

  return (
    <>
      <Offcanvas
        backdrop={false}
        placement="end"
        show={openCanvas}
        onHide={closeCanvas}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={data.offCanvasTab ? data.offCanvasTab : "label"}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="label" title={t("Label")}>
              <div className="label">
                {renderSwitch(data.labelData.labelType)}
              </div>
            </Tab>
            {data.POSTRA.message && (
              <Tab eventKey="postra" title="Postra">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="mandatoryOnly"
                    label={t("'Show optional fields'")}
                    checked={data.showOptional}
                    onChange={showOptional}
                  />
                  <Form.Check
                    type="switch"
                    id="sampleValues"
                    label={t("'Show sample values'")}
                    checked={data.showSamples}
                    onChange={showSamples}
                  />
                </Form.Group>
                <SampleCodeView
                  data={data.POSTRA.message}
                  type={"xml"}
                  lines={data.POSTRA.newLines}
                />
              </Tab>
            )}
            {data.SMARTSHIP.message && (
              <Tab eventKey="smartship" title="SmartShip">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="mandatoryOnly"
                    label={t("'Show optional fields'")}
                    checked={data.showOptional}
                    onChange={showOptional}
                  />
                  <Form.Check
                    type="switch"
                    id="sampleValues"
                    label={t("'Show sample values'")}
                    checked={data.showSamples}
                    onChange={showSamples}
                  />
                </Form.Group>
                <SampleCodeView
                  data={data.SMARTSHIP.message}
                  type={"json"}
                  lines={data.SMARTSHIP.newLines}
                />
              </Tab>
            )}
            {data.WAYBILD16A && (
              <Tab eventKey="waybild16a" title="Waybild16a">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="mandatoryOnly"
                    label={t("'Show optional fields'")}
                    checked={data.showOptional}
                    onChange={showOptional}
                  />
                  <Form.Check
                    type="switch"
                    id="sampleValues"
                    label={t("'Show sample values'")}
                    checked={data.showSamples}
                    onChange={showSamples}
                  />
                </Form.Group>
                <SampleCodeView
                  data={data.WAYBILD16A}
                  type={"xml"}
                  lines={[]}
                />
              </Tab>
            )}
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;
