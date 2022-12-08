const hideColumn = (
  addon,
  columnData,
  setColumnVisibility,
  filteredData,
  selected,
  additionalServices
) => {
  let emptyCount = 0;
  let isInstallation = false;
  let isAvailable = true;

  for (const row of filteredData["rows"]) {
    for (const [key, value] of Object.entries(row.original)) {
      if (key === addon && value !== true && value !== false) {
        emptyCount++;
      }
    }
  }

  for (let column of columnData) {
    if (column.id === addon && column.footer === "EQUIPMENT") {
      isInstallation = true;
    }
  }

  for (let addonService of additionalServices.records) {
    if (
      addonService.ServiceCode === addon &&
      selected.destination !== "" &&
      typeof selected.destination !== "undefined"
    ) {
      if (
        addonService.AvailableCountries.some(
          (country) =>
            country.Country === selected.destination ||
            country.Country === "ALL"
        )
      ) {
        isAvailable = true;
      } else {
        isAvailable = false;
      }
    }
    if (
      addonService.ServiceCode === addon &&
      selected.deliveryLocation === "LOCKER"
    ) {
      isAvailable = addonService.Pudo;
    }
  }

  if (emptyCount === filteredData["rows"].length) {
    //hide column
    //console.log(addon);
    setColumnVisibility((prevState) => ({ ...prevState, [addon]: false }));
    //setColumnVisibility((prevState) => prevState.map((item, index) => console.log(item)));
  } else if ((isInstallation && !selected.showInstallation) || !isAvailable) {
    setColumnVisibility((prevState) => ({ ...prevState, [addon]: false }));
  } else {
    //show hidden column
    setColumnVisibility((prevState) => ({ ...prevState, [addon]: true }));
    //setColumnVisibility((prevState) =>
    //  prevState.map((item, index) =>
    //    item.accessor === addon && !item.show ? { ...item, show: true } : item
    //  )
    //);
  }
};

export default hideColumn;
