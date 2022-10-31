import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../styles/ParcelLabel_styles.css";

const ParcelLabel = ({ data }) => {
  const { t } = useTranslation();
  const Barcode = require("react-barcode");
  const addonboxes = [];
  let addonCount = 0;
  if (Object.keys(data.labelData).length > 0) {
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
  }

  return (
    <>
      <div className="labelPreview">
        <div className="labelBorder">
          <Row>
            <Col className="parties" xs={5}>
              <div className="sender">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_labelLogo">
                        <b>{t("PARCEL_labelLogo_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_labelLogo_mandatory")}
                        {t("PARCEL_labelLogo_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_labelLogo_fontSize")}
                            {t("PARCEL_labelLogo_bold").toString() === "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_labelLogo_description")}
                      </Tooltip>
                    }
                  >
                    <Col xs={4} className="labelLogo">
                      <svg
                        width="67"
                        height="32"
                        viewBox="0 0 67 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        focusable="false"
                        className="sc-2274bq-0 bEoFZP"
                      >
                        <path
                          d="M23.0427 14.6937C23.3181 12.213 25.137 10.4494 27.6732 10.4494C30.2094 10.4494 32.0827 12.213 32.3037 14.6937H36.329C36.0536 10.1197 32.3581 6.59243 27.7276 6.59243C23.0972 6.59243 19.3472 10.1197 19.0718 14.6937H23.0427ZM13.724 15.6859C13.6152 18.3875 11.6298 20.2599 8.98137 20.2599C6.33636 20.2599 4.35089 18.3875 4.29649 15.6859H0.216797V31.4467H4.24211V22.241H4.29649C5.39801 23.342 6.94151 24.1134 9.14795 24.1134C13.8906 24.1134 17.5827 20.5317 17.6949 15.6825L13.724 15.6859ZM4.29649 14.6937C4.51748 12.1586 6.44515 10.4494 8.98137 10.4494C11.5176 10.4494 13.4486 12.213 13.724 14.6937H17.7493C17.4739 10.0654 13.9994 6.59243 9.36894 6.59243C7.1625 6.59243 5.39803 7.41819 4.3509 8.5226H4.24211V6.92545H0.216797V14.6971H4.29649V14.6937ZM60.2565 23.7872H64.2818V15.6859H60.2565V23.7872ZM51.4919 23.7872H55.5172V15.6859H51.4919V23.7872ZM46.8036 15.6859H38.974C39.8001 16.2365 41.1226 16.8991 41.9522 17.2287C43.6045 17.8336 44.213 18.221 44.213 18.9924C44.213 19.7638 43.3325 20.2055 42.2276 20.2055C40.9051 20.2055 39.9667 19.7094 39.0284 18.8836L36.3834 21.5274C37.9269 23.0702 39.5248 24.1168 42.282 24.1168C45.2024 24.1168 48.2349 22.0235 48.2349 18.8802C48.2383 17.504 47.6332 16.4573 46.8036 15.6859ZM32.3615 15.6859C32.2527 18.3875 30.376 20.2599 27.6766 20.2599C25.0316 20.2599 23.1006 18.3297 22.9918 15.6859H18.963C19.0718 20.3686 22.8762 24.1168 27.6188 24.1168C32.3615 24.1168 36.1658 20.3686 36.2746 15.6859H32.3615ZM64.2818 6.92206H60.2565V14.6937H64.2818V6.92206ZM51.4919 14.6937H55.5172V10.4494H59.2093V6.92206H55.5172V0.91748H51.4919V6.92545H48.4593V10.4528H51.4919V14.6937ZM45.7021 14.6937C44.9304 14.1975 43.992 13.8136 43.1659 13.5349C41.6224 12.9844 40.9051 12.597 40.9051 11.7169C40.9051 10.9999 41.6224 10.5037 42.5574 10.5037C43.5501 10.5037 44.5428 10.8911 45.3689 11.6625L47.9596 8.85222C46.4161 7.41819 44.8182 6.6468 42.5574 6.6468C40.2421 6.6468 37.1007 8.46483 37.1007 11.8834C37.1007 13.0422 37.4883 13.9767 38.0935 14.6937H45.7021Z"
                          fill="#3B4A57"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          className="sc-2274bq-4 jFnDyb"
                        ></path>
                        <path
                          d="M65.0435 2.26246C65.2203 3.23094 65.0163 4.00232 64.4893 4.38292C64.1323 4.63778 63.67 4.67176 63.3096 4.47127C63.2926 4.46108 63.279 4.45088 63.262 4.44069C63.7175 4.23 64.1493 3.72707 64.4247 3.06103C64.8225 2.09935 64.8361 0.926976 64.0847 0.546381C63.8468 0.424046 63.5714 0.413852 63.296 0.515797C62.9152 0.65852 62.4732 1.07989 62.2624 1.6236C62.0177 1.07989 61.6131 0.65852 61.2289 0.515797C60.9535 0.413852 60.6782 0.424046 60.4402 0.546381C59.6888 0.926976 59.7024 2.09935 60.1002 3.06103C60.3756 3.72707 60.8073 4.2334 61.2629 4.44069C61.2459 4.45088 61.2323 4.46448 61.2153 4.47127C60.855 4.67176 60.3926 4.63778 60.0356 4.38292C59.5052 4.00232 59.3047 3.23094 59.4814 2.26246H58.4955C58.3085 3.53677 58.6587 4.59361 59.4679 5.17469C59.8384 5.43975 60.2736 5.57568 60.7088 5.57568C61.0488 5.57568 61.3887 5.49412 61.6879 5.32421C61.9123 5.19848 62.1027 5.03197 62.2591 4.83827C62.4155 5.03197 62.6024 5.19848 62.8302 5.32421C63.1328 5.49412 63.4694 5.57568 63.8094 5.57568C64.2411 5.57568 64.6797 5.43975 65.0503 5.17469C65.8594 4.59361 66.2096 3.54017 66.0226 2.26586H65.0435V2.26246ZM61.7797 3.26152C61.7797 3.27851 61.7797 3.2955 61.7797 3.31589C61.7695 3.44842 61.7423 3.54017 61.7151 3.57755C61.5961 3.55037 61.2527 3.28191 61.0046 2.68723C60.7258 2.01779 60.804 1.51826 60.8788 1.41971C60.9978 1.4469 61.3411 1.71535 61.5893 2.31003C61.7253 2.63286 61.7729 2.91831 61.7831 3.13579C61.7797 3.17657 61.7763 3.22074 61.7797 3.26152ZM62.8234 3.57415C62.7894 3.52658 62.7622 3.41444 62.7554 3.25812C62.7554 3.21735 62.7554 3.17997 62.7554 3.13919C62.7622 2.9217 62.8132 2.63626 62.9492 2.31003C63.194 1.72215 63.5306 1.45369 63.6564 1.42311C63.7346 1.53865 63.806 2.03138 63.534 2.68723C63.2858 3.27172 62.9458 3.54357 62.8234 3.57415Z"
                          fill="#3B4A57"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          className="sc-2274bq-4 jFnDyb"
                        ></path>
                      </svg>
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_serviceName">
                        <b>{t("PARCEL_serviceName_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_serviceName_mandatory")}
                        {t("PARCEL_serviceName_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_serviceName_fontSize")}
                            {t("PARCEL_serviceName_bold").toString() === "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_serviceName_description")}
                      </Tooltip>
                    }
                  >
                    <Col xs={7} className="serviceName">
                      {data.labelData.serviceName
                        ? data.labelData.serviceName
                        : "Postipaketti"}
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_sender-label">
                        <b>{t("PARCEL_sender-label_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_sender-label_mandatory")}
                        {t("PARCEL_sender-label_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_sender-label_fontSize")}
                            {t("PARCEL_sender-label_bold").toString() === "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_sender-label_description")}
                      </Tooltip>
                    }
                  >
                    <div className="sender-label label">
                      Lähettäjä Avsändare From
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderName">
                        <b>{t("PARCEL_senderName_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderName_mandatory")}
                        {t("PARCEL_senderName_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderName_fontSize")}
                            {t("PARCEL_senderName_bold").toString() === "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderName_description")}
                      </Tooltip>
                    }
                  >
                    <div className="senderName">Sandy Sender</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderName2">
                        <b>{t("PARCEL_senderName2_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderName2_mandatory")}
                        {t("PARCEL_senderName2_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderName2_fontSize")}
                            {t("PARCEL_senderName2_bold").toString() === "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderName2_description")}
                      </Tooltip>
                    }
                  >
                    <div className="senderName2"></div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderAddress1">
                        <b>{t("PARCEL_senderAddress1_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderAddress1_mandatory")}
                        {t("PARCEL_senderAddress1_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderAddress1_fontSize")}
                            {t("PARCEL_senderAddress1_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderAddress1_description")}
                      </Tooltip>
                    }
                  >
                    <div className="senderAddress1">Sender Street 123</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderAddress2">
                        <b>{t("PARCEL_senderAddress2_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderAddress2_mandatory")}
                        {t("PARCEL_senderAddress2_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderAddress2_fontSize")}
                            {t("PARCEL_senderAddress2_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderAddress2_description")}
                      </Tooltip>
                    }
                  >
                    <div className="senderAddress2"></div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderPostalCode">
                        <b>{t("PARCEL_senderPostalCode_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderPostalCode_mandatory")}
                        {t("PARCEL_senderPostalCode_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderPostalCode_fontSize")}
                            {t("PARCEL_senderPostalCode_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderPostalCode_description")}
                      </Tooltip>
                    }
                  >
                    <Col xs={5} className="senderPostalCode">
                      FI-00230
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderPostOffice">
                        <b>{t("PARCEL_senderPostOffice_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderPostOffice_mandatory")}
                        {t("PARCEL_senderPostOffice_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderPostOffice_fontSize")}
                            {t("PARCEL_senderPostOffice_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderPostOffice_description")}
                      </Tooltip>
                    }
                  >
                    <Col className="senderPostOffice">HELSINKI</Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_senderCountry">
                        <b>{t("PARCEL_senderCountry_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_senderCountry_mandatory")}
                        {t("PARCEL_senderCountry_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_senderCountry_fontSize")}
                            {t("PARCEL_senderCountry_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_senderCountry_description")}
                      </Tooltip>
                    }
                  >
                    <div className="senderCountry">Finland</div>
                  </OverlayTrigger>
                </Row>
              </div>
              <div className="receiver">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_receiver-label">
                        <b>{t("PARCEL_receiver-label_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiver-label_mandatory")}
                        {t("PARCEL_receiver-label_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiver-label_fontSize")}
                            {t("PARCEL_receiver-label_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiver-label_description")}
                      </Tooltip>
                    }
                  >
                    <div className="receiver-label label">
                      Vastaanottaja Addressat To
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_receiverName">
                        <b>{t("PARCEL_receiverName_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverName_mandatory")}
                        {t("PARCEL_receiverName_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverName_fontSize")}
                            {t("PARCEL_receiverName_bold").toString() === "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverName_description")}
                      </Tooltip>
                    }
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
                    overlay={
                      <Tooltip id="PARCEL_receiverName2">
                        <b>{t("PARCEL_receiverName2_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverName2_mandatory")}
                        {t("PARCEL_receiverName2_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverName2_fontSize")}
                            {t("PARCEL_receiverName2_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverName2_description")}
                      </Tooltip>
                    }
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
                    overlay={
                      <Tooltip id="PARCEL_receiverAddress1">
                        <b>{t("PARCEL_receiverAddress1_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverAddress1_mandatory")}
                        {t("PARCEL_receiverAddress1_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverAddress1_fontSize")}
                            {t("PARCEL_receiverAddress1_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverAddress1_description")}
                      </Tooltip>
                    }
                  >
                    <div className="receiverAddress1">
                      {" "}
                      {data.labelData.receiverAddress1
                        ? data.labelData.receiverAddress1
                        : "Postintaival 7"}
                    </div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_receiverAddress2">
                        <b>{t("PARCEL_receiverAddress2_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverAddress2_mandatory")}
                        {t("PARCEL_receiverAddress2_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverAddress2_fontSize")}
                            {t("PARCEL_receiverAddress2_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverAddress2_description")}
                      </Tooltip>
                    }
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
                    overlay={
                      <Tooltip id="PARCEL_receiverPostalCode">
                        <b>{t("PARCEL_receiverPostalCode_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverPostalCode_mandatory")}
                        {t("PARCEL_receiverPostalCode_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverPostalCode_fontSize")}
                            {t("PARCEL_receiverPostalCode_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverPostalCode_description")}
                      </Tooltip>
                    }
                  >
                    <Col xs={5} className="receiverPostalCode">
                      {data.labelData.receiverPostalCode
                        ? data.labelData.receiverPostalCode
                        : "FI-00230"}
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_receiverPostCode">
                        <b>{t("PARCEL_receiverPostCode_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverPostCode_mandatory")}
                        {t("PARCEL_receiverPostCode_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverPostCode_fontSize")}
                            {t("PARCEL_receiverPostCode_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverPostCode_description")}
                      </Tooltip>
                    }
                  >
                    <Col xs={6} className="receiverPostOffice">
                      {data.labelData.receiverPostOffice
                        ? data.labelData.receiverPostOffice
                        : "HELSINKI"}
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_receiverCountry">
                        <b>{t("PARCEL_receiverCountry_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverCountry_mandatory")}
                        {t("PARCEL_receiverCountry_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverCountry_fontSize")}
                            {t("PARCEL_receiverCountry_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverCountry_description")}
                      </Tooltip>
                    }
                  >
                    <div className="receiverCountry">
                      {data.labelData.receiverCountry
                        ? data.labelData.receiverCountry
                        : "Finland"}
                    </div>
                  </OverlayTrigger>
                </Row>
              </div>
            </Col>
            <Col className="middle" xs={3}>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_processCode">
                      <b>{t("PARCEL_processCode_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_processCode_mandatory")}
                      {t("PARCEL_processCode_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_processCode_fontSize")}
                          {t("PARCEL_processCode_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_processCode_description")}
                    </Tooltip>
                  }
                >
                  <div className="processCode">
                    {data.labelData.processNumber
                      ? data.labelData.processNumber
                      : "16"}
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <Col className="receiverPhone">
                  <Col xs={1} className="phoneIcon">
                    <i className="fas fa-phone-square-alt"></i>
                  </Col>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="PARCEL_receiverPhone">
                        <b>{t("PARCEL_receiverPhone_name")}</b>
                        <br />
                        {t("Mandatory") +
                          ": " +
                          t("PARCEL_receiverPhone_mandatory")}
                        {t("PARCEL_receiverPhone_fontSize").toString() ===
                        "null" ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {t("Font size") +
                              ": " +
                              t("PARCEL_receiverPhone_fontSize")}
                            {t("PARCEL_receiverPhone_bold").toString() ===
                            "true"
                              ? " " + t("bold")
                              : ""}
                          </>
                        )}
                        <br />
                        {t("Description") +
                          ": " +
                          t("PARCEL_receiverPhone_description")}
                      </Tooltip>
                    }
                  >
                    <Col xs={5} className="receiverPhoneValue label">
                      {data.labelData.receiverPhone
                        ? data.labelData.receiverPhone
                        : "04018234990"}
                    </Col>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Col>
            <Col xs={4} className="product">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_serviceBarcode">
                      <b>{t("PARCEL_serviceBarcode_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_serviceBarcode_mandatory")}
                      {t("PARCEL_serviceBarcode_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_serviceBarcode_fontSize")}
                          {t("PARCEL_serviceBarcode_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_serviceBarcode_description")}
                    </Tooltip>
                  }
                >
                  <div className="serviceBarcode">
                    <Barcode
                      value={data.service ? "2W" + data.service : "2W2103"}
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
                    <Tooltip id="PARCEL_serviceCode">
                      <b>{t("PARCEL_serviceCode_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_serviceCode_mandatory")}
                      {t("PARCEL_serviceCode_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_serviceCode_fontSize")}
                          {t("PARCEL_serviceCode_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_serviceCode_description")}
                    </Tooltip>
                  }
                >
                  <div className="serviceCode">
                    {data.service ? "2W" + data.service : "2W2103"}
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_EDISSI">
                      <b>{t("PARCEL_EDISSI_name")}</b>
                      <br />
                      {t("Mandatory") + ": " + t("PARCEL_EDISSI_mandatory")}
                      {t("PARCEL_EDISSI_fontSize").toString() === "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") + ": " + t("PARCEL_EDISSI_fontSize")}
                          {t("PARCEL_EDISSI_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") + ": " + t("PARCEL_EDISSI_description")}
                    </Tooltip>
                  }
                >
                  <div className="EDISSI">EDI SSI</div>
                </OverlayTrigger>
              </Row>
              <Row>
                <Col className="dateBox">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_date-label">
                          <b>{t("PARCEL_date-label_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_date-label_mandatory")}
                          {t("PARCEL_date-label_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_date-label_fontSize")}
                              {t("PARCEL_date-label_bold").toString() === "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_date-label_description")}
                        </Tooltip>
                      }
                    >
                      <div className="date-label label">
                        Päivämäärä Datum Date
                      </div>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_date">
                          <b>{t("PARCEL_date_name")}</b>
                          <br />
                          {t("Mandatory") + ": " + t("PARCEL_date_mandatory")}
                          {t("PARCEL_date_fontSize").toString() === "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_date_fontSize")}
                              {t("PARCEL_date_bold").toString() === "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_date_description")}
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
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_weightValue">
                          <b>{t("PARCEL_weightValue_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_weightValue_mandatory")}
                          {t("PARCEL_weightValue_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_weightValue_fontSize")}
                              {t("PARCEL_weightValue_bold").toString() ===
                              "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_weightValue_description")}
                        </Tooltip>
                      }
                    >
                      <Col xs={7} className="weightValue">
                        {data.labelData.weight ? data.labelData.weight : "0,31"}
                      </Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_weightlabel">
                          <b>{t("PARCEL_weightlabel_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_weightlabel_mandatory")}
                          {t("PARCEL_weightlabel_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_weightlabel_fontSize")}
                              {t("PARCEL_weightlabel_bold").toString() ===
                              "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_weightlabel_description")}
                        </Tooltip>
                      }
                    >
                      <Col xs={2} className="weightlabel">
                        kg
                      </Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
                <Col className="volume box">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_volumeValue">
                          <b>{t("PARCEL_volumeValue_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_volumeValue_mandatory")}
                          {t("PARCEL_volumeValue_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_volumeValue_fontSize")}
                              {t("PARCEL_volumeValue_bold").toString() ===
                              "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_volumeValue_description")}
                        </Tooltip>
                      }
                    >
                      <Col xs={7} className="volumeValue">
                        {data.labelData.volume ? data.labelData.volume : ""}
                      </Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_volumelabel">
                          <b>{t("PARCEL_volumelabel_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_volumelabel_mandatory")}
                          {t("PARCEL_volumelabel_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_volumelabel_fontSize")}
                              {t("PARCEL_volumelabel_bold").toString() ===
                              "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_volumelabel_description")}
                        </Tooltip>
                      }
                    >
                      <Col xs={2} className="volumelabel">
                        m3
                      </Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="packages  box">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_packageCount">
                          <b>{t("PARCEL_packageCount_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_packageCount_mandatory")}
                          {t("PARCEL_packageCount_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_packageCount_fontSize")}
                              {t("PARCEL_packageCount_bold").toString() ===
                              "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_packageCount_description")}
                        </Tooltip>
                      }
                    >
                      <Col xs={7} className="packageCount">
                        {data.labelData.packageCount
                          ? data.labelData.packageCount
                          : "1"}
                      </Col>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="PARCEL_packageCountLabel">
                          <b>{t("PARCEL_packageCountLabel_name")}</b>
                          <br />
                          {t("Mandatory") +
                            ": " +
                            t("PARCEL_packageCountLabel_mandatory")}
                          {t("PARCEL_packageCountLabel_fontSize").toString() ===
                          "null" ? (
                            ""
                          ) : (
                            <>
                              <br />
                              {t("Font size") +
                                ": " +
                                t("PARCEL_packageCountLabel_fontSize")}
                              {t("PARCEL_packageCountLabel_bold").toString() ===
                              "true"
                                ? " " + t("bold")
                                : ""}
                            </>
                          )}
                          <br />
                          {t("Description") +
                            ": " +
                            t("PARCEL_packageCountLabel_description")}
                        </Tooltip>
                      }
                    >
                      <Col xs={4} className="packageCountLabel">
                        kpl/st
                      </Col>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="cod">
            <Col xs={4} className="addon box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_addon-label">
                      <b>{t("PARCEL_addon-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_addon-label_mandatory")}
                      {t("PARCEL_addon-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_addon-label_fontSize")}
                          {t("PARCEL_addon-label_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_addon-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">
                    Lisäpalvelut Tilläggstjänster
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                {addonboxes.map((addon, i) => (
                  <Col className={"addonbox " + i} key={"addonbox_" + i}>
                    <div className={"addonValue " + i} key={"addonvalue_" + i}>
                      {addon.marking}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={4} className="otherPayer box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_otherPayer-label">
                      <b>{t("PARCEL_otherPayer-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_otherPayer-label_mandatory")}
                      {t("PARCEL_otherPayer-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_otherPayer-label_fontSize")}
                          {t("PARCEL_otherPayer-label_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_otherPayer-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="otherPayer-label">
                    Maksaja muu kuin lähettäjä Betalaren annan än avsändaren
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_otherPayerValue">
                      <b>{t("PARCEL_otherPayerValue_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_otherPayerValue_mandatory")}
                      {t("PARCEL_otherPayerValue_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_otherPayerValue_fontSize")}
                          {t("PARCEL_otherPayerValue_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_otherPayerValue_description")}
                    </Tooltip>
                  }
                >
                  <Col className="otherPayerValue">
                    {data.labelData.otherPayer ? data.labelData.otherPayer : ""}
                  </Col>
                </OverlayTrigger>
              </Row>
            </Col>
            <Col className="packages box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_packageCountLabel">
                      <b>{t("PARCEL_packageCountLabel_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_packageCountLabel_mandatory")}
                      {t("PARCEL_packageCountLabel_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_packageCountLabel_fontSize")}
                          {t("PARCEL_packageCountLabel_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_packageCountLabel_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">kpl st</div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_packageCount">
                      <b>{t("PARCEL_packageCount_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_packageCount_mandatory")}
                      {t("PARCEL_packageCount_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_packageCount_fontSize")}
                          {t("PARCEL_packageCount_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_packageCount_description")}
                    </Tooltip>
                  }
                >
                  <div className="packageCount">
                    {data.labelData.packageCount
                      ? data.labelData.packageCount
                      : "1"}
                  </div>
                </OverlayTrigger>
              </Row>
            </Col>
            <Col className="empty"></Col>
          </Row>
          <Row>
            <Col className="codAmount box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codAmount-label">
                      <b>{t("PARCEL_codAmount-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codAmount-label_mandatory")}
                      {t("PARCEL_codAmount-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codAmount-label_fontSize")}
                          {t("PARCEL_codAmount-label_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codAmount-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">PE-summa PF-belopp</div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codAmountValue">
                      <b>{t("PARCEL_codAmountValue_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codAmountValue_mandatory")}
                      {t("PARCEL_codAmountValue_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codAmountValue_fontSize")}
                          {t("PARCEL_codAmountValue_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codAmountValue_description")}
                    </Tooltip>
                  }
                >
                  <div className="codAmountValue">
                    {data.labelData.codAmount ? data.labelData.codAmount : ""}
                  </div>
                </OverlayTrigger>
              </Row>
            </Col>
            <Col className="codIBAN box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codIBAN-label">
                      <b>{t("PARCEL_codIBAN-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codIBAN-label_mandatory")}
                      {t("PARCEL_codIBAN-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codIBAN-label_fontSize")}
                          {t("PARCEL_codIBAN-label_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codIBAN-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">
                    Tilinumero Kontonummer
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codIBANValue">
                      <b>{t("PARCEL_codIBANValue_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codIBANValue_mandatory")}
                      {t("PARCEL_codIBANValue_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codIBANValue_fontSize")}
                          {t("PARCEL_codIBANValue_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codIBANValue_description")}
                    </Tooltip>
                  }
                >
                  <div className="codIBANvalue">
                    {data.labelData.codIBAN ? data.labelData.codIBAN : ""}
                  </div>
                </OverlayTrigger>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={8} className="codReference box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codReference-label">
                      <b>{t("PARCEL_codReference-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codReference-label_mandatory")}
                      {t("PARCEL_codReference-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codReference-label_fontSize")}
                          {t("PARCEL_codReference-label_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codReference-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">
                    Pankkiviite Bankreferens
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codReferenceValue">
                      <b>{t("PARCEL_codReferenceValue_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codReferenceValue_mandatory")}
                      {t("PARCEL_codReferenceValue_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codReferenceValue_fontSize")}
                          {t("PARCEL_codReferenceValue_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codReferenceValue_description")}
                    </Tooltip>
                  }
                >
                  <div className="codReferenceValue">
                    {data.labelData.codReference
                      ? data.labelData.codReference
                      : ""}
                  </div>
                </OverlayTrigger>
              </Row>
            </Col>
            <Col className="codBIC box">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codBIC-label">
                      <b>{t("PARCEL_codBIC-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codBIC-label_mandatory")}
                      {t("PARCEL_codBIC-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codBIC-label_fontSize")}
                          {t("PARCEL_codBIC-label_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codBIC-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">BIC</div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_codBICValue">
                      <b>{t("PARCEL_codBICValue_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_codBICValue_mandatory")}
                      {t("PARCEL_codBICValue_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_codBICValue_fontSize")}
                          {t("PARCEL_codBICValue_bold").toString() === "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_codBICValue_description")}
                    </Tooltip>
                  }
                >
                  <div className="codBICvalue">
                    {data.labelData.codBIC ? data.labelData.codBIC : ""}
                  </div>
                </OverlayTrigger>
              </Row>
            </Col>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="PARCEL_trackingBarcodeValue">
                  <b>{t("PARCEL_trackingBarcodeValue_name")}</b>
                  <br />
                  {t("Mandatory") +
                    ": " +
                    t("PARCEL_trackingBarcodeValue_mandatory")}
                  {t("PARCEL_trackingBarcodeValue_fontSize").toString() ===
                  "null" ? (
                    ""
                  ) : (
                    <>
                      <br />
                      {t("Font size") +
                        ": " +
                        t("PARCEL_trackingBarcodeValue_fontSize")}
                      {t("PARCEL_trackingBarcodeValue_bold").toString() ===
                      "true"
                        ? " " + t("bold")
                        : ""}
                    </>
                  )}
                  <br />
                  {t("Description") +
                    ": " +
                    t("PARCEL_trackingBarcodeValue_description")}
                </Tooltip>
              }
            >
              <div className="trackingBarcodeValue">
                JJFI 699999 12345 678901
              </div>
            </OverlayTrigger>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="PARCEL_trackingBarcode">
                  <b>{t("PARCEL_trackingBarcode_name")}</b>
                  <br />
                  {t("Mandatory") +
                    ": " +
                    t("PARCEL_trackingBarcode_mandatory")}
                  {t("PARCEL_trackingBarcode_fontSize").toString() ===
                  "null" ? (
                    ""
                  ) : (
                    <>
                      <br />
                      {t("Font size") +
                        ": " +
                        t("PARCEL_trackingBarcode_fontSize")}
                      {t("PARCEL_trackingBarcode_bold").toString() === "true"
                        ? " " + t("bold")
                        : ""}
                    </>
                  )}
                  <br />
                  {t("Description") +
                    ": " +
                    t("PARCEL_trackingBarcode_description")}
                </Tooltip>
              }
            >
              <div className="trackingBarcode">
                <Barcode value="JJFI69999912345678901" displayValue={false} />
              </div>
            </OverlayTrigger>
          </Row>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="PARCEL_trackingBarcodeValue">
                  <b>{t("PARCEL_trackingBarcodeValue_name")}</b>
                  <br />
                  {t("Mandatory") +
                    ": " +
                    t("PARCEL_trackingBarcodeValue_mandatory")}
                  {t("PARCEL_trackingBarcodeValue_fontSize").toString() ===
                  "null" ? (
                    ""
                  ) : (
                    <>
                      <br />
                      {t("Font size") +
                        ": " +
                        t("PARCEL_trackingBarcodeValue_fontSize")}
                      {t("PARCEL_trackingBarcodeValue_bold").toString() ===
                      "true"
                        ? " " + t("bold")
                        : ""}
                    </>
                  )}
                  <br />
                  {t("Description") +
                    ": " +
                    t("PARCEL_trackingBarcodeValue_description")}
                </Tooltip>
              }
            >
              <div className="trackingBarcodeValue">
                JJFI 699999 12345 678901
              </div>
            </OverlayTrigger>
          </Row>
          <Row>
            <Col className="additionalInfo">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_additionalInfo-label">
                      <b>{t("PARCEL_additionalInfo-label_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_additionalInfo-label_mandatory")}
                      {t("PARCEL_additionalInfo-label_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_additionalInfo-label_fontSize")}
                          {t("PARCEL_additionalInfo-label_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_additionalInfo-label_description")}
                    </Tooltip>
                  }
                >
                  <div className="addon-label label">
                    Lisätiedot Tilläggsuppgifter
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="PARCEL_additionalInfoValue">
                      <b>{t("PARCEL_additionalInfoValue_name")}</b>
                      <br />
                      {t("Mandatory") +
                        ": " +
                        t("PARCEL_additionalInfoValue_mandatory")}
                      {t("PARCEL_additionalInfoValue_fontSize").toString() ===
                      "null" ? (
                        ""
                      ) : (
                        <>
                          <br />
                          {t("Font size") +
                            ": " +
                            t("PARCEL_additionalInfoValue_fontSize")}
                          {t("PARCEL_additionalInfoValue_bold").toString() ===
                          "true"
                            ? " " + t("bold")
                            : ""}
                        </>
                      )}
                      <br />
                      {t("Description") +
                        ": " +
                        t("PARCEL_additionalInfoValue_description")}
                    </Tooltip>
                  }
                >
                  <div className="additionalInfoValue">
                    {data.labelData.addons
                      ? data.labelData.addons.map((addon, i) => (
                          <div key={"addon_" + i}>
                            {addon.labelName.toUpperCase()}
                          </div>
                        ))
                      : ""}
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <div className="PostiGreen">
                  Posti Green - ilmastoystävällinen kuljetus
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ParcelLabel;
