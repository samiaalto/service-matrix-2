const MapFFRows = (fileFormats, setFfRowData) => {
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
      });
    }
    index++;
  }
  console.log(rows);
  return setFfRowData(rows);
};

export default MapFFRows;
