const PopulateMultiSelect = (
  selected,
  filteredRows,
  setMultiSelectData,
  countries,
  service,
  additionalServices
) => {
  let depCountries = [];
  let destCountries = [];
  let serviceGroups = [];
  let weights = [];
  let widths = [];
  let deliveryLocations = [];
  let services = [];
  let addonServices = [];

  for (let row of filteredRows) {
    if (typeof selected.service === "undefined" || !selected.service) {
      let index = service.records.findIndex(
        (el) => el.ServiceCode === row.original.serviceCode
      );
      services.push({
        value: row.original.serviceCode,
        title: row.original.serviceCode,
        subTitle: "",
        optGroup: "Service",
        keyWords:
          row.original.serviceCode +
          " " +
          service.records[index].DisplayNameEN +
          " " +
          service.records[index].DisplayNameFI,
      });
    }

    for (let addon of row.original.additionalServices) {
      if (!addonServices || !addonServices.some((x) => x.value === addon)) {
        let index = additionalServices.records.findIndex(
          (el) => el.ServiceCode === addon
        );
        addonServices.push({
          value: addon,
          title: addon,
          subTitle: "(" + addon + ")",
          optGroup: "Additional Service",
          keyWords:
            addon +
            " " +
            additionalServices.records[index].DisplayNameEN +
            " " +
            additionalServices.records[index].DisplayNameFI,
        });
      }
    }
    for (let width of row.original.width) {
      if (
        (!selected.deliveryLocation && !widths) ||
        (typeof selected.deliveryLocation === "undefined" && !widths) ||
        (width.locations.includes(selected.deliveryLocation) && !widths) ||
        (!selected.deliveryLocation &&
          !widths.some((x) => x.value === width.maxWidth)) ||
        (typeof selected.deliveryLocation === "undefined" &&
          !widths.some((x) => x.value === width.maxWidth)) ||
        (width.locations.includes(selected.deliveryLocation) &&
          !widths.some((x) => x.value === width.maxWidth))
      ) {
        widths.push({
          value: width.maxWidth,
          title: "< " + width.maxWidth + " cm",
          subTitle: "",
          optGroup: "Longest Side",
          keyWords: width.maxWidth + " cm",
        });
      }
    }
    for (let weight of row.original.weight) {
      if (
        (!selected.deliveryLocation && !weights) ||
        (typeof selected.deliveryLocation === "undefined" && !weights) ||
        (weight.locations.includes(selected.deliveryLocation) && !weights) ||
        (!selected.deliveryLocation &&
          !weights.some((x) => x.value === weight.maxWeight)) ||
        (typeof selected.deliveryLocation === "undefined" &&
          !weights.some((x) => x.value === weight.maxWeight)) ||
        (weight.locations.includes(selected.deliveryLocation) &&
          !weights.some((x) => x.value === weight.maxWeight))
      ) {
        weights.push({
          value: weight.maxWeight,
          title: "< " + weight.maxWeight + " kg",
          subTitle: "",
          optGroup: "Weight",
          keyWords: weight.maxWeight + " kg",
        });
      }
    }

    if (
      !serviceGroups ||
      !serviceGroups.some((x) => x.value === row.original.serviceGroup)
    ) {
      let keyWords;
      if (row.original.serviceGroup === "FREIGHT") {
        keyWords = "Freight service Rahti palvelu";
      } else if (row.original.serviceGroup === "PARCEL") {
        keyWords = "Parcel service Paketti palvelu Pakettipalvelu";
      } else if (row.original.serviceGroup === "INTERNATIONAL") {
        keyWords = "International service Kansainvälinen palvelu";
      } else if (row.original.serviceGroup === "TRANSPORTUNIT") {
        keyWords = "Transport unit service Kuljetus yksikkö palvelu";
      }
      serviceGroups.push({
        value: row.original.serviceGroup,
        title: row.original.serviceGroup,
        subTitle: row.original.serviceGroup + "_desc",
        optGroup: "Service Group",
        keyWords: keyWords,
      });
    }
    if (
      (typeof selected.deliveryLocation === "undefined" &&
        typeof selected.width === "undefined" &&
        typeof selected.weight === "undefined") ||
      (!selected.deliveryLocation && !selected.width && !selected.weight)
    ) {
      for (let location of row.original.deliveryLocation) {
        if (
          !deliveryLocations ||
          !deliveryLocations.some((x) => x.value === location)
        ) {
          let keyWords;
          if (location === "LOCKER" || location === "POSTOFFICE") {
            keyWords = "Pickup Picked Nouto Noudettava";
          } else if (location === "HOME") {
            keyWords = "Home delivery delivered koti kotiin toimitettava";
          } else {
            keyWords =
              "Business delivery delivered yritys yritykseen toimitettava";
          }
          deliveryLocations.push({
            value: location,
            title: location + "_title",
            subTitle: location + "_desc",
            optGroup: "Delivery Location",
            keyWords: keyWords,
          });
        }
      }
    } else if (
      (typeof selected.deliveryLocation === "undefined" &&
        typeof selected.weight !== "undefined") ||
      (!selected.deliveryLocation && selected.weight)
    ) {
      for (let loc of row.original.weight) {
        if (loc.maxWeight === selected.weight) {
          for (let location of loc.locations) {
            if (
              !deliveryLocations ||
              !deliveryLocations.some((x) => x.value === location)
            ) {
              let keyWords;
              if (location === "LOCKER" || location === "POSTOFFICE") {
                keyWords = "Pickup Picked Nouto Noudettava";
              } else if (location === "HOME") {
                keyWords = "Home delivery delivered koti kotiin toimitettava";
              } else {
                keyWords =
                  "Business delivery delivered yritys yritykseen toimitettava";
              }
              deliveryLocations.push({
                value: location,
                title: location + "_title",
                subTitle: location + "_desc",
                optGroup: "Delivery Location",
                keyWords: keyWords,
              });
            }
          }
        }
      }
    } else if (
      (typeof selected.deliveryLocation === "undefined" &&
        typeof selected.width !== "undefined") ||
      (!selected.deliveryLocation && selected.width)
    ) {
      for (let loc of row.original.width) {
        if (loc.maxWidth === selected.width) {
          for (let location of loc.locations) {
            if (
              !deliveryLocations ||
              !deliveryLocations.some((x) => x.value === location)
            ) {
              let keyWords;
              if (location === "LOCKER" || location === "POSTOFFICE") {
                keyWords = "Pickup Picked Nouto Noudettava";
              } else if (location === "HOME") {
                keyWords = "Home delivery delivered koti kotiin toimitettava";
              } else {
                keyWords =
                  "Business delivery delivered yritys yritykseen toimitettava";
              }
              deliveryLocations.push({
                value: location,
                title: location + "_title",
                subTitle: location + "_desc",
                optGroup: "Delivery Location",
                keyWords: keyWords,
              });
            }
          }
        }
      }
    }

    for (let country of row.original.routes) {
      let separator = country.indexOf("-");
      let index = countries.records.findIndex(
        (el) => el.CountryCode === country.substring(0, separator)
      );

      if (
        (typeof selected.departure === "undefined" || !selected.departure) &&
        (!depCountries ||
          !depCountries.some(
            (x) => x.title === country.substring(0, separator)
          ))
      ) {
        depCountries.push({
          value: "dep_" + country.substring(0, separator),
          title: country.substring(0, separator),
          subTitle: "",
          optGroup: "Departure Country",
          keyWords:
            country.substring(0, separator) +
            " " +
            countries.records[index].DisplayNameEN +
            " " +
            countries.records[index].DisplayNameFI,
        });
      }

      if (
        typeof selected.destination === "undefined" ||
        !selected.destination
      ) {
        index = countries.records.findIndex(
          (el) =>
            el.CountryCode === country.substring(separator + 1, country.length)
        );
        if (
          typeof selected.departure !== "undefined" &&
          selected.departure &&
          selected.departure !== ""
        ) {
          if (
            country.substring(0, separator) === selected.departure &&
            (!destCountries ||
              !destCountries.some(
                (x) =>
                  x.title === country.substring(separator + 1, country.length)
              ))
          ) {
            destCountries.push({
              value: "des_" + country.substring(separator + 1, country.length),
              title: country.substring(separator + 1, country.length),
              subTitle: "",
              optGroup: "Destination Country",
              keyWords:
                country.substring(separator + 1, country.length) +
                " " +
                countries.records[index].DisplayNameEN +
                " " +
                countries.records[index].DisplayNameFI,
            });
          }
        } else if (
          !destCountries ||
          !destCountries.some(
            (x) => x.title === country.substring(separator + 1, country.length)
          )
        ) {
          destCountries.push({
            value: "des_" + country.substring(separator + 1, country.length),
            title: country.substring(separator + 1, country.length),
            subTitle: "",
            optGroup: "Destination Country",
            keyWords:
              country.substring(separator + 1, country.length) +
              " " +
              countries.records[index].DisplayNameEN +
              " " +
              countries.records[index].DisplayNameFI,
          });
        }
      }
    }
  }
  weights.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
  widths.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

  setMultiSelectData((prevState) => {
    const newState = prevState.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.label === "Departure Country") {
        return { ...obj, options: depCountries };
      } else if (obj.label === "Destination Country") {
        return { ...obj, options: destCountries };
      } else if (obj.label === "Service Group") {
        return { ...obj, options: serviceGroups };
      } else if (obj.label === "Longest Side") {
        return { ...obj, options: widths };
      } else if (obj.label === "Weight") {
        return { ...obj, options: weights };
      } else if (obj.label === "Delivery Location") {
        return { ...obj, options: deliveryLocations };
      } else if (obj.label === "Service") {
        return { ...obj, options: services };
      } else if (obj.label === "Additional Service") {
        return { ...obj, options: addonServices };
      }
      // 👇️ otherwise return object as is
      return obj;
    });

    return newState;
  });
};

export default PopulateMultiSelect;
