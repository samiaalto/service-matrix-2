import Select, { components, StylesConfig } from "react-select";

const select = ({ onChange, data, t }) => {
  const SingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        {t(props.data.title)}
      </components.SingleValue>
    );
  };

  const Option = (props) => {
    const { title, subTitle } = props.data;

    return (
      <components.Option {...props}>
        <span className="option_header">{t(title)}</span>
        <span className="option_info">{t(subTitle)}</span>
      </components.Option>
    );
  };

  const customStyles: StylesConfig<any, false> = {
    menu: (styles) => ({
      ...styles,
      borderRadius: "16px",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      backgroundColor:
        state.isFocused || state.isSelected ? "#e0e0e0" : "transparent",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    }),
    groupHeading: (provided, state) => ({
      ...provided,
      borderBottom: "2px solid #e0e0e0",
      backgroundColor: "#fff",
      color: "#000",
      textAlign: "left",
      fontWeight: 700,
    }),
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      textAlign: "left",
      borderRadius: "16px",
      border: state.isFocused ? "2px solid #3b4a57" : "2px solid #3b4a57",
      boxShadow: state.isFocused ? "none" : "none",
      // "&": {
      //   border: "1px solid #cccccc",
      //   boxShadow: "none"
      // },
      "&:hover": {
        border: "2px solid #3b4a57",
        boxShadow: "none",
      },
      // "&:focus": {
      //   border: "1px solid #ff8b67",
      //   boxShadow: "0px 0px 6px #ff8b67"
      // },
      // "&:acitve": {
      //   border: "1px solid #ff8b67",
      //   boxShadow: "0px 0px 6px #ff8b67"
      // }
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={data}
      closeMenuOnSelect={true}
      isMulti={false}
      onChange={onChange}
      placeholder={t("'Select File Format'")}
      className="fileFormat"
      classNamePrefix="lp-copy-sel"
      getOptionLabel={(options: any) => {
        return `${options.title} ${options.subTitle}`;
      }}
      components={{ SingleValue, Option }}
    />
  );
};

export default select;
