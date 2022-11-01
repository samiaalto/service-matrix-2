import { Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Overlay = (fieldId: string, labelType: string) => {
  const { t } = useTranslation();
  return (
    <Tooltip id={labelType + "_" + fieldId}>
      <b>{t(labelType + "_" + fieldId + "_name")}</b>
      <br />
      {t("Mandatory") + ": " + t(labelType + "_" + fieldId + "_mandatory")}
      {!t(labelType + "_" + fieldId + "_fontSize") ? (
        ""
      ) : (
        <>
          <br />
          {t("Font size") + ": " + t(labelType + "_" + fieldId + "_fontSize")}
          {t(labelType + "_" + fieldId + "_bold").toString() === "true"
            ? " " + t("bold")
            : ""}
        </>
      )}
      <br />
      {t("Description") + ": " + t(labelType + "_" + fieldId + "_description")}
    </Tooltip>
  );
};

export default Overlay;
