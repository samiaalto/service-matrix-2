const hideColumn = (addon, rowData, setColumnVisibility, filteredData) => {
  let emptyCount = 0;

  for (const row of filteredData["rows"]) {
    for (const [key, value] of Object.entries(row.original)) {
      if (key === addon && value !== true && value !== false) {
        emptyCount++;
      }
    }
  }

  if (emptyCount === filteredData["rows"].length) {
    //hide column
    //console.log(addon);
    setColumnVisibility((prevState) => ({ ...prevState, [addon]: false }));
    //setColumnVisibility((prevState) => prevState.map((item, index) => console.log(item)));
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
