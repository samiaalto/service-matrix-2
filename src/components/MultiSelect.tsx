import { useState, useEffect, useRef } from "react";
import Select, { components, StylesConfig } from "react-select";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ReactComponent as DepartureLogo } from "./icons/Departure_logo.svg";
import { ReactComponent as DestinationLogo } from "./icons/Destination_logo.svg";
import { ReactComponent as ServiceGroupLogo } from "./icons/ServiceGroup_logo.svg";
import { ReactComponent as WeightLogo } from "./icons/Weight_logo.svg";
import { ReactComponent as WidthLogo } from "./icons/Width_logo.svg";
import { ReactComponent as ServiceLogo } from "./icons/Service_logo.svg";
import { ReactComponent as AddonLogo } from "./icons/Addon_logo.svg";
import { ReactComponent as HomeLogo } from "./icons/Home_logo.svg";
import { ReactComponent as BusinessLogo } from "./icons/Office_logo.svg";
import { ReactComponent as PickupLogo } from "./icons/Pickup_logo.svg";
import { ReactComponent as PostiLogo } from "./icons/Posti_logo.svg";
import { ReactComponent as ChevronIcon } from "./icons/ChevronIcon.svg";

const MultiSelect = ({
  onChange,
  isMulti,
  data,
  t,
  selected,
  filterOpen,
  setFilterOpen,
}) => {
  const selectRef = useRef<any>(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [preset, setPreset] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onSelection = (e) => {
    onChange(e);
    //setSelectedValues(e);
  };

  useEffect(() => {
    let count = 0;
    if (data.length > 0) {
      for (let item of data) {
        if (item.options.length > 0) {
          count++;
        }
      }
    }
    if (initialLoad && data.length === count) {
      setInitialLoad(false);
      setInitialValues(data);
    }
  }, [data, initialLoad]);

  useEffect(() => {
    let options = [];
    if (initialValues.length > 0) {
      //setPreset(true);

      for (let item of initialValues) {
        if (
          item.label === "Departure Country" &&
          selected.departure !== "" &&
          typeof selected.departure !== "undefined"
        ) {
          for (let option of item.options) {
            if (option.title === selected.departure) {
              options.push(option);
            }
          }
        }
        if (
          item.label === "Destination Country" &&
          selected.destination !== "" &&
          typeof selected.destination !== "undefined"
        ) {
          for (let option of item.options) {
            if (option.title === selected.destination) {
              options.push(option);
            }
          }
        }
        if (item.label === "Weight" && typeof selected.weight !== "undefined") {
          for (let option of item.options) {
            if (option.value === selected.weight) {
              options.push(option);
            }
          }
        }
        if (item.label === "Width" && typeof selected.width !== "undefined") {
          for (let option of item.options) {
            if (option.value === selected.width) {
              options.push(option);
            }
          }
        }
        if (
          item.label === "Longest Side" &&
          typeof selected.width !== "undefined"
        ) {
          for (let option of item.options) {
            if (option.value === selected.width) {
              options.push(option);
            }
          }
        }
        if (
          item.label === "Delivery Location" &&
          typeof selected.deliveryLocation !== "undefined"
        ) {
          for (let option of item.options) {
            if (option.value === selected.deliveryLocation) {
              options.push(option);
            }
          }
        }
        if (
          item.label === "Service Group" &&
          selected.serviceGroup !== "" &&
          typeof selected.serviceGroup !== "undefined"
        ) {
          for (let option of item.options) {
            if (option.value === selected.serviceGroup) {
              options.push(option);
            }
          }
        }
        if (
          item.label === "Service" &&
          selected.serviceFilter !== "" &&
          typeof selected.serviceFilter !== "undefined"
        ) {
          for (let option of item.options) {
            if (option.value === selected.serviceFilter) {
              options.push(option);
            }
          }
        }
        if (
          item.label === "Additional Service" &&
          selected.addonsFilter.length > 0
        ) {
          for (let option of item.options) {
            if (selected.addonsFilter.includes(option.value)) {
              options.push(option);
            }
          }
        }
      }
    }

    setSelectedValues(options);
  }, [selected, initialValues, preset]);

  const renderSwitch = (param) => {
    switch (param) {
      case "Departure Country":
        return (
          <DepartureLogo
            title="DepartureLogo"
            className="DepartureLogo"
            key="DepartureLogo"
          />
        );
      case "Destination Country":
        return (
          <DestinationLogo
            title="DestinationLogo"
            className="DestinationLogo"
            key="DestinationLogo"
          />
        );
      case "Service Group":
        return (
          <ServiceGroupLogo
            title="ServiceGroupLogo"
            className="ServiceGroupLogo"
            key="ServiceGroupLogo"
          />
        );
      case "Weight":
        return (
          <WeightLogo
            title="WeightLogo"
            className="WeightLogo"
            key="WeightLogo"
          />
        );
      case "Longest Side":
        return (
          <WidthLogo title="WidthLogo" className="WidthLogo" key="WidthLogo" />
        );
      case "Service":
        return (
          <ServiceLogo
            title="ServiceLogo"
            className="ServiceLogo"
            key="ServiceLogo"
          />
        );
      case "Additional Service":
        return (
          <AddonLogo title="AddonLogo" className="AddonLogo" key="AddonLogo" />
        );
      case "HOME":
        return (
          <HomeLogo title="HomeLogo" className="HomeLogo" key="HomeLogo" />
        );
      case "BUSINESS":
        return (
          <BusinessLogo
            title="BusinessLogo"
            className="BusinessLogo"
            key="BusinessLogo"
          />
        );
      case "POSTOFFICE":
        return (
          <PostiLogo
            title="PostOfficetLogo"
            className="PostOfficeLogo"
            key="PostOfficeLogo"
          />
        );
      case "LOCKER":
        return (
          <PickupLogo
            title="PickupLogo"
            className="PickupLogo"
            key="PickupLogo"
          />
        );
      default:
        return "";
    }
  };

  // handle options group header click event
  // hide and show the options under clicked group
  const handleHeaderClick = (id) => {
    const node = document.querySelector(`#${id}`).parentElement
      .nextElementSibling;
    const classes = node.classList;
    if (classes.contains("optGroup-collapsed")) {
      node.classList.remove("optGroup-collapsed");
    } else {
      node.classList.add("optGroup-collapsed");
    }

    const nodeHeader = document.querySelector(`#${id}`);
    const headerClasses = nodeHeader.classList;
    if (headerClasses.contains("menu-collapsed")) {
      nodeHeader.classList.remove("menu-collapsed");
    } else {
      nodeHeader.classList.add("menu-collapsed");
    }
  };

  const handleFocus = () => {
    setFilterOpen(true);
  };

  const handleBlur = () => {
    setFilterOpen(false);
  };

  // Create custom GroupHeading component, which will wrap
  // react-select GroupHeading component inside a div and
  // register onClick event on that div
  const CustomGroupHeading = (props) => {
    return (
      <div
        className="group-heading-wrapper"
        onClick={() => handleHeaderClick(props.id)}
      >
        <components.GroupHeading {...props}>
          <span className="option_header">
            {props.data.label === "Delivery Location"
              ? renderSwitch("LOCKER")
              : renderSwitch(props.data.label)}{" "}
            {t(props.data.label)}
          </span>
          <span className="group-handle">
            <ChevronIcon
              title="ChevronIcon"
              className="ChevronIcon"
              key="ChevronIcon"
            />
          </span>
        </components.GroupHeading>
      </div>
    );
  };

  useEffect(() => {
    if (searchText) {
      let nodes: any = document.querySelectorAll(
        "#react-select-2-listbox .group-heading-wrapper"
      );
      for (let node of nodes) {
        let target = node.nextElementSibling;
        let classes = target.classList;
        let targetHeader = node.firstElementChild;
        let headerClasses = node.classList;
        if (!classes.contains("optGroup-collapsed")) {
          target.classList.add("optGroup-collapsed");
        }
        if (!headerClasses.contains("menu-collapsed")) {
          targetHeader.classList.add("menu-collapsed");
        }
      }
    } else if (searchText === "") {
      let nodes: any = document.querySelectorAll(
        "#react-select-2-listbox .group-heading-wrapper"
      );
      if (nodes.length > 0) {
        for (let node of nodes) {
          if (node !== null) {
            let target = node.nextElementSibling;
            let classes = target.classList;
            let targetHeader = node.firstElementChild;
            let headerClasses = node.classList;
            if (classes.contains("optGroup-collapsed")) {
              target.classList.remove("optGroup-collapsed");
            }

            if (headerClasses.contains("menu-collapsed")) {
              targetHeader.classList.remove("menu-collapsed");
            }
          }
        }
      }
    }
  }, [searchText]);

  const customFilter = (option, searchText) => {
    setSearchText(searchText);
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
              {t(props.data.optGroup)}
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

  const customStyles: StylesConfig<any, false> = {
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
            : "hsl(0, 0%, 90%)",
      };
    },
    multiValueRemove: (styles) => ({
      ...styles,
      borderRadius: "16px",
      paddingBottom: "1px",
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: "5px",
      borderRadius: "16px",
      zIndex: 9999,
      border: "2px solid #3b4a57",
      boxShadow: "0 0 8px 3px rgba(57, 75, 88, 0.3)",
    }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: "360px",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .3s ease",
      transform: state.isFocused ? "rotate(180deg)" : "rotate(0deg)",
      color: state.isFocused ? "#000" : "gray",
      "&:hover": {
        transform: "rotate(90deg)",
        color: "#000",
      },
    }),
    clearIndicator: (base, state) => ({
      ...base,
      transition: "all .3s ease",
      color: "gray",
      transform: "rotate(0deg)",
      "&:hover": {
        transform: "rotate(180deg)",
        color: "#000",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      backgroundColor:
        state.isFocused || state.isSelected ? "#ececec" : "transparent",
      "&:hover": {
        backgroundColor: "#ececec",
        cursor: "pointer",
      },
    }),
    group: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
    groupHeading: (provided, state) => ({
      ...provided,
      "&:hover": {
        borderBottom: "2px solid #ececec",
        transition: "all 0.3s ease-in-out",
        backgroundColor: "#ececec",
        borderRadius: "8px",
        cursor: "pointer",
      },
      borderBottom: "2px solid #e0e0e0",
      backgroundColor: "#fff",
      color: "#000",
      textAlign: "left",
      fontWeight: 500,
      paddingTop: "7px",
      paddingBottom: "7px",
      textTransform: "none",
      fontSize: "13px",
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
      ref={selectRef}
      value={selectedValues}
      styles={customStyles}
      options={data}
      closeMenuOnSelect={false}
      isMulti={isMulti}
      menuIsOpen={filterOpen}
      onChange={onSelection}
      placeholder={t("'Filter data'")}
      className={"matrix"}
      classNamePrefix="lp-copy-sel"
      getOptionLabel={(options: any) => {
        return `${options.title} ${options.subTitle}`;
      }}
      components={{ MultiValue, Option, GroupHeading: CustomGroupHeading }}
      filterOption={customFilter}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default MultiSelect;
