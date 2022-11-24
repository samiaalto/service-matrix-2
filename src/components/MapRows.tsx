import Button from "./Button";

const MapRows = (
  services,
  additionalServices,
  t,
  handleServiceSelection,
  setRowData,
  packageTypes
) => {
  let rows = [];
  let serviceGroups = [];

  let allAddons = {
    serviceName: t("Service"),
    serviceButton: " ",
    serviceCode: t("Code"),
    serviceGroup: [],
    keyWords: "keywords",
    departureCountries: " ",
    destinationCountries: " ",
  };
  for (let record of services.records) {
    let service = {};

    if (!serviceGroups.includes(record.ServiceGroup)) {
      serviceGroups.push(record.ServiceGroup);
    }

    service["serviceName"] = record.ServiceCode;
    //service['serviceButton'] = (
    //  <Button
    //    title=""
    //    type="select"
    //    onClick={(e) => {
    //      serviceSelection(record.ServiceCode);
    //    }}
    //  />
    //);
    let deliveryLocations = [];

    if (record.Pudo) {
      deliveryLocations.push("Pickup");
    }

    if (record.Home) {
      deliveryLocations.push("HomeDelivery");
    }
    if (record.Business) {
      deliveryLocations.push("BusinessDelivery");
    }

    service["serviceButton"] = false;
    service["serviceCode"] = record.ServiceCode;
    service["serviceGroup"] = record.ServiceGroup;
    // service['serviceGroup'] = [record.ServiceGroup];
    service["keyWords"] = record.DisplayNameEN + " " + record.DisplayNameFI;

    let depCountries = [];
    let destCountries = [];
    let routes = [];
    let addons = [];

    for (let route of record.Routes) {
      depCountries.push(route.DepartureCountry);
      destCountries.push(route.DestinationCountry);
      routes.push(route.DepartureCountry + "-" + route.DestinationCountry);
      //for (let destination of route.DestinationCountries) {
      //  destCountries.push(destination.Country);
      //}
    }

    let dimensions = [];
    let weights = [];

    for (let item of record.PackageTypesAndDimensions) {
      let itemDimensions = [];
      itemDimensions.push(
        item.MaxHeight_cm,
        item.MaxDepth_cm,
        item.MaxWidth_cm
      );
      let maxWidth = Math.max(...itemDimensions, 0);
      if (item.MaxHeight_cm !== null) {
        dimensions.push({
          maxWidth: maxWidth,
          addon:
            item.AdditionalServiceCode !== null
              ? item.AdditionalServiceCode.Addon
              : item.DimensionName.indexOf("locker") > -1
              ? "APT"
              : null,
        });
        if (
          weights.length === 0 ||
          weights.some((e) => e.maxWeight !== item.MaxWeight_kg)
        ) {
          weights.push({
            maxWeight: item.MaxWeight_kg,
            addon:
              item.AdditionalServiceCode !== null
                ? item.AdditionalServiceCode.Addon
                : item.DimensionName.indexOf("locker") > -1
                ? "APT"
                : null,
          });
        }
      }
    }

    service["deliveryLocation"] = deliveryLocations;
    service["width"] = dimensions;
    service["weight"] = weights;
    service["routes"] = routes;
    service["departureCountries"] = depCountries;
    service["destinationCountries"] = destCountries;

    let keyWordAddons = "";
    for (let addon of additionalServices.records) {
      //allAddons[addon.ServiceCode] = addon.ServiceCode;
      if (
        record.AdditionalServices.some((e) => e.Addon === addon.ServiceCode)
      ) {
        keyWordAddons =
          keyWordAddons +
          addon.ServiceCode +
          " " +
          addon.DisplayNameEN +
          " " +
          addon.DisplayNameFI +
          " ";
        // checks[addon.ServiceCode] = false;
        service[addon.ServiceCode] = false;
        addons.push(addon.ServiceCode);
      } else {
        service[addon.ServiceCode] = undefined;
      }
    }
    service["additionalServices"] = addons;
    //service["keyWords"] =
    //  record.DisplayNameEN + " " + record.DisplayNameFI + " " + keyWordAddons;
    rows.push(service);
  }
  //allAddons['serviceGroup'] = serviceGroups;
  //let out = (...allAddons ...rows)
  //rows = [allAddons, ...rows];
  //console.log(rows);
  return setRowData(rows);
};

export default MapRows;
