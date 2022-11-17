const hideColumn = (
  addon,
  columnData,
  setColumnVisibility,
  filteredData,
  showEquipment
) => {
  let emptyCount = 0;
  let isEquipment = false;

  for (const row of filteredData["rows"]) {
    for (const [key, value] of Object.entries(row.original)) {
      if (key === addon && value !== true && value !== false) {
        emptyCount++;
      }
    }
  }

  for (let column of columnData) {
    if (column.id === addon && column.footer === "EQUIPMENT") {
      isEquipment = true;
    }
  }

  if (emptyCount === filteredData["rows"].length) {
    //hide column
    //console.log(addon);
    setColumnVisibility((prevState) => ({ ...prevState, [addon]: false }));
    //setColumnVisibility((prevState) => prevState.map((item, index) => console.log(item)));
  } else if (isEquipment && !showEquipment) {
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
