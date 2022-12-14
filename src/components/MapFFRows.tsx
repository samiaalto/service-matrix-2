const MapFFRows = (services, additionalServices, fileFormats, setFfRowData) => {
  let rows = [];
  let index = 0;
  for (let record of fileFormats.records) {
    for (let attribute of record.Records) {
      let length = "";
      let type = "";
      let moc = "O";
      let repeat;
      let name;
      let position;
      let indent = "";

      let path = attribute.Path.split(".").filter((item) => item !== "0");

      indent = "  ".repeat(path.length - 1);

      if (attribute.ExtractionPath) {
        name = attribute.Name + " (" + attribute.ExtractionPath + ")";
      } else if (attribute.Type === "Attribute") {
        name = "@" + attribute.Name;
      } else {
        name = attribute.Name;
      }

      if (!attribute.Length && attribute.Validations) {
        for (let validation of attribute.Validations) {
          if (validation.Type === "Size") {
            length = validation.MaxValue;
          }
        }
      } else {
        length = attribute.Length;
      }

      if (!length) {
        type = attribute.Type;
      } else {
        type = attribute.Type + " (" + length + ")";
      }

      if (
        attribute.RepeatMin > 0 ||
        attribute.RepeatMax === attribute.RepeatMin
      ) {
        moc = "M";
      }

      if (attribute.RepeatMin === attribute.RepeatMax) {
        repeat = attribute.RepeatMax;
      } else {
        repeat = attribute.RepeatMin + "-" + attribute.RepeatMax;
      }

      if (attribute.Position) {
        position =
          attribute.Position + "-" + (attribute.Position + attribute.Length);
      }

      let tooltip = [];

      let splitPath = attribute.Path.split(".");
      let parent;
      for (let j = splitPath.length - 2; j >= 0; j--) {
        if (splitPath[j] !== "0") {
          parent = splitPath[j];
          break;
        }
      }

      if (
        attribute.Name === "Product" ||
        attribute.Name === "ServiceCode" ||
        (attribute.Name === "id" && parent === "service")
      ) {
        for (let service of services.records) {
          for (let format of service.Fields) {
            if (
              (format.MessageFormat === record.Name &&
                format.PropertyName === attribute.Name &&
                format.MessagePosition === null) ||
              (format.MessageFormat === record.Name &&
                format.PropertyName === attribute.Name &&
                format.MessagePosition === parent)
            ) {
              tooltip.push(format.PropertyValue + "-" + service.ServiceCode);
            }
          }
        }
      }

      if (
        (attribute.Name === "type" && parent === "PackageQuantity") ||
        attribute.Name === "PackageType" ||
        attribute.Name === "packageCode"
      ) {
        for (let service of services.records) {
          for (let type of service.PackageTypesAndDimensions) {
            if (
              type.MessageFormat === record.Name &&
              !tooltip.includes(type.PackageType + "-" + type.PackageType)
            ) {
              tooltip.push(type.PackageType + "-" + type.PackageType);
            }
          }
        }
      }

      if (
        attribute.Name === "Service" ||
        attribute.Name === "AdditionalServices" ||
        (attribute.Name === "id" && parent === "addons")
      ) {
        for (let addon of additionalServices.records) {
          for (let format of addon.Fields) {
            if (
              format.MessageFormat === record.Name &&
              format.PropertyName === attribute.Name &&
              !tooltip.some((s) => s.indexOf(format.PropertyValue) !== -1)
            ) {
              tooltip.push(format.PropertyValue + "-" + addon.ServiceCode);
            }
          }
        }
      }

      if (attribute.Validations.length > 0) {
        for (let item of attribute.Validations) {
          tooltip.push(
            item.ValidationValue +
              "-" +
              attribute.Name +
              "_" +
              item.ValidationValue
          );
        }
      }

      rows.push({
        format: record.Name,
        attribute: (
          <pre key={"attributeName_" + index} className="attributeName">
            {indent + name}
          </pre>
        ),
        moc: moc,
        repeat: repeat,
        type: type,
        position: position,
        description: attribute.DescriptionEN,
        tooltip: tooltip,
      });
    }
    index++;
  }

  return setFfRowData(rows);
};

export default MapFFRows;
