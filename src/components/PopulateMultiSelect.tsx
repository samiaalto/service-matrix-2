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

    if (!widths || !widths.some((x) => x.value === row.original.width)) {
      widths.push({
        value: row.original.width,
        title: "< " + row.original.width + " cm",
        subTitle: "",
        optGroup: "Longest Side",
        keyWords: row.original.width + " cm",
      });
    }
    if (!weights || !weights.some((x) => x.value === row.original.weight)) {
      weights.push({
        value: row.original.weight,
        title: "< " + row.original.weight + " kg",
        subTitle: "",
        optGroup: "Weight",
        keyWords: row.original.weight + " kg",
      });
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
      typeof selected.deliveryLocation === "undefined" ||
      !selected.deliveryLocation
    ) {
      for (let location of row.original.deliveryLocation) {
        if (
          !deliveryLocations ||
          !deliveryLocations.some((x) => x.value === location)
        ) {
          let keyWords;
          if (location === "Pickup") {
            keyWords = "Pickup Picked Nouto Noudettava";
          } else if (location === "HomeDelivery") {
            keyWords = "Home delivery delivered koti kotiin toimitettava";
          } else {
            keyWords =
              "Business delivery delivered yritys yritykseen toimitettava";
          }
          deliveryLocations.push({
            value: location,
            title: location,
            subTitle: location + "_desc",
            optGroup: "Delivery Location",
            keyWords: keyWords,
          });
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
        if (typeof selected.departure !== "undefined" || selected.departure) {
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
