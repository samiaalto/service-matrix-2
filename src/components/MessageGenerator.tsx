const MessageGenerator = (
  selected,
  services,
  fileFormats,
  additionalServices
) => {
  const { create } = require("xmlbuilder2");

  //console.log(addons);

  function set(obj, path, value) {
    // protect against being something unexpected
    obj = typeof obj === "object" ? obj : {};
    // split the path into and array if its not one already
    var keys = Array.isArray(path) ? path : path.split(".");
    // keep up with our current place in the object
    // starting at the root object and drilling down
    var curStep = obj;
    // loop over the path parts one at a time
    // but, dont iterate the last part,
    for (var i = 0; i < keys.length - 1; i++) {
      // get the current path part
      var key = keys[i];

      // if nothing exists for this key, make it an empty object or array
      if (
        !curStep[key] &&
        !Object.prototype.hasOwnProperty.call(curStep, key)
      ) {
        // get the next key in the path, if its numeric, make this property an empty array
        // otherwise, make it an empty object
        var nextKey = keys[i + 1];
        var useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
        curStep[key] = useArray ? [] : {};
      }
      // update curStep to point to the new level
      curStep = curStep[key];
    }
    // set the final key to our value
    var finalStep = keys[keys.length - 1];
    //if (value) {
    curStep[finalStep] = value;
    //} else {
    //  curStep = curStep[finalStep];
    //}
  }

  const formatXml = (xml, tab) => {
    // tab = optional indent value, default is tab (\t)
    var formatted = "",
      indent = "";
    tab = tab || "\t";
    xml.split(/>\s*</).forEach(function (node) {
      if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
      formatted += indent + "<" + node + ">\r\n";
      if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab; // increase indent
    });
    return formatted.substring(1, formatted.length - 3);
  };

  const beautify = (xmlData) => {
    let highlighted = [];
    let row = 1;
    let rows = [];
    let xmlRows = xmlData.split("\n");
    for (let j = 0; j < xmlRows.length; j++) {
      var string = [];
      var items = xmlRows[j].split(/(?=[ "?=></])|(?<=[ "?=></])/g);

      for (var i = 0; i < items.length; i++) {
        if (
          items[i] === "<" ||
          items[i] === ">" ||
          items[i] === "/" ||
          items[i] === "?"
        ) {
          string.push(<span className="bracket">{items[i]}</span>);
        } else if (items[i - 1] === "?") {
          string.push(<span className="bracket">{items[i]}</span>);
        } else if (items[i + 1] === "=") {
          string.push(<span className="string">{items[i]}</span>);
        } else if (items[i] === "=") {
          string.push(<span className="string">{items[i]}</span>);
        } else if (items[i - 1] === "<" || items[i - 1] === "/") {
          string.push(<span className="key">{items[i]}</span>);
        } else {
          string.push(<span>{items[i]}</span>);
        }
      }

      //console.log(string);

      highlighted.push(<span key={row}>{string}</span>);
      highlighted.push("\n");

      rows.push(row);
      rows.push("\n");
      row++;
    }
    return highlighted;
  };

  const beautifyJSON = (jsonData) => {
    let highlighted = [];
    let row = 1;
    let rows = [row, "\n"];
    //console.log(jsonData);
    let jsonRows = jsonData.split("\n");
    //let jsonRows = jsonData;
    for (let j = 0; j < jsonRows.length; j++) {
      var testiii = jsonRows[j].split(/(?=[}{":,\[\]])|(?<=[}{":,\[\]])/g);
      var string = [];
      for (var i = 0; i < testiii.length; i++) {
        if (testiii[i - 1] === '"' && testiii[i + 1] === '"') {
          string.push(<span className="string">{testiii[i]}</span>);
        } else if (testiii[i - 1] === ":") {
          if (/true|null|false/.test(testiii[i])) {
            string.push(<span className="boolean">{testiii[i]}</span>);
          } else {
            string.push(<span className="number">{testiii[i]}</span>);
          }
        } else {
          string.push(<span>{testiii[i]}</span>);
        }
      }
    }

    highlighted.push(<span key={row}>{string}</span>);
    highlighted.push("\n");

    row++;
    rows.push(row);
    rows.push("\n");
    //console.log(highlighted);
    return highlighted;
  };

  const serviceProps = [];
  let addonArr = [];
  let labelData = {};
  let labelAddons = [];
  let addons = [];

  addonArr = selected.addons;

  for (const record of services.records) {
    if (record.ServiceCode === selected.service) {
      labelData["labelType"] = record.LabelType;
      labelData["serviceName"] = record.LabelName;
      labelData["processNumber"] = record.ProcessNumber;
      if (record.Fields.length > 0) {
        for (const field of record.Fields) {
          serviceProps.push({
            format: field.MessageFormat,
            property: field.PropertyName,
            value: field.PropertyValue,
            position: field.MessagePosition,
            mandatory: field.Mandatory,
          });
        }
      }
    }
  }
  if (addonArr) {
    for (const record of additionalServices.records) {
      if (addonArr.includes(record.ServiceCode)) {
        labelAddons.push({
          labelName: record.DisplayNameFI,
          labelMarking: record.LabelMarking,
        });
        if (record.Fields.length > 0) {
          for (const field of record.Fields) {
            if (field.MessageFormat === "SMARTSHIP") {
              if (field.PropertyName === "id") {
                addons.push(field.PropertyValue);
                serviceProps.push({
                  format: field.MessageFormat,
                  property: field.PropertyName,
                  value: field.PropertyValue,
                  position: field.MessagePosition,
                  mandatory: field.Mandatory,
                });
              } else {
                serviceProps.push({
                  format: field.MessageFormat,
                  property:
                    addons[addons.length - 1] + "-" + field.PropertyName,
                  value: field.PropertyValue,
                  position: field.MessagePosition,
                  mandatory: field.Mandatory,
                });
              }
            } else {
              serviceProps.push({
                format: field.MessageFormat,
                property: field.PropertyName,
                value: field.PropertyValue,
                position: field.MessagePosition,
                mandatory: field.Mandatory,
              });
            }
          }
        }
      }
    }
  }

  let d = new Date();
  labelData["dateTime"] =
    d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
  labelData["addons"] = labelAddons;

  let outXML = {};
  let outJSON = {};
  let outTXT = "";
  let indexes = {};
  let sampleValues = selected.showSamples;
  let mandatoryOnly = selected.showOptional;
  let removableElements = [];
  let party;
  let usedProps = [];
  let usedPropsJSON = [];
  let usedPropsTXT = [];

  console.log(serviceProps);

  for (const record of fileFormats.records) {
    if (serviceProps.some((e) => e.format === record.Name)) {
      for (let i = 0; i < record.Records.length; i++) {
        if (record.MessageFormat === "XML") {
          // Determine new path for the element

          let obj = record.Records[i];
          let splitPath = obj.Path.split(".");
          let parent;
          for (let j = splitPath.length - 2; j >= 0; j--) {
            if (splitPath[j] !== "0") {
              parent = splitPath[j];
              break;
            }
          }

          let parentIndex;
          let objParent;

          if (obj.Name === "role") {
            party = obj.ExampleValue;
          }
          // = record.Records.findIndex(
          //  (o) => o.Name === obj.Parent
          //);

          for (let j = i; j >= 0; j--) {
            if (record.Records[j].Name === parent) {
              parentIndex = j;
              break;
            }
          }
          if (parentIndex > -1) {
            objParent = record.Records[parentIndex];
          } else {
            objParent = {};
            objParent["Type"] = null;
            if (!removableElements.includes(parent)) {
              removableElements.push(parent);
            }
          }

          let val = "";
          let found = false;
          for (let k = 0; k < serviceProps.length; k++) {
            if (
              (serviceProps[k].property === record.Records[i].Name &&
                serviceProps[k].position === null &&
                !usedProps.includes(k) &&
                serviceProps[k].mandatory) ||
              (serviceProps[k].property === record.Records[i].Name &&
                serviceProps[k].position === party &&
                !usedProps.includes(k) &&
                serviceProps[k].mandatory)
            ) {
              found = true;
              break;
            }
          }

          if (found) {
            for (const [index, prop] of serviceProps.entries()) {
              if (prop.property === record.Records[i].Name) {
                val = prop.value;
                usedProps.push(index);
                //console.log(objParent);
                let newPath = obj.Path;
                if (typeof objParent !== "undefined") {
                  if (objParent.Type === "Array" || objParent.Type === null) {
                    if (!indexes.hasOwnProperty(parent)) {
                      indexes[parent] = 0;
                      indexes[obj.Name] = 0;
                    } else if (indexes.hasOwnProperty(obj.Name)) {
                      indexes[obj.Name] = indexes[obj.Name] + 1;
                    }

                    let path = obj.Path.split(".");

                    for (const index of Object.keys(indexes)) {
                      let elIndex = path.findIndex((o) => o === index);
                      if (elIndex > -1) {
                        path[elIndex + 1] = indexes[index];
                      }
                    }
                    newPath = path.join(".");
                  } else {
                    let path = obj.Path.split(".");

                    for (const index of Object.keys(indexes)) {
                      let elIndex = path.findIndex((o) => o === index);
                      if (elIndex > -1) {
                        path[elIndex + 1] = indexes[index];
                      }
                    }
                    newPath = path.join(".");
                  }
                }
                //}

                // Set the attributes

                let next = i + 1;
                let value = {};

                if (sampleValues) {
                  if (obj.ExampleValue === "dateTime") {
                    value = Object.assign(value, {
                      "#text":
                        new Date().toISOString().split(".")[0] + "+03:00",
                    });
                  } else {
                    value = Object.assign(value, { "#text": obj.ExampleValue });
                  }
                }

                //for (const prop of serviceProps) {
                //  if (prop.property === record.Records[i].Name) {
                //    val = prop.value;
                //  }
                //}

                if (val !== "") {
                  value = Object.assign(value, { "#text": val });
                }

                // Handle attributes

                if (
                  i !== record.Records.length - 1 &&
                  record.Records[next].Type === "Attribute"
                ) {
                  if (record.Records[next].ExampleValue === "time") {
                    value = {
                      ["@" + record.Records[next].Name]:
                        sampleValues || val !== "" ? "12:00:00+03:00" : "",
                      "#text":
                        val !== ""
                          ? val
                          : sampleValues
                          ? new Date().toISOString().split(".")[0]
                          : "",
                    };
                  } else {
                    value = {
                      ["@" + record.Records[next].Name]:
                        sampleValues || val !== ""
                          ? record.Records[next].ExampleValue
                          : "",
                      "#text":
                        val !== "" ? val : sampleValues ? obj.ExampleValue : "",
                    };
                  }

                  //console.log(value);

                  if (i > 1 && record.Records[i].Type === "Object") {
                    let value2 = {
                      ["@" + record.Records[i + 1].Name]: sampleValues
                        ? record.Records[i + 1].ExampleValue
                        : "",
                      "#text": sampleValues
                        ? record.Records[i].ExampleValue
                        : "",
                    };

                    let path = record.Records[i].Path.split(".");

                    for (const index of Object.keys(indexes)) {
                      let elIndex = path.findIndex((o) => o === index);
                      if (elIndex > -1) {
                        path[elIndex + 1] = indexes[index];
                      }
                    }
                    let newPath2 = path.join(".");

                    set(outXML, newPath2, value2);
                  }

                  if (
                    next + 1 < record.Records.length - 1 &&
                    record.Records[next + 1].Type === "Attribute"
                  ) {
                    if (record.Records[next + 1].ExampleValue === "time") {
                      value = Object.assign(value, {
                        ["@" + record.Records[next + 1].Name]: sampleValues
                          ? "16:00:00+03:00"
                          : "",
                        "#text": sampleValues
                          ? new Date().toISOString().split("T")[0]
                          : "",
                      });
                    } else {
                      value = Object.assign(value, {
                        ["@" + record.Records[next + 1].Name]: sampleValues
                          ? record.Records[next + 1].ExampleValue
                          : "",
                        "#text": sampleValues
                          ? record.Records[i].ExampleValue
                          : "",
                      });
                    }
                  }
                }
                //console.log(newPath);
                // Set the element in to the tree

                if (
                  obj.Type !== "Object" &&
                  obj.Type !== "Array" &&
                  obj.Type !== "Attribute"
                ) {
                  set(outXML, newPath, value);
                }
              }
            }
          } else {
            let newPath = obj.Path;
            if (typeof objParent !== "undefined") {
              if (objParent.Type === "Array" || objParent.Type === null) {
                if (!indexes.hasOwnProperty(parent)) {
                  indexes[parent] = 0;
                  indexes[obj.Name] = 0;
                } else if (indexes.hasOwnProperty(obj.Name)) {
                  indexes[obj.Name] = indexes[obj.Name] + 1;
                }

                let path = obj.Path.split(".");

                for (const index of Object.keys(indexes)) {
                  let elIndex = path.findIndex((o) => o === index);
                  if (elIndex > -1) {
                    path[elIndex + 1] = indexes[index];
                  }
                }
                newPath = path.join(".");
              } else {
                let path = obj.Path.split(".");

                for (const index of Object.keys(indexes)) {
                  let elIndex = path.findIndex((o) => o === index);
                  if (elIndex > -1) {
                    path[elIndex + 1] = indexes[index];
                  }
                }
                newPath = path.join(".");
              }
            }
            //}

            // Set the attributes

            let next = i + 1;
            let value = {};

            if (sampleValues) {
              if (obj.ExampleValue === "dateTime") {
                value = Object.assign(value, {
                  "#text": new Date().toISOString().split(".")[0] + "+03:00",
                });
              } else {
                value = Object.assign(value, { "#text": obj.ExampleValue });
              }
            }

            //for (const prop of serviceProps) {
            //  if (prop.property === record.Records[i].Name) {
            //    val = prop.value;
            //  }
            //}

            if (val !== "") {
              value = Object.assign(value, { "#text": val });
            }

            // Handle attributes

            if (
              i !== record.Records.length - 1 &&
              record.Records[next].Type === "Attribute"
            ) {
              if (record.Records[next].ExampleValue === "time") {
                value = {
                  ["@" + record.Records[next].Name]:
                    sampleValues || val !== "" ? "12:00:00+03:00" : "",
                  "#text":
                    val !== ""
                      ? val
                      : sampleValues
                      ? new Date().toISOString().split(".")[0]
                      : "",
                };
              } else {
                value = {
                  ["@" + record.Records[next].Name]:
                    sampleValues || val !== ""
                      ? record.Records[next].ExampleValue
                      : "",
                  "#text":
                    val !== "" ? val : sampleValues ? obj.ExampleValue : "",
                };
              }

              //console.log(value);

              if (i > 1 && record.Records[i].Type === "Object") {
                let value2 = {
                  ["@" + record.Records[i + 1].Name]: sampleValues
                    ? record.Records[i + 1].ExampleValue
                    : "",
                  "#text": sampleValues ? record.Records[i].ExampleValue : "",
                };

                let path = record.Records[i].Path.split(".");

                for (const index of Object.keys(indexes)) {
                  let elIndex = path.findIndex((o) => o === index);
                  if (elIndex > -1) {
                    path[elIndex + 1] = indexes[index];
                  }
                }
                let newPath2 = path.join(".");

                if (!mandatoryOnly) {
                  let parentObjectMandatory = true;

                  let splitPath = newPath.split(".");

                  for (let j = i; j >= 0; j--) {
                    if (
                      splitPath.includes(record.Records[j].Name) &&
                      !record.Records[j].Mandatory
                    ) {
                      parentObjectMandatory = record.Records[j].Mandatory;
                      break;
                    }
                  }

                  if (obj.Mandatory && parentObjectMandatory) {
                    set(outXML, newPath2, value2);
                  }
                } else {
                  set(outXML, newPath2, value2);
                }
              }

              if (
                next + 1 < record.Records.length - 1 &&
                record.Records[next + 1].Type === "Attribute"
              ) {
                if (record.Records[next + 1].ExampleValue === "time") {
                  value = Object.assign(value, {
                    ["@" + record.Records[next + 1].Name]: sampleValues
                      ? "16:00:00+03:00"
                      : "",
                    "#text": sampleValues
                      ? new Date().toISOString().split("T")[0]
                      : "",
                  });
                } else {
                  value = Object.assign(value, {
                    ["@" + record.Records[next + 1].Name]: sampleValues
                      ? record.Records[next + 1].ExampleValue
                      : "",
                    "#text": sampleValues ? record.Records[i].ExampleValue : "",
                  });
                }
              }
            }
            //console.log(newPath);
            // Set the element in to the tree

            if (
              obj.Type !== "Object" &&
              obj.Type !== "Array" &&
              obj.Type !== "Attribute"
            ) {
              if (!mandatoryOnly) {
                let parentObjectMandatory = true;

                let splitPath = newPath.split(".");

                for (let j = i; j >= 0; j--) {
                  if (
                    splitPath.includes(record.Records[j].Name) &&
                    !record.Records[j].Mandatory
                  ) {
                    parentObjectMandatory = record.Records[j].Mandatory;
                    break;
                  }
                }

                if (obj.Mandatory && parentObjectMandatory) {
                  set(outXML, newPath, value);
                }
              } else {
                set(outXML, newPath, value);
              }
            }
          }
        } else if (record.MessageFormat === "JSON") {
          // Determine new path for the element

          let obj = record.Records[i];
          let splitPath = obj.Path.split(".");
          let parent;
          for (let j = splitPath.length - 2; j >= 0; j--) {
            if (splitPath[j] !== "0") {
              parent = splitPath[j];
              break;
            }
          }

          let parentIndex;
          let objParent;

          for (let j = i; j >= 0; j--) {
            if (record.Records[j].Name === parent) {
              parentIndex = j;
              break;
            }
          }
          if (parentIndex > -1) {
            objParent = record.Records[parentIndex];
          } else {
            objParent = {};
            objParent["Type"] = null;
          }

          let found = false;
          for (let k = 0; k < serviceProps.length; k++) {
            let separator = serviceProps[k].property.indexOf("-");
            let property;
            if (separator > -1) {
              property = serviceProps[k].property.substring(
                separator + 1,
                serviceProps[k].property.length
              );
            } else {
              property = serviceProps[k].property;
            }
            if (
              property === obj.Name &&
              serviceProps[k].position === objParent.Name &&
              !usedPropsJSON.includes(k) &&
              serviceProps[k].mandatory
            ) {
              found = true;
              break;
            }
          }

          let val = "";
          if (found) {
            for (const [index, prop] of serviceProps.entries()) {
              let separator = prop.property.indexOf("-");
              let property;
              if (separator > -1) {
                property = prop.property.substring(
                  separator + 1,
                  prop.property.length
                );
              } else {
                property = prop.property;
              }
              if (property === obj.Name && prop.position === objParent.Name) {
                val = prop.value;
                usedPropsJSON.push(index);

                let newPath = obj.Path;
                console.log(newPath);
                if (objParent.Type === "Array") {
                  if (!indexes.hasOwnProperty(objParent.Name)) {
                    indexes[objParent.Name] = 0;
                    if (obj.Name === "id") {
                      indexes[val] = 0;
                    }
                  } else if (indexes.hasOwnProperty(objParent.Name)) {
                    indexes[objParent.Name] = indexes[objParent.Name] + 1;
                    if (obj.Name === "id") {
                      indexes[val] = indexes[objParent.Name];
                    }
                  }

                  let path = obj.Path.split(".");

                  for (const index of Object.keys(indexes)) {
                    let elIndex = path.findIndex((o) => o === index);
                    if (elIndex > -1) {
                      if (separator > -1) {
                        path[elIndex + 1] =
                          indexes[prop.property.substring(0, separator)];
                      } else {
                        path[elIndex + 1] = indexes[index];
                      }
                    }
                  }

                  if (path[path.length - 1] === 0) {
                    path.splice(-1);
                  }
                  newPath = path.join(".");
                } else {
                  let path = obj.Path.split(".");

                  for (const index of Object.keys(indexes)) {
                    let elIndex = path.findIndex((o) => o === index);
                    if (elIndex > -1) {
                      //path[elIndex + 1] = indexes[index];
                    }
                  }
                  newPath = path.join(".");
                }

                // Set the attributes

                let value = "";

                if (sampleValues) {
                  if (obj.ExampleValue === "dateTime") {
                    value = new Date().toISOString().split(".")[0];
                  } else if (obj.ExampleValue === "date") {
                    value = new Date().toISOString().split(".")[0];
                  } else if (obj.ExampleValue === "time") {
                    value = new Date().toISOString().split(".")[0];
                  } else {
                    value = obj.ExampleValue;
                  }
                }

                if (val !== "") {
                  value = val;
                }

                // Set the element in to the tree

                if (
                  obj.Type !== "Object" &&
                  obj.Type !== "Array" &&
                  obj.Type !== "Attribute"
                ) {
                  set(outJSON, newPath, value);
                }
              }
            }
          } else {
            let newPath = obj.Path;
            if (objParent.Type === "Array") {
              if (!indexes.hasOwnProperty(objParent.Name)) {
                indexes[objParent.Name] = 0;
                indexes[obj.Name] = 0;
              } else if (indexes.hasOwnProperty(obj.Name)) {
                indexes[obj.Name] = indexes[obj.Name] + 1;
              }

              let path = obj.Path.split(".");

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  //path[elIndex + 1] = indexes[index];
                }
              }
              newPath = path.join(".");
            } else {
              let path = obj.Path.split(".");

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  //path[elIndex + 1] = indexes[index];
                }
              }
              newPath = path.join(".");
            }

            // Set the attributes

            let value = "";
            let val = "";

            if (sampleValues) {
              if (obj.ExampleValue === "dateTime") {
                value = new Date().toISOString().split(".")[0];
              } else if (obj.ExampleValue === "date") {
                value = new Date().toISOString().split("T")[0];
              } else if (obj.ExampleValue === "time") {
                value = new Date()
                  .toISOString()
                  .split("T")[1]
                  .replace(/\.\d+Z/, "");
              } else if (obj.ExampleValue === "TRUE") {
                value = "true";
              } else if (obj.ExampleValue === "FALSE") {
                value = "false";
              } else {
                value = obj.ExampleValue;
              }
            }

            for (const prop of serviceProps) {
              if (
                prop.property === record.Records[i].Name &&
                prop.position === record.Records[i].Parent
              ) {
                val = prop.value;
              }
            }

            if (val !== "") {
              value = val;
            }

            // Set the element in to the tree

            if (
              obj.Type !== "Object" &&
              obj.Type !== "Array" &&
              obj.Type !== "Attribute"
            ) {
              if (!mandatoryOnly) {
                let parentObjectMandatory = true;

                let splitPath = newPath.split(".");

                for (let j = i; j >= 0; j--) {
                  if (
                    splitPath.includes(record.Records[j].Name) &&
                    !record.Records[j].Mandatory
                  ) {
                    parentObjectMandatory = record.Records[j].Mandatory;
                    break;
                  }
                }

                if (obj.Mandatory && parentObjectMandatory) {
                  set(outJSON, newPath, value);
                }
              } else {
                set(outJSON, newPath, value);
              }
            }
          }
        } else if (record.MessageFormat === "TXT") {
          let obj = record.Records[i];
          let splitPath = obj.Path.split(".");
          let parent = "";
          for (let j = splitPath.length - 3; j >= 0; j--) {
            if (splitPath[j] !== "0") {
              parent = splitPath[j];
              break;
            }
          }

          let found = false;
          for (let k = 0; k < serviceProps.length; k++) {
            if (
              serviceProps[k].property === obj.Name &&
              serviceProps[k].position === parent &&
              !usedPropsTXT.includes(k) &&
              serviceProps[k].mandatory
            ) {
              found = true;
              break;
            }
          }

          let padding = "";
          let value = "";
          let addonsCheck = false;
          if (found) {
            for (const [index, prop] of serviceProps.entries()) {
              if (prop.property === obj.Name && prop.position === parent) {
                usedProps.push(index);
                value = "";
                if (prop.property === "AdditionalServices" && !addonsCheck) {
                  let addons = "";
                  addonsCheck = true;
                  for (const p of serviceProps) {
                    if (p.property === "AdditionalServices") {
                      addons += p.value;
                    }
                  }
                  value = addons;
                } else if (prop.property !== "AdditionalServices") {
                  value = prop.value;
                }
                if (value !== "") {
                  let calcLength = obj.Length - value.length;
                  if (calcLength > 1) {
                    padding = " ".repeat(calcLength);
                    value = value + padding;
                  }

                  outTXT += value;
                }
              }
            }
          } else {
            if (obj.ExampleValue !== null) {
              if (obj.ExampleValue === "dateTime") {
                let d = new Date();
                value =
                  d.getFullYear() +
                  ("0" + (d.getMonth() + 1)).slice(-2) +
                  ("0" + d.getDate()).slice(-2) +
                  ("0" + d.getHours()).slice(-2) +
                  ("0" + d.getMinutes()).slice(-2);
              } else {
                value = obj.ExampleValue;
              }
              let calcLength = obj.Length - value.length;
              if (calcLength > 1) {
                padding = " ".repeat(calcLength);
                value = value + padding;
              }
            } else {
              padding = " ".repeat(obj.Length);
              value = padding;
            }

            if (!mandatoryOnly) {
              if (!obj.Mandatory) {
                padding = " ".repeat(obj.Length);
                value = padding;
              }
            }
            if (obj.Name === "RecordType") {
              if (obj.ExampleValue === "0") {
                outTXT += value;
              } else {
                outTXT += "\n" + value;
              }
            } else if (
              (parent === "DangerousGoodsItem" && !mandatoryOnly) ||
              (parent === "CustomsDetail" && !mandatoryOnly) ||
              (parent === "Party" &&
                obj.ExampleValue === "PY" &&
                !mandatoryOnly)
            ) {
              outTXT += "TESTI";
            } else if (obj.Name === "RowCount") {
              let newOutTXT = outTXT.split(/\n/);
              newOutTXT = newOutTXT.filter((v) => !v.includes("TESTI"));
              let count = newOutTXT.length;
              outTXT = newOutTXT.join("\n");
              outTXT +=
                "0".repeat(obj.Length - count.toString().length) + count;
            } else {
              outTXT += value;
            }
          }
        }
      }
    }
  }

  function syntaxHighlight(json) {
    let highlighted = [];
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = "number";
        var output = "";
        let string = [];
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        if (cls === "key") {
          match = match.substring(1, match.length - 2);
          //output = '"<span class="' + cls + '">' + match + '</span>":';
          string.push(<span className="key">{match}</span>);
        } else if (cls === "string") {
          match = match.substring(1, match.length - 1);
          //output = '"<span class="' + cls + '">' + match + '</span>"';
          string.push(<span className="string">{match}</span>);
        } else {
          output = '<span class="' + cls + '">' + match + "</span>";
          string.push(<span className={cls}>{match}</span>);
        }

        return string;
        //return output;
      }
    );
  }

  //console.log(indexes);
  //console.log(JSON.stringify(outJSON));
  //console.log(outJSON);
  console.log(outTXT);

  //console.log(outXML);

  const json = [JSON.stringify(outJSON, null, 2)];
  const beautifiedJSON = JSON.stringify(outJSON, null, 2);
  const doc = create({ version: "1.0", encoding: "UTF-8" }, outXML);
  let xml = doc.end();

  for (let element of removableElements) {
    xml = xml.replaceAll("<" + element + ">", "");
    xml = xml.replaceAll("</" + element + ">", "");
  }

  const beautifiedXML = beautify(formatXml(xml, "  "));
  return {
    POSTRA: [beautifiedXML],
    SMARTSHIP: beautifiedJSON,
    WAYBILD16A: outTXT,
    labelData: labelData,
  };
};

export default MessageGenerator;
