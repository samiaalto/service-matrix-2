const MessageGenerator = (
  selected,
  services,
  fileFormats,
  additionalServices,
  countries
) => {
  const { create } = require("xmlbuilder2");

  //console.log(fileFormats);

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

  const serviceProps = [];
  let addonArr = [];
  let labelData = {};
  let labelAddons = [];
  let addons = [];
  let depIndex = -1;
  let destIndex = -1;

  addonArr = selected.addons;

  let dest = "FI";
  if (selected.destination) {
    dest = selected.destination;
  }

  if (selected.departure && selected.departure !== "FI") {
    for (let country of countries.records) {
      if (country.CountryCode === selected.departure) {
        labelData["senderAddress1"] = country.Address;
        labelData["senderPostalCode"] = country.PostalCode;
        labelData["senderPostOffice"] = country.City;
        labelData["senderCountryCode"] = country.CountryCode;
        labelData["senderCountry"] = country.DisplayNameEN;

        serviceProps.push(
          {
            format: "XML",
            property: "Street1",
            value: country.Address,
            position: "CONSIGNOR",
            mandatory: true,
          },
          {
            format: "XML",
            property: "Postcode",
            value: country.PostalCode,
            position: "CONSIGNOR",
            mandatory: true,
          },
          {
            format: "XML",
            property: "City",
            value: country.City,
            position: "CONSIGNOR",
            mandatory: true,
          },
          {
            format: "XML",
            property: "Country",
            value: country.CountryCode,
            position: "CONSIGNOR",
            mandatory: true,
          }
        );
      }
    }
  }

  for (let [index, country] of countries.records.entries()) {
    if (country.CountryCode === dest) {
      destIndex = index;
      if (selected.pudo) {
        labelData["receiverName2"] = country.Name2;
      }
      labelData["receiverAddress1"] = country.Address;
      labelData["receiverPostalCode"] = country.PostalCode;
      labelData["receiverPostOffice"] = country.City;
      labelData["receiverCountryCode"] = country.CountryCode;
      labelData["receiverCountry"] = country.DisplayNameEN;

      serviceProps.push(
        {
          format: "XML",
          property: "Street1",
          value: country.Address,
          position: "CONSIGNEE",
          mandatory: true,
        },
        {
          format: "XML",
          property: "Postcode",
          value: country.PostalCode,
          position: "CONSIGNEE",
          mandatory: true,
        },
        {
          format: "XML",
          property: "City",
          value: country.City,
          position: "CONSIGNEE",
          mandatory: true,
        },
        {
          format: "XML",
          property: "Country",
          value: country.CountryCode,
          position: "CONSIGNEE",
          mandatory: true,
        }
      );
    }
  }

  for (const record of services.records) {
    if (record.ServiceCode === selected.service) {
      labelData["labelType"] = record.LabelType;
      labelData["serviceName"] = record.DisplayNameFI;
      labelData["processNumber"] = record.ProcessNumber;
      if (record.Fields.length > 0) {
        for (const field of record.Fields) {
          let value = field.PropertyValue;
          let mandatory = field.Mandatory;

          if (selected.pudo && field.PropertyName === "Name2") {
            value = countries.records[destIndex].Name2;
            mandatory = true;
          } else if (selected.pudo && field.PropertyName === "Service") {
            mandatory = true;
          } else if (selected.pudo && field.PropertyName === "ContactChannel") {
            labelData["receiverPhone"] = "+3580007654321";
            mandatory = true;
          } else if (
            (selected.pudo && field.PropertyName === "Party") ||
            (selected.pudo && field.PropertyName === "Name1")
          ) {
            mandatory = true;
          } else if (selected.pudo && field.PropertyName === "Street1") {
            value = countries.records[destIndex].Address;
            mandatory = true;
          } else if (selected.pudo && field.PropertyName === "Postcode") {
            value = countries.records[destIndex].PostalCode;
            mandatory = true;
          } else if (selected.pudo && field.PropertyName === "City") {
            value = countries.records[destIndex].City;
            mandatory = true;
          } else if (selected.pudo && field.PropertyName === "Country") {
            value = countries.records[destIndex].CountryCode;
            mandatory = true;
          }
          serviceProps.push({
            format: field.MessageFormat,
            property: field.PropertyName,
            value: value,
            position: field.MessagePosition,
            mandatory: mandatory,
          });
        }
      }
    }
  }
  if (addonArr) {
    for (const record of additionalServices.records) {
      if (addonArr.includes(record.ServiceCode)) {
        let labelName = record.DisplayNameFI;
        if (record.ServiceCode === "3175" || record.ServiceCode === "3143") {
          labelName = labelName + " 1 KPL 0,234 KG BRUTTO";
        }
        labelAddons.push({
          labelName: labelName,
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
            } else if (field.MessageFormat.substring(0, 6) === "POSTRA") {
              if (field.PropertyName === "CodValue") {
                labelData["codAmount"] = field.PropertyValue.replace(".", ",");
              } else if (field.PropertyName === "CodIBAN") {
                labelData["codIBAN"] = field.PropertyValue;
              } else if (field.PropertyName === "CodBIC") {
                labelData["codBIC"] = field.PropertyValue;
              } else if (field.PropertyName === "CodReference") {
                labelData["codReference"] = field.PropertyValue;
              } else if (field.PropertyName === "Account") {
                labelData["otherPayer"] = field.PropertyValue;
              }

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
          let found = [];
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
              found.push(k);
            }
          }

          if (found.length > 0) {
            for (let index of found) {
              val = serviceProps[index].value;
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

  //console.log(indexes);
  //console.log(JSON.stringify(outJSON));
  //console.log(outJSON);
  //console.log(outTXT);

  console.log(outXML);

  const json = [JSON.stringify(outJSON, null, 2)];
  const beautifiedJSON = JSON.stringify(outJSON, null, 2);
  const doc = create({ version: "1.0", encoding: "UTF-8" }, outXML);
  let xml = doc.end();

  for (let element of removableElements) {
    xml = xml.replaceAll("<" + element + ">", "");
    xml = xml.replaceAll("</" + element + ">", "");
  }

  const findNewLines = (data) => {
    let newLines = [];
    let lines = data.split("\n");

    for (let [index, line] of lines.entries()) {
      for (let prop of serviceProps) {
        //console.log(line + " " + prop.value);
        if (line.includes(prop.value) && !newLines.includes(index + 1)) {
          newLines.push(index + 1);
        }
      }
    }
    return newLines;
  };

  const formattedXML = formatXml(xml, "  ");
  const linesXML = findNewLines(formattedXML);
  const linesJSON = findNewLines(beautifiedJSON);
  //let findNewLines2 = beautifiedJSON.split("\n");
  //console.log(findNewLines2);

  //let findNewLines = formattedXML.split("\r\n");
  //let newLines = [];

  //console.log(newLines);

  //const beautifiedXML = beautify(formatXml(xml, "  "));
  return {
    POSTRA: { message: [formattedXML], newLines: linesXML },
    SMARTSHIP: { message: beautifiedJSON, newLines: linesJSON },
    WAYBILD16A: outTXT,
    labelData: labelData,
  };
};

export default MessageGenerator;
