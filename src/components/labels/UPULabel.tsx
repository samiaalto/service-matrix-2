import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

import "../styles/UPULabel_styles.css";

const UPULabel = ({ data }) => {
  const Barcode = require("react-barcode");
  const addonboxes = [];
  let addonCount = 0;
  if (data.labelData.addons.length > 0) {
    for (const [i, addon] of data.labelData.addons.entries()) {
      if (addon.labelMarking !== null && i <= 5) {
        addonboxes.push({ id: i, marking: addon.labelMarking });
        addonCount++;
      }
    }
  }
  if (addonCount < 5) {
    for (let i = addonCount; i < 5; i++) {
      addonboxes.push({ id: i, marking: "" });
    }
  }

  return (
    <>
      <div className="labelPreview">
        <div className="labelBorder">
          <Row>
            <Row className="serviceArea">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="serviceName">
                    <b>{"Name of service"}</b>
                    <br />
                    {"Mandatory: Yes"}
                    <br />
                    {"Font size: 10/12 bold"}
                    <br />
                    {
                      "Description: Grouped according to the service-specific models"
                    }
                  </Tooltip>
                }
              >
                <Col className="serviceName">
                  {data.service === "2015" ? (
                    <img
                      className="priorityLogo"
                      alt="priority logo"
                      src={require("../icons/priority_logo.png").default}
                    />
                  ) : (
                    <img
                      className="priorityLogo"
                      alt="ems logo"
                      src={require("../icons/ems_logo.png").default}
                    />
                  )}
                </Col>
              </OverlayTrigger>
            </Row>
            <Col className="priorityParties" xs={7}>
              <div className="sender">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="sender-label">
                        <b>{"Header for sender information"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 6"}
                        <br />
                        {
                          "Description: Addresses of the sender of the Thermaltransfer sticker address label 20 characters per line, A5 laser-printed address label 35 characters per line. In both address labels detachable label part, the sender's addresses 2 x 35 characters."
                        }
                      </Tooltip>
                    }
                  >
                    <div className="sender-label priorityLabel">
                      Sender (name and address) / Expéditeur ( nom et adresse)
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderName">
                        <b>{"Sender's name 1"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Sender's name"}
                      </Tooltip>
                    }
                  >
                    <div className="senderName">Sandy Sender</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <div className="senderName2"></div>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderAddress1">
                        <b>{"Sender's address 1"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Sender's address"}
                      </Tooltip>
                    }
                  >
                    <div className="senderAddress1">Sender Street 123</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <div className="senderAddress2"></div>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderPostalCode">
                        <b>{"Sender's postal code"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {
                          "Description: Sender's postal code with country code prefix"
                        }
                      </Tooltip>
                    }
                  >
                    <Col xs={3} className="senderPostalCode">
                      00230
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderPostOffice">
                        <b>{"Sender's city"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Sender's city"}
                      </Tooltip>
                    }
                  >
                    <Col className="prioritySenderPostOffice">HELSINKI</Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderCountry">
                        <b>{"Sender's country"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Sender's country"}
                      </Tooltip>
                    }
                  >
                    <Col xs={4} className="senderCountry">
                      Finland
                    </Col>
                  </OverlayTrigger>
                  <Col xs={6} className="sendersVat priorityLabel">
                    Sender's business ID /
                  </Col>
                  <Col xs={2} className="sendersVatValue">
                    12345678
                  </Col>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderCountry">
                        <b>{"Sender's country"}</b>
                        <br />
                        {"Mandatory: No"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Sender's phone"}
                      </Tooltip>
                    }
                  >
                    <Col xs={4} className="prioritySenderPhone">
                      +35812345679
                    </Col>
                  </OverlayTrigger>
                  <Col xs={8} className="sendersVat priorityLabel">
                    No de T.V.A de l'expéditeur
                  </Col>
                </Row>
              </div>
              <div className="priorityReceiver">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiver-label">
                        <b>{"Header for recpient information"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 6"}
                        <br />
                        {
                          "Description: Addresses of the sender of the Thermaltransfer sticker address label 20 characters per line, A5 laser-printed address label 35 characters per line. In both address labels detachable label part, the sender's addresses 2 x 35 characters."
                        }
                      </Tooltip>
                    }
                  >
                    <div className="receiver-label priorityLabel">
                      Recipient (name and address) / Destinataire (nom et
                      adresse)
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverName">
                        <b>{"Recipient's name 1"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Recipient's name"}
                      </Tooltip>
                    }
                  >
                    <div className="receiverName">Ricky Receiver</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverName2">
                        <b>{"Recipient's name 2"}</b>
                        <br />
                        {"Mandatory: When delivery to a pickup point is chosen"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Care Of name of the pickup point"}
                      </Tooltip>
                    }
                  >
                    <div className="receiverName2"></div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverAddress1">
                        <b>{"Recipient's address 1"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {
                          "Description: Recipient's home address or address the pickup point"
                        }
                      </Tooltip>
                    }
                  >
                    <div className="receiverAddress1">Postintaival 7</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <div className="receiverAddress2"></div>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverPostalCode">
                        <b>{"Recipient's postal code"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 10 bold"}
                        <br />
                        {
                          "Description: Recipient's postal code or postal code of the pickup point with the country code prefix"
                        }
                      </Tooltip>
                    }
                  >
                    <Col xs={3} className="receiverPostalCode">
                      00230
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverPostOffice">
                        <b>{"Recipient's city"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 10 bold"}
                        <br />
                        {"Description: Recipient's city"}
                      </Tooltip>
                    }
                  >
                    <Col xs={6} className="priorityReceiverPostOffice">
                      HELSINKI
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverCountry">
                        <b>{"Receiver's country"}</b>
                        <br />
                        {"Mandatory: Yes"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Receiver's country"}
                      </Tooltip>
                    }
                  >
                    <Col xs={4} className="receiverCountry">
                      Finland
                    </Col>
                  </OverlayTrigger>
                  <Col xs={6} className="receiversVat priorityLabel">
                    Sender's business ID /
                  </Col>
                  <Col xs={2} className="receiversVatValue">
                    12345678
                  </Col>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderCountry">
                        <b>{"Sender's country"}</b>
                        <br />
                        {"Mandatory: No"}
                        <br />
                        {"Font size: 8"}
                        <br />
                        {"Description: Receiver's phone"}
                      </Tooltip>
                    }
                  >
                    <Col xs={4} className="priorityReceiverPhone">
                      +35812345679
                    </Col>
                  </OverlayTrigger>
                  <Col xs={8} className="receiversVat priorityLabel">
                    No de T.V.A de l'expéditeur
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={5} className="product">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="serviceBarcode">
                      <b>{"The service's product code as a barcode"}</b>
                      <br />
                      {"Mandatory: Yes"}
                      <br />
                      {
                        "6 characters, contain a technical modulo 103 check digit, not visual"
                      }
                      <br />
                      {"FactCode: 2W"}
                      <br />
                      {"Product code: 4 numbers given by Posti"}
                      <br />
                      {"Bar code type: Licence Plate code 128 a, b and c"}
                      <br />
                      {
                        "The first two characters shall produced in type a or b and the remaining four even numbersin type c. It is not mandatory to use type c, if in the address label is space enough to print out longer bar code."
                      }
                      <br />
                      {
                        "X-value (width of the narrowest bar) 0,42 -0,50 mm (optimal value is 0,46 mm)"
                      }
                      <br />
                      {
                        "The minimum resolution in thermal transfer printer is 200 dots / inch."
                      }
                      <br />
                      {
                        "The minimum resolution in laser reproduction is 600 dots / inch."
                      }
                      <br />
                      {
                        "Free space at both sides of the bar code must be at least 5 mmoMinimum height is 20 mm, but when EDI-message is used 12 mm"
                      }
                      <br />
                      {"Use block capitals in bar codes"}
                    </Tooltip>
                  }
                >
                  <div className="priorityServiceBarcode">
                    <Barcode
                      value={data.service ? "2W" + data.service : "2W2015"}
                      displayValue={false}
                      height={70}
                      width={2}
                    />
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="serviceCode">
                      <b>{"The service's product code"}</b>
                      <br />
                      {"Mandatory: Yes"}
                      <br />
                      {"Font size: 10"}
                      <br />
                      {
                        "Description: The service's product code that uses the License Plate 2W -prefix"
                      }
                    </Tooltip>
                  }
                >
                  <div className="priorityServiceCode">
                    {data.service ? "2W" + data.service : "2W2015"}
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <div className="priorityEDISSI">EDI</div>
              </Row>
              <Row>
                <Col className="priorityDateBox">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="date-label">
                          <b>{"Header for printing date"}</b>
                          <br />
                          {"Mandatory: Yes"}
                          <br />
                          {"Font size: 6"}
                          <br />
                          {"Description: Header for printing date"}
                        </Tooltip>
                      }
                    >
                      <div className="date-label priorityLabel">
                        Date of posting / Date du dépôt
                      </div>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="date">
                          <b>{"Printing date"}</b>
                          <br />
                          {"Mandatory: No"}
                          <br />
                          {"Font size: 8"}
                          <br />
                          {
                            "Description: Printing date in Finnish date format: DD.MM.YYYY"
                          }
                        </Tooltip>
                      }
                    >
                      <div className="date">
                        {data.labelData.dateTime
                          ? data.labelData.dateTime
                          : "18.3.2021"}
                      </div>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="weight box">
                  <Row className="priorityLabel">
                    Shipment weight / Poids de l'envoi
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="weightValue">
                          <b>{"Shipment gross weight"}</b>
                          <br />
                          {"Mandatory: No"}
                          <br />
                          {"Font size: 8"}
                          <br />
                          {"Description: Shipment gross weight"}
                        </Tooltip>
                      }
                    >
                      <Col xs={7} className="priorityWeightValue">
                        0,31
                      </Col>
                    </OverlayTrigger>
                    <Col
                      xs={2}
                      className="weightlabel"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-container=".labelPreview"
                      title="<b>Header for shipment gross weight</b></br>Mandatory: Yes</br>Font size: 6</br>Description: Header for shipment gross weight"
                    >
                      kg
                    </Col>
                  </Row>
                </Col>
                <Col className="volume box">
                  <Row className="priorityLabel">
                    Shipment volume / Volume de l'envoi
                  </Row>
                  <Row>
                    <Col
                      xs={7}
                      className="volumeValue"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-container=".labelPreview"
                      title="<b>Shipment volume</b></br>Mandatory: No</br>Font size: 8</br>Description: Shipment volume"
                    ></Col>
                    <Col
                      xs={2}
                      className="volumelabel"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-container=".labelPreview"
                      title="<b>Header for shipment volume</b></br>Mandatory: Yes</br>Font size: 6</br>Description: Header for shipment volume"
                    >
                      m3
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="priorityPackages">
                  <Row className="priorityLabel">Pieces Pièces</Row>
                  <Row>
                    <Col className="packageCount">1</Col>
                  </Row>
                </Col>
              </Row>
              <Row className="goodsType">
                <Col xs={6} className="goodsTypeCol">
                  <Row className="types">
                    <Col xs={1} className="addonbox">
                      X
                    </Col>
                    <Col className="goodsTypeLabel">Sample / Enchatillon</Col>
                  </Row>
                  <Row>
                    <Col xs={1} className="addonbox"></Col>
                    <Col className="goodsTypeLabel">Gift / Cadeau</Col>
                  </Row>
                  <Row>
                    <Col xs={1} className="addonbox"></Col>
                    <Col className="goodsTypeLabel">Merchandise, valuen</Col>
                  </Row>
                </Col>
                <Col xs={6} className="goodsTypeCol">
                  <Row>
                    <Col xs={1} className="addonbox"></Col>
                    <Col className="goodsTypeLabel">Documents</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="returnHandling">
            <div className="priorityLabel">
              In case of non-delivery, please / En cas de non-livraison,
              veuillez
            </div>
            <Col xs={3} className="return">
              <Row className="otherPayerHeading">
                treat item as abandoned traiter l'envoi comme abandonné
                <Col className="addonbox"></Col>
              </Row>
            </Col>
            <Col xs={4} className="return">
              <Row className="otherPayerHeading">
                return to the sender immediately renvoyer à l'expéditeur
                immédiatement
                <Col xs={2} className="addonbox">
                  X
                </Col>
              </Row>
            </Col>
            <Col xs={2} className="return">
              <Row className="otherPayerHeading">
                by air par avion
                <Col className="addonbox"></Col>
              </Row>
            </Col>
            <Col xs={3} className="return">
              <Row className="otherPayerHeading">
                the most economical route par la route la plus économique
                <Col className="addonbox"></Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <div
              className="priorityTrackingBarcodeValue"
              data-toggle="tooltip"
              data-placement="top"
              data-container=".labelPreview"
              title="<b>Delivery ID</b></br>Mandatory: Yes</br>Font size: 10</br>Description: Delivery ID that uses the License Plate JJFI prefix. The six last numbers are grouped as an element of their own, and entered in bold when possible."
            >
              CE800235453FI
            </div>
          </Row>
          <Row>
            <div
              className="priorityTrackingBarcode"
              data-toggle="tooltip"
              data-placement="top"
              data-container=".labelPreview"
              title="<b>Delivery ID as a barcode</b></br>Mandatory: Yes</br>Bar code type: Licence Plate code 128 a, b and c</br>The first 5 characters shall produced in type a or b and the remaining 16 even numbersin type c. It is not mandatory to use type c, if in the address label is space enough to print out longer bar code.</br>X-value (width of the narrowest bar) 0,42 -0,50 mm (optimal value is 0,46 mm)</br>The minimum resolution in thermal transfer printer is 200 dots / inch.</br>The minimum resolution in laser reproduction is 600 dots / inch.</br>Free space at both sides of the bar code must be at least 5 mm</br>Minimum height is 25 mm</br>Use block capitals in bar codes"
            >
              <Barcode value="CE800235453FI" displayValue={false} />
            </div>
          </Row>
          <Row>
            <div
              className="priorityTrackingBarcodeValue"
              data-toggle="tooltip"
              data-placement="top"
              data-container=".labelPreview"
              title="<b>Delivery ID</b></br>Mandatory: Yes</br>Font size: 10</br>Description: Delivery ID that uses the License Plate JJFI prefix. The six last numbers are grouped as an element of their own, and entered in bold when possible."
            >
              CE800235453FI
            </div>
          </Row>
          <Row className="senderInformation">
            <Row>
              <Col xs={4} className="priorityLabel">
                Sender / Expéditeur
              </Col>
              <Col>Sandy Sender 00230 HELSINKI</Col>
            </Row>
          </Row>
          <Row className="recipientInformation">
            <Row>
              <Col xs={4} className="priorityLabel">
                Recipient (name and address)
              </Col>
              <Col>Ricky Receiver</Col>
            </Row>
            <Row>
              <Col xs={4} className="priorityLabel">
                Destinataire (nom et adresse)
              </Col>
              <Col>Postintaival 7 00230 HELSINKI</Col>
            </Row>
          </Row>
          <Row className="customsInformationEN">
            <Col xs={4} className="priorityLabel">
              Description of contents
            </Col>
            <Col className="priorityLabel">Number</Col>
            <Col className="priorityLabel">Nett weight</Col>
            <Col className="priorityLabel">Country of origin</Col>
            <Col className="priorityLabel">Customs tariff no</Col>
            <Col className="priorityLabel">Value</Col>
          </Row>
          <Row className="customsInformation">
            <Col xs={4} className="priorityLabel">
              Description détaillée du contenu
            </Col>
            <Col className="priorityLabel">Nombre</Col>
            <Col className="priorityLabel">Poids net</Col>
            <Col className="priorityLabel">Pays d'origine</Col>
            <Col className="priorityLabel">No tarifaire</Col>
            <Col className="priorityLabel">Valeur</Col>
          </Row>
          <Row className="values">
            <Col xs={4} className="descriptionValue">
              TESTI
            </Col>
            <Col className="numberValue">1</Col>
            <Col className="priorityWeightValue">1</Col>
            <Col className="originValue">FI</Col>
            <Col className="tariffValue">6122234</Col>
            <Col className="amountValue">100 EUR</Col>
          </Row>
          <Row className="signature">
            <Col xs={2} className="priorityLabel">
              Date
            </Col>
            <Col xs={2} className="priorityLabel">
              Time/Heure
            </Col>
            <Col className="priorityLabel">
              Recipient's signature Signature du destinataire
            </Col>
          </Row>
          <Row>
            <Col xs={2} className="dateValue"></Col>
            <Col xs={2} className="timeValue"></Col>
            <Col className="signatureValue"></Col>
          </Row>
          <Row className="zipCodeBarcode">
            <Col xs={7}></Col>
            <Col xs={5}>
              <Row>
                <div
                  className="zipBarcode"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-container=".labelPreview"
                  title="<b>Delivery ID as a barcode</b></br>Mandatory: Yes</br>Bar code type: Licence Plate code 128 a, b and c</br>The first 5 characters shall produced in type a or b and the remaining 16 even numbersin type c. It is not mandatory to use type c, if in the address label is space enough to print out longer bar code.</br>X-value (width of the narrowest bar) 0,42 -0,50 mm (optimal value is 0,46 mm)</br>The minimum resolution in thermal transfer printer is 200 dots / inch.</br>The minimum resolution in laser reproduction is 600 dots / inch.</br>Free space at both sides of the bar code must be at least 5 mm</br>Minimum height is 25 mm</br>Use block capitals in bar codes"
                >
                  <Barcode value="9V600170" displayValue={false} width={1.8} />
                </div>
              </Row>
              <Row>
                <div
                  className="zipBarcodeValue"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-container=".labelPreview"
                  title="<b>Delivery ID</b></br>Mandatory: Yes</br>Font size: 10</br>Description: Delivery ID that uses the License Plate JJFI prefix. The six last numbers are grouped as an element of their own, and entered in bold when possible."
                >
                  9V600170
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UPULabel;
