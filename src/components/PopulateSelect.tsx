const PopulateSelect = (filteredRows, setSelectData) => {
  let fileFormats = [];

  for (let row of filteredRows) {
    if (!fileFormats || !fileFormats.some((x) => x.value === row.format)) {
      fileFormats.push({
        value: row.format,
        title: row.format,
        subTitle: row.format + "_desc",
        keyWords: "",
      });
    }
  }
  setSelectData(fileFormats);
};

export default PopulateSelect;
