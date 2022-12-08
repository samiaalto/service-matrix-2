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

  for (let record of services.records) {
    let service = {};

    if (!serviceGroups.includes(record.ServiceGroup)) {
      serviceGroups.push(record.ServiceGroup);
    }

    service["serviceName"] = record.ServiceCode;
    let deliveryLocations = [];

    //  if (record.Pudo) {
    //    deliveryLocations.push("Pickup");
    //  }

    //  if (record.Home) {
    //    deliveryLocations.push("HomeDelivery");
    //  }
    //  if (record.Business) {
    //    deliveryLocations.push("BusinessDelivery");
    //  }

    deliveryLocations = record.DeliveryLocation.split(",");

    service["serviceButton"] = false;
    service["serviceCode"] = record.ServiceCode;
    service["serviceGroup"] = record.ServiceGroup;
    service["keyWords"] = record.DisplayNameEN + " " + record.DisplayNameFI;

    let depCountries = [];
    let destCountries = [];
    let routes = [];
    let addons = [];

    for (let route of record.Routes) {
      depCountries.push(route.DepartureCountry);
      for (let destination of route.DestinationCountries) {
        destCountries.push(destination.Country);
        routes.push(route.DepartureCountry + "-" + destination.Country);
      }
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
      let locations = [];
      if (item.DeliveryLocation) {
        locations = item.DeliveryLocation.split(",");
      }
      let maxWidth = Math.max(...itemDimensions, 0);
      if (item.MaxHeight_cm !== null) {
        dimensions.push({
          maxWidth: maxWidth,
          addon:
            item.AdditionalServiceCode !== null
              ? item.AdditionalServiceCode.Addon
              : null,
          locations: locations,
        });
        if (item.MaxWeight_kg !== null) {
          weights.push({
            maxWeight: item.MaxWeight_kg,
            addon:
              item.AdditionalServiceCode !== null
                ? item.AdditionalServiceCode.Addon
                : null,
            locations: locations,
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
    rows.push(service);
  }
  return setRowData(rows);
};

export default MapRows;
