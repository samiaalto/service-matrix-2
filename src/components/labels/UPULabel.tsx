import { Row, Col, OverlayTrigger } from "react-bootstrap";
import overlay from "./Overlay";

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
                overlay={overlay("serviceName", "UPU")}
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
                    overlay={overlay("sender-label", "UPU")}
                  >
                    <div className="sender-label priorityLabel">
                      Sender (name and address) / Expéditeur ( nom et adresse)
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderName", "UPU")}
                  >
                    <div className="senderName">
                      {data.labelData.senderName
                        ? data.labelData.senderName
                        : "Sandy Sender"}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderName2", "UPU")}
                  >
                    <div className="senderName2">
                      {data.labelData.senderName2
                        ? data.labelData.senderName2
                        : ""}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderAddress1", "UPU")}
                  >
                    <div className="senderAddress1">
                      {data.labelData.senderAddress1
                        ? data.labelData.senderAddress1
                        : "Sender Street 123"}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderAddress2", "UPU")}
                  >
                    <div className="senderAddress2">
                      {data.labelData.senderAddress2
                        ? data.labelData.senderAddress2
                        : ""}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderPostalCode", "UPU")}
                  >
                    <Col xs={3} className="senderPostalCode">
                      {data.labelData.senderPostalCode
                        ? data.labelData.senderPostalCode
                        : "00230"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderPostOffice", "UPU")}
                  >
                    <Col className="prioritySenderPostOffice">
                      {data.labelData.senderPostOffice
                        ? data.labelData.senderPostOffice
                        : "HELSINKI"}
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderCountry", "UPU")}
                  >
                    <Col xs={4} className="senderCountry">
                      {data.labelData.senderCountry
                        ? data.labelData.senderCountry
                        : "Finland"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderVat-label", "UPU")}
                  >
                    <Col xs={6} className="sendersVat priorityLabel">
                      Sender's business ID /
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderVat-value", "UPU")}
                  >
                    <Col xs={2} className="sendersVatValue">
                      12345678
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("senderPhone", "UPU")}
                  >
                    <Col xs={4} className="prioritySenderPhone">
                      {data.labelData.senderPhone
                        ? data.labelData.senderPhone
                        : "+35812345679"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("sendersVat", "UPU")}
                  >
                    <Col xs={8} className="sendersVat priorityLabel">
                      No de T.V.A de l'expéditeur
                    </Col>
                  </OverlayTrigger>
                </Row>
              </div>
              <div className="priorityReceiver">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiver-label", "UPU")}
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
                    overlay={overlay("receiverName", "UPU")}
                  >
                    <div className="receiverName">
                      {data.labelData.receiverName
                        ? data.labelData.receiverName
                        : "Ricky Receiver"}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverName2", "UPU")}
                  >
                    <div className="receiverName2">
                      {data.labelData.receiverName2
                        ? data.labelData.receiverName2
                        : ""}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverAddress1", "UPU")}
                  >
                    <div className="receiverAddress1">
                      {data.labelData.receiverAddress1
                        ? data.labelData.receiverAddress1
                        : "Postintaival 7"}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverAddress2", "UPU")}
                  >
                    <div className="receiverAddress2">
                      {data.labelData.receiverAddress2
                        ? data.labelData.receiverAddress2
                        : ""}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverPostalCode", "UPU")}
                  >
                    <Col xs={3} className="receiverPostalCode">
                      {data.labelData.receiverPostalCode
                        ? data.labelData.receiverPostalCode
                        : "00230"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverPostOffice", "UPU")}
                  >
                    <Col xs={6} className="priorityReceiverPostOffice">
                      {data.labelData.receiverPostOffice
                        ? data.labelData.receiverPostOffice
                        : "HELSINKI"}
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverCountry", "UPU")}
                  >
                    <Col xs={4} className="receiverCountry">
                      {data.labelData.receiverCountry
                        ? data.labelData.receiverCountry
                        : "Finland"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverVat-label", "UPU")}
                  >
                    <Col xs={6} className="receiversVat priorityLabel">
                      Sender's business ID /
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverVat-value", "UPU")}
                  >
                    <Col xs={2} className="receiversVatValue">
                      {data.labelData.receiverVatValue
                        ? data.labelData.receiverVatValue
                        : "12345678"}
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiverPhone", "UPU")}
                  >
                    <Col xs={4} className="priorityReceiverPhone">
                      {data.labelData.receiverPhone
                        ? data.labelData.receiverPhone
                        : "+35812345679"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("receiversVat", "UPU")}
                  >
                    <Col xs={8} className="receiversVat priorityLabel">
                      No de T.V.A de l'expéditeur
                    </Col>
                  </OverlayTrigger>
                </Row>
              </div>
            </Col>

            <Col xs={5} className="product">
              <Row>
                <OverlayTrigger
                  placement="bottom"
                  overlay={overlay("serviceBarcode", "UPU")}
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
                  overlay={overlay("serviceCode", "UPU")}
                >
                  <div className="priorityServiceCode">
                    {data.service ? "2W" + data.service : "2W2015"}
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={overlay("EDISSI", "UPU")}
                >
                  <div className="priorityEDISSI">EDI</div>
                </OverlayTrigger>
              </Row>
              <Row>
                <Col className="priorityDateBox">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("date-label", "UPU")}
                    >
                      <div className="date-label priorityLabel">
                        Date of posting / Date du dépôt
                      </div>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("date", "UPU")}
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
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("weight-label", "UPU")}
                  >
                    <Row className="priorityLabel">
                      Shipment weight / Poids de l'envoi
                    </Row>
                  </OverlayTrigger>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("weightValue", "UPU")}
                    >
                      <Col xs={7} className="priorityWeightValue">
                        {data.labelData.weight ? data.labelData.weight : "0,31"}
                      </Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("weightlabel", "UPU")}
                    >
                      <Col xs={2} className="weightlabel">
                        kg
                      </Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
                <Col className="volume box">
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("volume-label", "UPU")}
                  >
                    <Row className="priorityLabel">
                      Shipment volume / Volume de l'envoi
                    </Row>
                  </OverlayTrigger>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("volumeValue", "UPU")}
                    >
                      <Col xs={7} className="volumeValue"></Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("volumelabel", "UPU")}
                    >
                      <Col xs={2} className="volumelabel">
                        m3
                      </Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="priorityPackages">
                  <OverlayTrigger
                    placement="top"
                    overlay={overlay("packageCount-label", "UPU")}
                  >
                    <Row className="priorityLabel">Pieces Pièces</Row>
                  </OverlayTrigger>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("packageCount", "UPU")}
                    >
                      <Col className="packageCount">
                        {data.labelData.packageCount
                          ? data.labelData.packageCount
                          : "1"}
                      </Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
              <Row className="goodsType">
                <Col xs={6} className="goodsTypeCol">
                  <Row className="types">
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-value", "UPU")}
                    >
                      <Col xs={1} className="addonbox"></Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-label", "UPU")}
                    >
                      <Col className="goodsTypeLabel">Sample / Enchatillon</Col>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-value", "UPU")}
                    >
                      <Col xs={1} className="addonbox"></Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-label", "UPU")}
                    >
                      <Col className="goodsTypeLabel">Gift / Cadeau</Col>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-value", "UPU")}
                    >
                      <Col xs={1} className="addonbox">
                        X
                      </Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-label", "UPU")}
                    >
                      <Col className="goodsTypeLabel">Merchandise, valuen</Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
                <Col xs={6} className="goodsTypeCol">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-value", "UPU")}
                    >
                      <Col xs={1} className="addonbox"></Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={overlay("goodsType-label", "UPU")}
                    >
                      <Col className="goodsTypeLabel">Documents</Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="returnHandling">
            <OverlayTrigger
              placement="top"
              overlay={overlay("returnHandling-label", "UPU")}
            >
              <div className="priorityLabel">
                In case of non-delivery, please / En cas de non-livraison,
                veuillez
              </div>
            </OverlayTrigger>
            <Col xs={3} className="return">
              <OverlayTrigger
                placement="top"
                overlay={overlay("returnHandling-label", "UPU")}
              >
                <Row className="otherPayerHeading">
                  treat item as abandoned traiter l'envoi comme abandonné
                  <Col className="addonbox"></Col>
                </Row>
              </OverlayTrigger>
            </Col>
            <Col xs={4} className="return">
              <OverlayTrigger
                placement="top"
                overlay={overlay("returnHandling-label", "UPU")}
              >
                <Row className="otherPayerHeading">
                  return to the sender immediately renvoyer à l'expéditeur
                  immédiatement
                  <Col xs={2} className="addonbox"></Col>
                </Row>
              </OverlayTrigger>
            </Col>
            <Col xs={2} className="return">
              <OverlayTrigger
                placement="top"
                overlay={overlay("returnHandling-label", "UPU")}
              >
                <Row className="otherPayerHeading">
                  by air par avion
                  <Col className="addonbox">X</Col>
                </Row>
              </OverlayTrigger>
            </Col>
            <Col xs={3} className="return">
              <OverlayTrigger
                placement="top"
                overlay={overlay("returnHandling-label", "UPU")}
              >
                <Row className="otherPayerHeading">
                  the most economical route par la route la plus économique
                  <Col className="addonbox"></Col>
                </Row>
              </OverlayTrigger>
            </Col>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={overlay("trackingBarcodeValue", "UPU")}
            >
              <div className="priorityTrackingBarcodeValue">CE800235453FI</div>
            </OverlayTrigger>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={overlay("trackingBarcode", "UPU")}
            >
              <div className="priorityTrackingBarcode">
                <Barcode value="CE800235453FI" displayValue={false} />
              </div>
            </OverlayTrigger>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={overlay("trackingBarcodeValue", "UPU")}
            >
              <div className="priorityTrackingBarcodeValue">CE800235453FI</div>
            </OverlayTrigger>
          </Row>
          <Row className="senderInformation">
            <Row>
              <OverlayTrigger
                placement="top"
                overlay={overlay("customsSender-label", "UPU")}
              >
                <Col xs={4} className="priorityLabel">
                  Sender / Expéditeur
                </Col>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={overlay("customsSender-value", "UPU")}
              >
                <Col>Sandy Sender 00230 HELSINKI</Col>
              </OverlayTrigger>
            </Row>
          </Row>
          <Row className="recipientInformation">
            <Row>
              <OverlayTrigger
                placement="top"
                overlay={overlay("customsReceiver-label", "UPU")}
              >
                <Col xs={4} className="priorityLabel">
                  Recipient (name and address)
                </Col>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={overlay("customsReceiver-value", "UPU")}
              >
                <Col>Ricky Receiver</Col>
              </OverlayTrigger>
            </Row>
            <Row>
              <OverlayTrigger
                placement="top"
                overlay={overlay("customsReceiverAddress-label", "UPU")}
              >
                <Col xs={4} className="priorityLabel">
                  Destinataire (nom et adresse)
                </Col>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={overlay("customsReceiverAddress-value", "UPU")}
              >
                <Col>Postintaival 7 00230 HELSINKI</Col>
              </OverlayTrigger>
            </Row>
          </Row>
          <Row className="customsInformationEN">
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsDescription-label", "UPU")}
            >
              <Col xs={4} className="priorityLabel">
                Description of contents
              </Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsNumber-label", "UPU")}
            >
              <Col className="priorityLabel">Number</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsWeight-label", "UPU")}
            >
              <Col className="priorityLabel">Nett weight</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsOriginCountry-label", "UPU")}
            >
              <Col className="priorityLabel">Country of origin</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsTariff-label", "UPU")}
            >
              <Col className="priorityLabel">Customs tariff no</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsValue-label", "UPU")}
            >
              <Col className="priorityLabel">Value</Col>
            </OverlayTrigger>
          </Row>
          <Row className="customsInformation">
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsDescription-label", "UPU")}
            >
              <Col xs={4} className="priorityLabel">
                Description détaillée du contenu
              </Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsNumber-label", "UPU")}
            >
              <Col className="priorityLabel">Nombre</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsWeight-label", "UPU")}
            >
              <Col className="priorityLabel">Poids net</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsOriginCountry-label", "UPU")}
            >
              <Col className="priorityLabel">Pays d'origine</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsTariff-label", "UPU")}
            >
              <Col className="priorityLabel">No tarifaire</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsValue-label", "UPU")}
            >
              <Col className="priorityLabel">Valeur</Col>
            </OverlayTrigger>
          </Row>
          <Row className="values">
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsDescription-value", "UPU")}
            >
              <Col xs={4} className="descriptionValue">
                TESTI
              </Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsNumber-value", "UPU")}
            >
              <Col className="numberValue">1</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsWeight-value", "UPU")}
            >
              <Col className="priorityWeightValue">1</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsOriginCountry-value", "UPU")}
            >
              <Col className="originValue">FI</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsTariff-value", "UPU")}
            >
              <Col className="tariffValue">6122234</Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("customsContentsValue-value", "UPU")}
            >
              <Col className="amountValue">100 EUR</Col>
            </OverlayTrigger>
          </Row>
          <Row className="signature">
            <OverlayTrigger
              placement="top"
              overlay={overlay("receiverSignatureDate-label", "UPU")}
            >
              <Col xs={2} className="priorityLabel">
                Date
              </Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("receiverSignatureTime-label", "UPU")}
            >
              <Col xs={2} className="priorityLabel">
                Time/Heure
              </Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("receiverSignature-label", "UPU")}
            >
              <Col className="priorityLabel">
                Recipient's signature Signature du destinataire
              </Col>
            </OverlayTrigger>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={overlay("receiverSignatureDate-value", "UPU")}
            >
              <Col xs={2} className="dateValue"></Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("receiverSignatureTime-value", "UPU")}
            >
              <Col xs={2} className="timeValue"></Col>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={overlay("receiverSignature-value", "UPU")}
            >
              <Col className="signatureValue"></Col>
            </OverlayTrigger>
          </Row>
          <Row className="zipCodeBarcode">
            <Col xs={7}></Col>
            <Col xs={5}>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={overlay("zipBarcode", "UPU")}
                >
                  <div className="zipBarcode">
                    <Barcode
                      value="9V600170"
                      displayValue={false}
                      width={1.8}
                    />
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={overlay("zipBarcodeValue", "UPU")}
                >
                  <div className="zipBarcodeValue">9V600170</div>
                </OverlayTrigger>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UPULabel;
