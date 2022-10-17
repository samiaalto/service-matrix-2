import Select, { components } from "react-select";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DepartureLogo from "./icons/Departure_logo.svg";
import DestinationLogo from "./icons/Destination_logo.svg";
import ServiceGroupLogo from "./icons/ServiceGroup_logo.svg";
import WeightLogo from "./icons/Weight_logo.svg";
import WidthLogo from "./icons/Width_logo.svg";
import ServiceLogo from "./icons/Service_logo.svg";
import AddonLogo from "./icons/Addon_logo.svg";
import HomeLogo from "./icons/Home_logo.svg";
import BusinessLogo from "./icons/Office_logo.svg";
import PickupLogo from "./icons/Pickup_logo.svg";

const MultiSelect = ({ onChange, isMulti, data, t }) => {
  const renderSwitch = (param) => {
    switch (param) {
      case "Departure Country":
        return <DepartureLogo />;
      case "Destination Country":
        return <DestinationLogo />;
      case "Service Group":
        return <ServiceGroupLogo />;
      case "Weight":
        return <WeightLogo />;
      case "Longest Side":
        return <WidthLogo />;
      case "Service":
        return <ServiceLogo />;
      case "Additional Service":
        return <AddonLogo />;
      case "HomeDelivery":
        return <HomeLogo />;
      case "BusinessDelivery":
        return <BusinessLogo />;
      case "Pickup":
        return <PickupLogo />;
      default:
        return "";
    }
  };

  const customFilter = (option, searchText) => {
    if (option.data.keyWords.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  const MultiValue = (props) => {
    return (
      <components.MultiValue {...props}>
        <OverlayTrigger
          key={"tooltip_" + props.data.title}
          placement="top"
          overlay={
            <Tooltip key={"tooltip_" + props.data.title}>
              {props.data.optGroup}
            </Tooltip>
          }
        >
          <span className="option_tag">
            {props.data.optGroup === "Delivery Location"
              ? renderSwitch(props.data.value)
              : renderSwitch(props.data.optGroup)}{" "}
            {t(props.data.title)}
          </span>
        </OverlayTrigger>
      </components.MultiValue>
    );
  };
  const Option = (props) => {
    const { title, subTitle, value, optGroup } = props.data;

    return (
      <components.Option {...props}>
        <span className="option_header">
          {optGroup === "Delivery Location"
            ? renderSwitch(value)
            : renderSwitch(optGroup)}{" "}
          {t(title)}
        </span>
        <span className="option_info">{t(subTitle)}</span>
      </components.Option>
    );
  };

  const customStyles: StylesConfig = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        borderRadius: "16px",
        border:
          data.optGroup === "Departure Country"
            ? "2px solid hsl(0, 100%, 80%)"
            : data.optGroup === "Destination Country"
            ? "2px solid hsl(226, 100%, 80%)"
            : data.optGroup === "Weight"
            ? "2px solid hsl(135, 100%, 80%)"
            : data.optGroup === "Longest Side"
            ? "2px solid hsl(280, 100%, 80%)"
            : data.optGroup === "Additional Service"
            ? "2px solid hsl(38, 100%, 80%)"
            : data.optGroup === "Service"
            ? "2px solid hsl(200, 100%, 80%)"
            : data.optGroup === "Delivery Location"
            ? "2px solid hsl(20, 100%, 80%)"
            : "2px solid hsl(0, 0%, 80%)",
        backgroundColor:
          data.optGroup === "Departure Country"
            ? "hsl(0, 100%, 90%)"
            : data.optGroup === "Destination Country"
            ? "hsl(226, 100%, 90%)"
            : data.optGroup === "Weight"
            ? "hsl(135, 100%, 90%)"
            : data.optGroup === "Longest Side"
            ? "hsl(280, 100%, 90%)"
            : data.optGroup === "Additional Service"
            ? "hsl(38, 100%, 90%)"
            : data.optGroup === "Service"
            ? "hsl(200, 100%, 90%)"
            : data.optGroup === "Delivery Location"
            ? "hsl(20, 100%, 90%)"
            : "hsl(0, 0%, 90%)"
      };
    },
    multiValueRemove: (styles) => ({
      ...styles,
      borderRadius: "16px",
      paddingBottom: "1px"
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "16px"
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      backgroundColor:
        state.isFocused || state.isSelected ? "#e0e0e0" : "transparent",
      "&:hover": {
        backgroundColor: "#e0e0e0"
      }
    }),
    groupHeading: (provided, state) => ({
      ...provided,
      borderBottom: "2px solid #e0e0e0",
      backgroundColor: "#fff",
      color: "#000",
      textAlign: "left",
      fontWeight: 700
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
        boxShadow: "none"
      }
      // "&:focus": {
      //   border: "1px solid #ff8b67",
      //   boxShadow: "0px 0px 6px #ff8b67"
      // },
      // "&:acitve": {
      //   border: "1px solid #ff8b67",
      //   boxShadow: "0px 0px 6px #ff8b67"
      // }
    })
  };

  return (
    <Select
      styles={customStyles}
      options={data}
      closeMenuOnSelect={false}
      isMulti={isMulti}
      onChange={onChange}
      placeholder={t("'Filter data'")}
      className={"matrix"}
      classNamePrefix="lp-copy-sel"
      getOptionLabel={(options) => {
        return `${options.title} ${options.subTitle}`;
      }}
      components={{ MultiValue, Option }}
      filterOption={customFilter}
    />
  );
};

export default MultiSelect;
