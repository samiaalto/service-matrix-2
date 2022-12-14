import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import additionalServicesJSON from "./additionalServices.json";
import servicesJSON from "./services.json";
import labelInstructionsJSON from "./labelInstructions.json";
import countriesJSON from "./countries.json";
import fileFormatsJSON from "./fileFormats.json";
import React from "react";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Route, Routes, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import FileFormats from "./components/FileFormats";
import Select from "./components/MultiSelect";
import populateMultiSelect from "./components/PopulateMultiSelect";
import Button from "./components/Button";
import Modal from "./components/Modal";
import OffCanvas from "./components/OffCanvas";
import Alert from "./components/Alert";
import GenerateAlert from "./components/GenerateAlerts";
import hideColumn from "./components/HideColumn";
import mapRows from "./components/MapRows";
import mapFfRows from "./components/MapFFRows";
import MessageGenerator from "./components/MessageGenerator";
import NavBar from "./components/NavBar";
import TanStackTable from "./components/table/Table";
import populateSelect from "./components/PopulateSelect";
import Tour from "./components/Tour";

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
  const { t, i18n } = useTranslation();

  const [data, setData] = useState({
    services: {},
    additionalServices: {},
    fileFormats: {},
    countries: {},
    labelInstructions: {},
    packageTypes: {},
  });
  const [multiSelectData, setMultiSelectData] = useState([
    { label: "Departure Country", options: [] },
    { label: "Destination Country", options: [] },
    { label: "Weight", options: [] },
    { label: "Longest Side", options: [] },
    { label: "Delivery Location", options: [] },
    { label: "Service Group", options: [] },
    { label: "Service", options: [] },
    { label: "Additional Service", options: [] },
  ]);
  const [selectData, setSelectData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [updateRows, setupdateRows] = useState([]);
  const [reset, setReset] = useState(false);
  const [params, setParams] = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [selected, setSelected] = useState({
    service: "",
    selectedService: "",
    addons: [],
    serviceFilter: "",
    serviceGroup: "",
    addonsFilter: [],
    weight: undefined,
    width: undefined,
    deliveryLocation: "",
    departure: "",
    destination: "",
    filterOpen: false,
    pudo: false,
    pudoAvailable: true,
    pickupOrder: false,
    lang: "",
    format: "",
    formatFilter: "",
    ffTab: "",
    modalOpen: false,
    modalService: "",
    modalData: {},
    showAlert: false,
    alertData: [],
    offCanvasOpen: false,
    offCanvasTab: "label",
    showSamples: true,
    showOptional: false,
    showInstallation: false,
    instAvailable: true,
    startTour: false,
    labelData: {},
    POSTRA: {},
    SMARTSHIP: {},
    WAYBILD16A: {},
  });
  const [currentState, setCurrentState] = useState({});
  const [ffRowData, setFfRowData] = useState([]);
  const [ffColumnData, setFfColumnData] = useState([
    {
      id: "format",
      header: () => <span>{t("Format")}</span>,
      cell: (info: any) => info.getValue(),
      accessorKey: "format",
      enableGlobalFilter: false,
    },
    {
      id: "attribute",
      header: () => <span>{t("'Attribute Name'")}</span>,

      cell: (info: any) => info.getValue(),
      accessorKey: "attribute",
      enableGlobalFilter: false,
    },
    {
      id: "moc",
      header: () => <span>{t("'M/O/C'")}</span>,

      cell: (info: any) => info.getValue(),
      accessorKey: "moc",
      enableGlobalFilter: false,
    },
    {
      id: "repeat",
      header: () => <span>{t("Repeat")}</span>,
      cell: (info: any) => info.getValue(),
      accessorKey: "repeat",
      enableGlobalFilter: false,
    },
    {
      id: "position",
      header: () => <span>{t("Position")}</span>,
      cell: (info: any) => info.getValue(),
      accessorKey: "position",
      enableGlobalFilter: false,
    },
    {
      id: "type",
      header: () => <span>{t("Type")}</span>,
      cell: (info: any) => info.getValue(),
      accessorKey: "type",
      enableGlobalFilter: false,
    },
    {
      id: "description",
      header: () => <span>{t("Description")}</span>,
      cell: (info: any) => info.getValue(),
      accessorKey: "description",
      enableGlobalFilter: true,
    },
    {
      id: "tooltip",
      header: () => <span>{t("Tooltip")}</span>,
      cell: (info: any) => info.getValue(),
      accessorKey: "tooltip",
      enableGlobalFilter: false,
    },
  ]);

  const mapColumns = (additionalServices: any) => {
    let columnVisibility = {
      serviceGroup: false,
      routes: false,
      weight: false,
      width: false,
      deliveryLocation: false,
      additionalServices: false,
    };
    let columns = [
      {
        id: "serviceName",
        header: () => <span></span>,
        footer: "",
        columns: [
          {
            accessorKey: "serviceName",
            header: () => <span>{t("Service")}</span>,
            cell: (info: any) => t(info.getValue()),
            enableGlobalFilter: true,
            enableColumnFilter: false,
          },
        ],
      },
      {
        id: "serviceButton",
        header: () => <span></span>,
        footer: "",
        columns: [
          {
            accessorKey: "serviceButton",
            header: () => <span></span>,
            cell: (info: any) => info.getValue(),
            enableGlobalFilter: false,
            enableColumnFilter: false,
          },
        ],
      },
      {
        id: "serviceCode",
        header: () => <span></span>,
        footer: "",
        columns: [
          {
            accessorKey: "serviceCode",
            header: () => <span>{t("Code")}</span>,
            cell: (info: any) => info.getValue(),
            enableGlobalFilter: false,
            enableColumnFilter: false,
          },
        ],
      },
      {
        id: "routes",
        columns: [
          {
            header: () => <span>Routes</span>,
            footer: "",
            cell: (info: any) => info.getValue(),
            accessorKey: "routes",
            enableGlobalFilter: false,
            enableColumnFilter: true,
            filterFn: "fuzzy",
          },
        ],
      },
      {
        id: "serviceGroup",
        header: () => <span>Service Group</span>,
        footer: "",
        columns: [
          {
            cell: (info: any) => info.getValue(),
            accessorKey: "serviceGroup",
            enableGlobalFilter: true,
            enableColumnFilter: true,
          },
        ],
      },
      {
        id: "weight",
        header: () => <span>Weight</span>,
        footer: "",
        columns: [
          {
            cell: (info: any) => info.getValue(),
            accessorKey: "weight",
            enableGlobalFilter: false,
            enableColumnFilter: true,
            filterFn: "fuzzy",
          },
        ],
      },
      {
        id: "width",
        header: () => <span>Width</span>,
        footer: "",
        columns: [
          {
            cell: (info: any) => info.getValue(),
            accessorKey: "width",
            enableGlobalFilter: false,
            enableColumnFilter: true,
            filterFn: "fuzzy",
          },
        ],
      },
      {
        id: "deliveryLocation",
        header: () => <span>Delivery Location</span>,
        columns: [
          {
            cell: (info: any) => info.getValue(),
            accessorKey: "deliveryLocation",
            enableGlobalFilter: false,
            enableColumnFilter: true,
            filterFn: "fuzzy",
          },
        ],
      },
      {
        id: "additionalServices",
        header: () => <span>Additional Services</span>,
        footer: "",
        columns: [
          {
            cell: (info: any) => info.getValue(),
            accessorKey: "additionalServices",
            enableGlobalFilter: false,
            enableColumnFilter: true,
            filterFn: "fuzzy",
          },
        ],
      },
    ];
    additionalServices.records.map((record: any) => {
      columnVisibility[record.ServiceCode] = true;
      return columns.push({
        id: record.ServiceCode,
        header: () => (
          <div>
            <span>{t(record.ServiceCode)}</span>
          </div>
        ),
        footer:
          record.DisplayNameEN.indexOf("Equipment") > -1 ? "EQUIPMENT" : "",
        columns: [
          {
            cell: (info: any) => info.getValue(),
            accessorKey: record.ServiceCode,
            enableGlobalFilter: false,
            enableColumnFilter: false,
          },
        ],
      });
    });
    setColumnVisibility(columnVisibility);
    return setColumnData(columns);
  };

  const updateSearchParams = (param, value) => {
    //console.log(param + ' ' + value);
    let updatedSearchParams = new URLSearchParams(params.toString());
    //console.log(updatedSearchParams.toString());
    if (value === "") {
      updatedSearchParams.delete(param);
    } else {
      updatedSearchParams.set(param, value);
    }
    setParams(updatedSearchParams.toString());
  };

  const disableExcluded = (rowIndex, addon, isChecked) => {
    let excluded = [];
    for (let record of data.additionalServices["records"]) {
      if (record.ServiceCode === addon) {
        for (let excludedAddon of record.ExcludedAdditionalServices) {
          excluded.push(excludedAddon.Addon);
        }
      }
    }
    let update = [];
    for (const [key, value] of Object.entries(rowData[rowIndex])) {
      if (
        (excluded.includes(key) && value === null) ||
        (excluded.includes(key) && value === false)
      ) {
        let value = null;

        if (!isChecked) {
          value = false;
        }

        update.push({ row: rowIndex, column: key, value: value });
      }
    }
    if (update.length > 0) {
      setupdateRows(update);
    }
  };

  const handlePudo = () => {
    let updatedSearchParams = new URLSearchParams(params.toString());
    updatedSearchParams.set("pudo", !selected.pudo === true ? "true" : "false");
    updatedSearchParams.set(
      "deliveryLocation",
      !selected.pudo === true ? "Pickup" : ""
    );
    setParams(updatedSearchParams.toString());

    setSelected((prevState) => ({
      ...prevState,
      pudo: !prevState.pudo,
      deliveryLocation: !prevState.pudo ? "Pickup" : "",
    }));
  };

  const handlePickupOrder = () => {
    setSelected((prevState) => ({
      ...prevState,
      pickupOrder: !prevState.pickupOrder,
    }));
  };

  const handleShowInstallation = () => {
    setSelected((prevState) => ({
      ...prevState,
      showInstallation: !prevState.showInstallation,
    }));
  };

  const handleReset = () => {
    let updatedSearchParams = new URLSearchParams(params.toString());
    updatedSearchParams.delete("service");
    updatedSearchParams.delete("selectedService");
    updatedSearchParams.delete("addons");
    updatedSearchParams.delete("pudo");
    updatedSearchParams.delete("modalOpen");
    updatedSearchParams.delete("modalService");
    updatedSearchParams.delete("modalTab");
    updatedSearchParams.delete("offCanvasOpen");
    updatedSearchParams.delete("offCanvasTab");
    updatedSearchParams.delete("showOptional");
    updatedSearchParams.delete("showSamples");
    updatedSearchParams.delete("showInstallation");
    setParams(updatedSearchParams.toString());

    setSelected((prevState) => ({
      ...prevState,
      service: "",
      selectedService: "",
      addons: [],
      pudo: false,
      pickupOrder: false,
      modalOpen: false,
      modalService: "",
      modalTab: "",
      offCanvasOpen: false,
      offCanvasTab: "",
      showOptional: false,
      showSamples: true,
      showInstallation: false,
    }));

    setReset(true);
  };

  const handleServiceSelection = (index, isSelected) => {
    let service;
    let update = [];

    if (isSelected) {
      for (const row of filteredRowData["rows"]) {
        for (const [key, value] of Object.entries(row.original)) {
          if (
            row.index !== index &&
            key === "serviceButton" &&
            value === true
          ) {
            update.push({
              row: row.index,
              column: key,
              value: false,
            });
          } else if (
            (row.index !== index && value === true) ||
            (row.index !== index && value === false)
          ) {
            update.push({ row: row.index, column: key, value: null });
          } else if (row.index === index && value === null) {
            update.push({ row: row.index, column: key, value: false });
          }
          if (row.index === index && key === "serviceName") {
            service = value;
          }
          if (row.index === index && key === "serviceButton") {
            update.push({
              row: row.index,
              column: key,
              value: true,
            });
          }
        }
      }
      updateSearchParams("selectedService", service);
    } else {
      handleReset();
      setSelected((prevState) => ({
        ...prevState,
        selectedService: "",
        service: "",
      }));
    }
    if (update.length > 0) {
      //console.log(update);
      setupdateRows(update);
      setSelected((prevState) => ({
        ...prevState,
        selectedService: service,
        service: service,
      }));
    }
  };

  const handleSelection = (e) => {
    let updatedSearchParams = new URLSearchParams(params.toString());

    let addons = "";
    if (e.value) {
      setSelected((prevState) => ({
        ...prevState,
        service: e.service,
        addons: [...prevState.addons, e.addon],
      }));

      if (selected.addons.length > 0) {
        addons = selected.addons.join(" ") + " " + e.addon;
      } else {
        addons = e.addon;
      }

      updatedSearchParams.set("service", e.service);
      updatedSearchParams.set("addons", addons);
    } else {
      if (selected.addons.length === 1) {
        updatedSearchParams.delete("service");
        updatedSearchParams.delete("addons");
      } else {
        addons = selected.addons.filter((x) => x !== e.addon).join(" ");
        updatedSearchParams.set("addons", addons);
      }

      setSelected((prevState) => ({
        ...prevState,
        service: e.service,
        addons: prevState.addons.filter((x) => x !== e.addon),
      }));
    }
    setTimeout(() => {
      disableExcluded(e.row, e.addon, e.value);
    }, 500);

    setParams(updatedSearchParams.toString());
  };

  const getData = () => {
    setDataLoaded(false);

    setData((prevState) => ({
      ...prevState,
      services: servicesJSON,
      additionalServices: additionalServicesJSON,
      fileFormats: fileFormatsJSON,
      countries: countriesJSON,
      labelInstructions: labelInstructionsJSON,
    }));

    setDataLoaded(true);
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (window.location.hash.length > 1) {
      const path = "/service-matrix-2" + window.location.hash.replace("#", "");
      navigate(path, { replace: true });
    }
    getData();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      mapColumns(data.additionalServices);
      mapRows(
        data.services,
        data.additionalServices,
        t,
        handleServiceSelection,
        setRowData,
        data.packageTypes
      );
      mapFfRows(
        data.services,
        data.additionalServices,
        data.fileFormats,
        setFfRowData
      );
    }
  }, [data, dataLoaded]);

  useEffect(() => {
    populateSelect(ffRowData, setSelectData);
  }, [ffRowData]);

  useEffect(() => {
    if (dataLoaded) {
      let messages = MessageGenerator(
        selected,
        data.services,
        data.fileFormats,
        data.additionalServices,
        data.countries
      );

      setSelected((prevState) => ({
        ...prevState,
        labelData: messages["labelData"],
        POSTRA: messages["POSTRA"],
        SMARTSHIP: messages["SMARTSHIP"],
        WAYBILD16A: messages["WAYBILD16A"],
      }));
    }
  }, [
    selected.service,
    selected.addons,
    selected.showSamples,
    selected.showOptional,
    selected.deliveryLocation,
    selected.departure,
    selected.destination,
  ]);

  useEffect(() => {
    if (Object.entries(filteredRowData).length > 0) {
      populateMultiSelect(
        selected,
        filteredRowData["rows"],
        setMultiSelectData,
        data.countries,
        data.services,
        data.additionalServices
      );

      let isAvailable = false;
      let columns = [];
      for (let column of columnData) {
        if (column.footer === "EQUIPMENT") {
          columns.push(column.id);
        }
      }
      let update = [];
      for (const row of filteredRowData["rows"]) {
        for (const [key, value] of Object.entries(row.original)) {
          if (columns.includes(key) && value !== null) {
            isAvailable = true;
          }
          if (
            selected.destination !== "" &&
            typeof selected.destination !== "undefined" &&
            selected.departure !== "" &&
            typeof selected.departure !== "undefined"
          ) {
            for (let service of data.services["records"]) {
              if (service.ServiceCode === row.original.serviceCode) {
                for (let route of service.Routes) {
                  if (route.DepartureCountry === selected.departure) {
                    for (let destination of route.DestinationCountries) {
                      if (
                        destination.Country === selected.destination &&
                        destination.ExcludedAdditionalServices.some(
                          (e) => e.Addon === key
                        ) &&
                        value !== null
                      ) {
                        console.log(key, value);
                        update.push({
                          row: row.index,
                          column: key,
                          value: null,
                        });
                      } else if (
                        destination.Country === selected.destination &&
                        !destination.ExcludedAdditionalServices.some(
                          (e) => e.Addon === key
                        ) &&
                        value === null
                      ) {
                        if (
                          selected.selectedService !== "" &&
                          row.original.serviceCode ===
                            selected.selectedService &&
                          key !== "serviceButton"
                        ) {
                          update.push({
                            row: row.index,
                            column: key,
                            value: false,
                          });
                        } else if (selected.selectedService === "") {
                          //  console.log(
                          //    "T????LL?? " +
                          //      selected.selectedService +
                          //      " " +
                          //      row.original.serviceCode
                          //  );
                          update.push({
                            row: row.index,
                            column: key,
                            value: false,
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (update.length > 0) {
        setupdateRows(update);
      }
      if (selected.deliveryLocation === "LOCKER") {
        isAvailable = false;
      }
      setSelected((prevState) => ({
        ...prevState,
        instAvailable: isAvailable,
      }));
    }
    if (rowData.length > 0 && Object.entries(filteredRowData).length > 0) {
      for (const [key] of Object.entries(rowData[0])) {
        if (key.substring(0, 1) === "3" || key.substring(0, 1) === "5") {
          hideColumn(
            key,
            columnData,
            setColumnVisibility,
            filteredRowData,
            selected,
            data.additionalServices
          );
        }
      }
    }

    if (!loaded && Object.entries(filteredRowData).length > 0) {
      setLoaded(true);
    }
  }, [
    filteredRowData,
    selected.departure,
    selected.destination,
    selected.selectedService,
    selected.serviceFilter,
    selected.addonsFilter,
    selected.showInstallation,
    selected.pudo,
  ]);

  useEffect(() => {
    const getBool = (val) => {
      if (val !== undefined) {
        return !!JSON.parse(String(val).toLowerCase());
      }
    };

    if (Object.entries(filteredRowData).length > 0 && loaded) {
      const URLparams = Object.fromEntries([...params]);
      let alertArray = [];
      let addonArray = [];
      let selectedAddons = [];
      let filteredAddons = [];
      let serviceAddons = [];
      let serviceIndex = -1;
      let lang = "en";
      let languages = ["en", "fi"];

      if (URLparams.lang && !languages.includes(URLparams.lang.toLowerCase())) {
        alertArray.push({
          reason: "unsupported",
          param: "lang",
          value: URLparams.lang,
          datestamp: Date.now(),
        });
      } else if (URLparams.lang) {
        lang = URLparams.lang.toLowerCase();
        updateSearchParams("lang", lang);
      }

      if (
        URLparams.service &&
        !data.services["records"].some(
          (e) => e.ServiceCode === URLparams.service
        )
      ) {
        alertArray.push({
          reason: "unsupported",
          param: "service",
          value: URLparams.service,
          datestamp: Date.now(),
        });
      } else {
        for (const service of data.services["records"]) {
          if (service.ServiceCode === URLparams.service) {
            for (const addon of service.AdditionalServices) {
              for (let route of service.Routes) {
                if (route.DepartureCountry === URLparams.departure) {
                  for (let destination of route.DestinationCountries) {
                    if (
                      destination.Country === URLparams.destination &&
                      !destination.ExcludedAdditionalServices.some(
                        (e) => e.Addon === addon.Addon
                      )
                    ) {
                      console.log(addon.Addon);
                      serviceAddons.push(addon.Addon);
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (URLparams.addons) {
        addonArray = URLparams.addons.split(" ");
      }

      if (URLparams.addonsFilter) {
        filteredAddons = URLparams.addonsFilter.split(" ");
      }

      for (let [i, row] of rowData.entries()) {
        if (
          row.serviceCode === URLparams.service ||
          row.serviceCode === URLparams.selectedService
        ) {
          serviceIndex = i;
        }
      }

      if (addonArray) {
        for (let addon of addonArray) {
          if (
            !data.additionalServices["records"].some(
              (e) => e.ServiceCode === addon
            ) ||
            !serviceAddons.includes(addon)
          ) {
            alertArray.push({
              reason: "unsupported",
              param: "addons",
              value: addon,
              datestamp: Date.now(),
            });
          }
        }
      }

      let update = [];
      if (serviceIndex > -1) {
        for (let addon of addonArray) {
          //updateRowData(serviceIndex, addon, true);
          if (!alertArray.some((e) => e.value === addon)) {
            update.push({ row: serviceIndex, column: addon, value: true });
            selectedAddons.push(addon);
            disableExcluded(serviceIndex, addon, true);
          }
        }
        if (URLparams.selectedService !== "") {
          for (const row of filteredRowData["rows"]) {
            for (const [key, value] of Object.entries(row.original)) {
              if (row.index === serviceIndex && key === "serviceButton") {
                update.push({
                  row: row.index,
                  column: key,
                  value: true,
                });
              } else if (
                (row.index !== serviceIndex && value === true) ||
                (row.index !== serviceIndex && value === false)
              ) {
                update.push({ row: row.index, column: key, value: null });
              }
            }
          }
        }
      }

      if (
        getBool(URLparams.modalOpen) === true &&
        URLparams.modalService !== ""
      ) {
        callModal(
          URLparams.modalService,
          data.services,
          data.additionalServices
        );
      }

      setTimeout(() => {
        setupdateRows(update);
      }, 500);

      //setSelectedDepartureCountry(departure);
      //setSelectedDestinationCountry(destination);

      setSelected((prevState) => ({
        ...prevState,
        serviceGroup: URLparams.serviceGroup,
        service: URLparams.service,
        selectedService: URLparams.selectedService,
        serviceFilter: URLparams.serviceFilter,
        addons: selectedAddons,
        addonsFilter: filteredAddons,
        departure: URLparams.departure,
        destination: URLparams.destination,
        filter: URLparams.filter,
        format: URLparams.format,
        formatFilter: URLparams.formatFilter,
        lang: lang,
        offCanvasOpen: getBool(URLparams.offCanvasOpen),
        offCanvasTab: URLparams.offCanvasTab,
        showInstallation: getBool(URLparams.showInstallation),
        deliveryLocation: getBool(URLparams.pudo)
          ? "Pickup"
          : URLparams.deliveryLocation,
        pudo:
          getBool(URLparams.pudo) !== undefined
            ? getBool(URLparams.pudo)
            : false,
        showSamples:
          getBool(URLparams.showSamples) !== undefined
            ? getBool(URLparams.showSamples)
            : true,
        showOptional:
          getBool(URLparams.showOptional) !== undefined
            ? getBool(URLparams.showOptional)
            : false,
        weight: Number(URLparams.weight),
        width: Number(URLparams.width),
      }));
      if (alertArray.length > 0) {
        GenerateAlert(alertArray, setSelected);
      }
    }
  }, [loaded]);

  useEffect(() => {
    //console.log(selected);
  }, [selected]);

  useEffect(() => {
    let isAvailable = false;
    for (let item of multiSelectData) {
      if (item.label === "Delivery Location") {
        for (let option of item.options) {
          if (option.value === "Pickup") {
            isAvailable = true;
          }
        }
      }
    }
    if (!isAvailable && selected.deliveryLocation === "Pickup") {
      isAvailable = true;
    }
    if (
      (isAvailable && selected.width > 100) ||
      (isAvailable && selected.weight > 25)
    ) {
      isAvailable = false;
    }
    setSelected((prevState) => ({
      ...prevState,
      pudoAvailable: isAvailable,
    }));
  }, [multiSelectData]);

  const langChange = (e) => {
    let value = e;
    updateSearchParams("lang", value);
    setSelected((prevState) => ({
      ...prevState,
      lang: value,
    }));
    i18n.changeLanguage(value);
  };

  const callModal = (e, services, additionalServices) => {
    let value = e;
    let data = {};
    let messageFormat;
    data["fields"] = {};
    if (value.substring(0, 1) === "2") {
      for (const record of services["records"]) {
        if (record.ServiceCode === value) {
          let dimensions = [];
          let routes = [];
          data["title"] = record.ServiceCode;
          data["description"] = record.ServiceCode + "_tooltip";
          data["availability"] = record.DeliveryLocation.split(",");
          for (const dimension of record.PackageTypesAndDimensions) {
            dimensions.push(dimension);
          }
          dimensions.sort(
            (a, b) =>
              a.MaxWeight_kg +
              a.MaxWidth_cm +
              a.MaxHeight_cm +
              a.MaxDepth_cm -
              (b.MaxWeight_kg + b.MaxWidth_cm + b.MaxHeight_cm + b.MaxDepth_cm)
          );
          //console.log(dimensions);
          for (const route of record.Routes) {
            routes.push(route);
          }
          for (const field of record.Fields) {
            if (field.MessageFormat.substring(0, 6) === "POSTRA") {
              messageFormat = "POSTRA";
            } else {
              messageFormat = field.MessageFormat;
            }
            if (!data["fields"][messageFormat]) {
              data["fields"][messageFormat] = [];
            }

            data["fields"][messageFormat].push(field);
          }
          data["routes"] = routes;
          data["dimensions"] = dimensions;
        }
      }
    } else {
      for (const record of additionalServices["records"]) {
        if (record.ServiceCode === value) {
          let excluded = [];
          let countries = [];
          let mandatory = "";
          data["fields"] = {};
          let availability = [];

          if (record.Home) {
            availability.push("BUSINESS", "HOME");
          }
          if (record.Pudo) {
            availability.push("LOCKER", "POSTOFFICE");
          }
          data["availability"] = availability;
          data["title"] = record.ServiceCode;
          data["description"] = record.ServiceCode + "_tooltip";
          for (const addon of record.ExcludedAdditionalServices) {
            excluded.push(addon.Addon);
          }

          for (const country of record.AvailableCountries) {
            countries.push(country.Country);
          }

          for (const field of record.Fields) {
            if (field.MessageFormat.substring(0, 6) === "POSTRA") {
              messageFormat = "POSTRA";
            } else {
              messageFormat = field.MessageFormat;
            }
            if (!data["fields"][messageFormat]) {
              data["fields"][messageFormat] = [];
            }
            if (
              field.MessageFormat.substring(0, 6) === "POSTRA" &&
              field.PropertyName !== "Service" &&
              field.Mandatory
            ) {
              mandatory = mandatory + field.PropertyName + ", ";
              data["fields"][messageFormat].push(field);
            } else {
              data["fields"][messageFormat].push(field);
            }
          }
          data["countries"] = countries;
          data["excluded"] = excluded;
          data["mandatory"] = mandatory.substring(0, mandatory.length - 2);
        }
      }
    }

    let updatedSearchParams = new URLSearchParams(params.toString());
    updatedSearchParams.set("modalOpen", "true");
    updatedSearchParams.set("modalService", value);

    setParams(updatedSearchParams.toString());
    setSelected((prevState) => ({
      ...prevState,
      modalOpen: true,
      modalService: value,
      modalData: data,
    }));
  };

  const closeModal = () => {
    //  let updatedSearchParams = new URLSearchParams(params.toString());
    //  updatedSearchParams.delete("modalOpen");
    //  updatedSearchParams.delete("modalService", value);

    //  setParams(updatedSearchParams.toString());
    setSelected((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));
    updateSearchParams("modalOpen", false);
  };

  const closeOffCanvas = () => {
    setSelected((prevState) => ({
      ...prevState,
      offCanvasOpen: false,
    }));
    updateSearchParams("offCanvasOpen", false);
  };

  const openOffCanvas = () => {
    setSelected((prevState) => ({
      ...prevState,
      offCanvasOpen: true,
    }));
    updateSearchParams("offCanvasOpen", true);
  };

  const showOptional = () => {
    setSelected((prevState) => ({
      ...prevState,
      showOptional: !prevState.showOptional,
    }));
    updateSearchParams("showOptional", !selected.showOptional);
  };

  const showSamples = () => {
    setSelected((prevState) => ({
      ...prevState,
      showSamples: !prevState.showSamples,
    }));
    updateSearchParams("showSamples", !selected.showSamples);
  };

  const onHandleCellClick = useCallback(
    (r: number, c: string, v: any) => {
      if (c === "serviceName") {
        callModal(v, data.services, data.additionalServices);
      } else if (c.substring(0, 5) === "modal") {
        callModal(v, data.services, data.additionalServices);
      } else if (c === "serviceButton") {
        handleServiceSelection(r, !v);
      }
    },
    [filteredRowData]
  );

  const startTour = () => {
    setSelected((prevState) => ({
      ...prevState,
      startTour: !prevState.startTour,
    }));
    setCurrentState(selected);
  };

  useEffect(() => {
    console.log(currentState);
  }, [currentState]);

  return (
    <div className="App">
      <Tour
        startTour={selected.startTour}
        t={t}
        tourCommands={(e) => {
          console.log(e);
          if (e === "openModalService") {
            callModal("2102", data.services, data.additionalServices);
            setSelected((prevState) => ({
              ...prevState,
              modalTab: "postra",
            }));
          } else if (e === "openModalAddon") {
            callModal("3101", data.services, data.additionalServices);
            setSelected((prevState) => ({
              ...prevState,
              modalTab: "postra",
            }));
          } else if (e === "closeModal") {
            closeModal();
          } else if (e === "filterOpen") {
            setSelected((prevState) => ({
              ...prevState,
              filterOpen: true,
            }));
          } else if (e === "filterClose") {
            setSelected((prevState) => ({
              ...prevState,
              filterOpen: false,
            }));
          } else if (e === "setSelected") {
            setSelected((prevState) => ({
              ...prevState,
              departure: "FI",
              destination: "FI",
              weight: 35,
            }));
          } else if (e === "unsetSelected") {
            setSelected((prevState) => ({
              ...prevState,
              departure: "",
              destination: "",
              weight: "",
            }));
          } else if (e === "serviceSelection") {
            handleServiceSelection(4, true);
          } else if (e === "serviceUnselection") {
            handleServiceSelection(4, false);
          } else if (e === "addonSelection") {
            handleSelection({
              row: 4,
              service: "2102",
              addon: "3174",
              value: true,
            });
            setupdateRows([{ row: 4, column: "3174", value: true }]);
          } else if (e === "addonUnselection") {
            handleSelection({
              row: 4,
              service: "2102",
              addon: "3174",
              value: false,
            });
            setupdateRows([{ row: 4, column: "3174", value: false }]);
          } else if (e === "openOffCanvas") {
            openOffCanvas();
            setSelected((prevState) => ({
              ...prevState,
              offCanvasTab: "label",
            }));
          } else if (e === "closeOffCanvas") {
            closeOffCanvas();
          } else if (e === "offCanvasTabLabel") {
            setSelected((prevState) => ({
              ...prevState,
              offCanvasTab: "label",
            }));
          } else if (e === "offCanvasTabPostra") {
            setSelected((prevState) => ({
              ...prevState,
              offCanvasTab: "postra",
            }));
          } else if (e === "fileFormats") {
            navigate("/service-matrix-2/FileFormats", { replace: true });
          } else if (e === "serviceMatrix") {
            navigate("/service-matrix-2/ServiceMatrix", { replace: true });
          } else if (e === "formatSelected") {
            setSelected((prevState) => ({
              ...prevState,
              format: "POSTRA_PARCEL",
            }));
          } else if (e === "formatUnselected") {
            setSelected((prevState) => ({
              ...prevState,
              format: "",
            }));
          } else if (e === "setFormatFilter") {
            setSelected((prevState) => ({
              ...prevState,
              formatFilter: "Service",
            }));
          } else if (e === "unsetFormatFilter") {
            setSelected((prevState) => ({
              ...prevState,
              formatFilter: "",
            }));
          } else if (e === "reset") {
            handleReset();
            setSelected((prevState) => ({
              ...prevState,
              filterOpen: false,
              departure: undefined,
              destination: undefined,
              weight: undefined,
              addonsFilter: [],
              startTour: false,
            }));
            navigate("/service-matrix-2/ServiceMatrix", { replace: true });
          } else if (e === "skip") {
            setSelected((prevState) => ({
              ...prevState,
              startTour: false,
            }));
          }
        }}
      />
      <Alert t={t} data={selected.alertData} />
      <Modal
        t={t}
        data={selected.modalData}
        openModal={selected.modalOpen}
        closeModal={closeModal}
        selected={selected}
        setSelected={setSelected}
        updateSearchParams={updateSearchParams}
      />
      <NavBar
        selectedLang={langChange}
        navDropTitle={t("Language")}
        navMatrix={t("'Service Matrix'")}
        navFormat={t("'File Formats'")}
        navDropEn={t("English")}
        navDropFi={t("Finnish")}
        navTour={t("StartTour")}
        value={selected.lang}
        startTour={startTour}
      />
      <Container fluid>
        <Routes>
          <Route
            path="/service-matrix-2/ServiceMatrix"
            element={
              <>
                <OffCanvas
                  t={t}
                  data={selected}
                  openCanvas={selected.offCanvasOpen}
                  closeCanvas={closeOffCanvas}
                  showOptional={showOptional}
                  showSamples={showSamples}
                  setKey={(e) => {
                    updateSearchParams("offCanvasTab", e);
                    setSelected((prevState) => ({
                      ...prevState,
                      offCanvasTab: e,
                    }));
                  }}
                />
                <div className="controls">
                  <Row className="filter">
                    <Col xs={10} sm={10} md={11}>
                      <Select
                        selected={loaded ? selected : ""}
                        data={multiSelectData}
                        setFilterOpen={(e) =>
                          setSelected((prevState) => ({
                            ...prevState,
                            filterOpen: e,
                          }))
                        }
                        filterOpen={selected.filterOpen}
                        isMulti={true}
                        t={t}
                        onChange={(e) => {
                          let dep,
                            des,
                            sg,
                            w,
                            ls,
                            dl,
                            s = "";
                          let addons = [];
                          let updatedSearchParams = new URLSearchParams(
                            params.toString()
                          );
                          if (e.length > 0) {
                            for (let item of e) {
                              if (item.optGroup === "Departure Country") {
                                dep = item.value.substring(
                                  4,
                                  item.value.length
                                );
                              }
                              if (item.optGroup === "Destination Country") {
                                des = item.value.substring(
                                  4,
                                  item.value.length
                                );
                              }
                              if (item.optGroup === "Service Group") {
                                sg = item.value;
                              }
                              if (item.optGroup === "Weight") {
                                w = item.value;
                              }
                              if (item.optGroup === "Longest Side") {
                                ls = item.value;
                              }
                              if (item.optGroup === "Delivery Location") {
                                dl = item.value;
                              }
                              if (item.optGroup === "Service") {
                                s = item.value;
                              }
                              if (item.optGroup === "Additional Service") {
                                addons.push(item.value);
                              }
                            }
                            setSelected((prevState) => ({
                              ...prevState,
                              departure: dep,
                              destination: des,
                              serviceGroup: sg,
                              weight: w,
                              width: ls,
                              deliveryLocation: dl,
                              serviceFilter: s,
                              addonsFilter: addons,
                            }));

                            if (s) {
                              updatedSearchParams.set("serviceFilter", s);
                            } else {
                              updatedSearchParams.delete("serviceFilter");
                            }
                            if (sg) {
                              updatedSearchParams.set("serviceGroup", sg);
                            } else {
                              updatedSearchParams.delete("serviceGroup");
                            }
                            if (dep) {
                              updatedSearchParams.set("departure", dep);
                            } else {
                              updatedSearchParams.delete("departure");
                            }
                            if (des) {
                              updatedSearchParams.set("destination", des);
                            } else {
                              handleReset();
                              updatedSearchParams.delete("destination");
                            }
                            if (w) {
                              updatedSearchParams.set("weight", w);
                            } else {
                              updatedSearchParams.delete("weight");
                            }
                            if (ls) {
                              updatedSearchParams.set("width", ls);
                            } else {
                              updatedSearchParams.delete("width");
                            }
                            if (dl) {
                              updatedSearchParams.set("deliveryLocation", dl);
                            } else {
                              updatedSearchParams.delete("deliveryLocation");
                            }
                            if (addons.length > 0) {
                              let addonstring = addons.join(" ");
                              updatedSearchParams.set(
                                "addonsFilter",
                                addonstring
                              );
                            } else {
                              updatedSearchParams.delete("addonsFilter");
                            }
                          } else {
                            if (!selected.pudo) {
                              setSelected((prevState) => ({
                                ...prevState,
                                departure: "",
                                destination: "",
                                serviceGroup: "",
                                weight: "",
                                width: "",
                                deliveryLocation: "",
                                serviceFilter: "",
                                addonsFilter: addons,
                              }));
                            } else {
                              setSelected((prevState) => ({
                                ...prevState,
                                departure: "",
                                destination: "",
                                serviceGroup: "",
                                weight: "",
                                width: "",
                                serviceFilter: "",
                                addonsFilter: addons,
                              }));
                            }

                            updatedSearchParams.delete("serviceFilter");
                            updatedSearchParams.delete("departure");
                            updatedSearchParams.delete("destination");
                            updatedSearchParams.delete("weight");
                            updatedSearchParams.delete("width");
                            updatedSearchParams.delete("deliveryLocation");
                            updatedSearchParams.delete("addonsFilter");
                            updatedSearchParams.delete("serviceGroup");
                          }

                          if (e.length === multiSelectData.length) {
                          }
                          setParams(updatedSearchParams.toString());
                        }}
                      />
                    </Col>
                    <OverlayTrigger
                      key={"tooltip_samples"}
                      placement="top"
                      overlay={
                        <Tooltip key={"tooltip_samples"}>
                          {t("samples_tooltip")}
                        </Tooltip>
                      }
                    >
                      <Col
                        xs={2}
                        sm={{ span: 2, offset: 0 }}
                        md={{ span: 1, offset: 0 }}
                      >
                        <Button
                          title={""}
                          type="samples"
                          onClick={openOffCanvas}
                        />
                      </Col>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <Col className="pickupOptions">
                      <Form.Check
                        type="switch"
                        id="installation"
                        label={t("'Show equipment'")}
                        checked={selected.showInstallation}
                        onChange={handleShowInstallation}
                        disabled={!selected.instAvailable}
                      />
                    </Col>
                  </Row>
                  {/*
                  <Row>
                    <Col className="pickupOptions">
                      <Form.Check
                        type="switch"
                        id="pickupPoint"
                        label={t("'Pickup point chosen by the recipient'")}
                        checked={selected.pudo}
                        onChange={handlePudo}
                        disabled={!selected.pudoAvailable}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pickupOptions">
                      <Form.Check
                        type="switch"
                        id="pickupOrder"
                        label={t("'Pickup order'")}
                        checked={selected.pickupOrder}
                        onChange={handlePickupOrder}
                      />
                    </Col> 
                  </Row>
                  */}
                  <Row>
                    <Col className="resetButton" xs={4} sm={3} md={2} lg={1}>
                      <Button
                        title={t("Reset")}
                        type="reset"
                        onClick={handleReset}
                      />
                    </Col>
                  </Row>
                </div>
                {columnData.length > 0 ? (
                  <div
                    className={
                      selected.offCanvasOpen ? "content open" : "content"
                    }
                  >
                    <TanStackTable
                      t={t}
                      defaultColumns={columnData}
                      defaultData={rowData}
                      weight={selected.weight}
                      width={selected.width}
                      service={selected.serviceFilter}
                      addons={selected.addonsFilter}
                      deliveryLocation={selected.deliveryLocation}
                      route={
                        selected.departure && selected.destination
                          ? selected.departure + "-" + selected.destination
                          : ""
                      }
                      filteredRows={setFilteredRowData}
                      hiddenColumns={columnVisibility}
                      selection={(e) => handleSelection(e)}
                      updateRows={updateRows}
                      serviceGroup={selected.serviceGroup}
                      reset={reset}
                      setReset={setReset}
                      handleCellClick={onHandleCellClick}
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            }
          />
          <Route
            path="/service-matrix-2/FileFormats"
            element={
              <FileFormats
                t={t}
                selected={selected}
                setSelected={setSelected}
                formats={selectData}
                ffColumnData={ffColumnData}
                setFfColumnData={setFfColumnData}
                ffRowData={ffRowData}
                updateSearchParams={updateSearchParams}
                fileFormats={data.fileFormats}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

interface AppProps {}

export default App;
