import JoyRide from "react-joyride";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./styles/Tour_styles.css";
import { ReactComponent as ChevronIcon } from "./icons/ChevronIcon.svg";
import Select from "./Select";

const Tour = ({ startTour, t, tourCommands }) => {
  // Tour steps
  const TOUR_STEPS: any = [
    {
      target: ".navbar",
      title: "welcome",
      content: "Welcome_txt",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".navbar",
      title: "navigation",
      content: "Navbar_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".ServiceMatrix_tab",
      title: "navigation",
      content: "Navbar_Matrix_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".FileFormats_tab",
      title: "navigation",
      content: "Navbar_FileFormats_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".nav-item.dropdown",
      title: "navigation",
      content: "Navbar_Language_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__control",
      title: "filtering",
      content: "Filter_input_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__menu",
      title: "filtering",
      content: "Filter_menu_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__multi-value",
      title: "filtering",
      content: "Filter_value_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__clear-indicator",
      title: "filtering",
      content: "Filter_clear_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".MatrixContainer",
      title: "serviceMatrix",
      content: "ServiceMatrix_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".pickupOptions",
      title: "serviceMatrix",
      content: "ServiceMatrix_installation_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".resetButton",
      title: "serviceMatrix",
      content: "ServiceMatrix_reset_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".service2102",
      title: "services",
      content: "Services_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".modal-dialog",
      title: "services",
      content: "Services_modal_txt",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".modal-tech-table",
      title: "services",
      content: "Services_modal_tech_txt",
      disableBeacon: true,
      placement: "auto",
      styles: {
        options: {
          zIndex: 100000,
        },
      },
    },
    {
      target: ".serviceButton2102",
      title: "services",
      content: "Services_button_txt",
      disableBeacon: true,
      placement: "top",
    },
    {
      target: ".service2102 .badge",
      title: "services",
      content: "Services_badge_txt",
      disableBeacon: true,
      placement: "top",
    },
    {
      target: ".checkbox21023174",
      title: "services",
      content: "Services_check_txt",
      disableBeacon: true,
      placement: "top",
    },
    {
      target: ".headerTitle3101",
      title: "additionalServices",
      content: "AdditionalServices_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".modal-dialog",
      title: "additionalServices",
      content: "AdditionalServices_modal_txt",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".modal-tech-table",
      title: "additionalServices",
      content: "AdditionalServices_modal_tech_txt",
      disableBeacon: true,
      placement: "auto",
      styles: {
        options: {
          zIndex: 100000,
        },
      },
    },
    {
      target: ".samples",
      title: "samples",
      content: "Samples_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".offcanvas",
      title: "samples",
      content: "Samples_label_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".offcanvas",
      title: "samples",
      content: "Samples_message_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".appcontainer",
      title: "fileFormats",
      content: "Fileformats_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__control",
      title: "fileFormats",
      content: "Fileformats_dropdown_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".ff-tabs",
      title: "fileFormats",
      content: "Fileformats_tabs_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".ff-table",
      title: "fileFormats",
      content: "Fileformats_specs_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".filter-wrapper",
      title: "fileFormats",
      content: "Fileformats_filter_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".navbar",
      title: "thankyou",
      content: "Thankyou_txt",
      disableBeacon: true,
      placement: "center",
      styles: {
        options: {
          zIndex: 100000,
        },
      },
    },
  ];

  const TOUR_OPTIONS = [
    {
      value: 1,
      title: "navigation",
      subTitle: "navigation_desc",
      keyWords: "",
    },
    {
      value: 5,
      title: "filtering",
      subTitle: "filtering_desc",
      keyWords: "",
    },
    {
      value: 9,
      title: "serviceMatrix",
      subTitle: "serviceMatrix_desc",
      keyWords: "",
    },
    {
      value: 12,
      title: "services",
      subTitle: "services_desc",
      keyWords: "",
    },
    {
      value: 18,
      title: "additionalServices",
      subTitle: "additionalServices_desc",
      keyWords: "",
    },
    {
      value: 21,
      title: "samples",
      subTitle: "samples_desc",
      keyWords: "",
    },
    {
      value: 24,
      title: "fileFormats",
      subTitle: "fileFormats_desc",
      keyWords: "",
    },
  ];

  const [state, setState] = useState({
    run: false,
    filterOpen: false,
    selected: false,
    serviceModal: false,
    serviceSelection: false,
    addonSelection: false,
    addonModal: false,
    offCanvas: false,
    fileFormats: false,
    formatSelected: false,
    formatFilter: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      run: startTour,
    }));
  }, [startTour]);

  const Tooltip = ({
    continuous,
    index,
    step,
    size,
    isLastStep,
    backProps,
    skipProps,
    primaryProps,
    tooltipProps,
  }) => (
    <div className="tour-tooltip" {...tooltipProps}>
      <Row className="tour-title">
        {step.title && (
          <>
            <Col sm={2}></Col>
            <Col sm={8} className="title">
              {t(step.title)}
            </Col>
            <Col sm={2} className="tour-position">
              {index + 1 + " / " + size}
            </Col>
          </>
        )}
      </Row>
      <div className="tour-content">
        <Col>{t(step.content)}</Col>
        {!isLastStep ? (
          <div className="tour-menu">
            <Row>
              <Select
                data={TOUR_OPTIONS}
                t={t}
                onChange={(e) => {
                  if (e.value >= 7) {
                    tourCommands("setSelected");
                    setState((prevState) => ({
                      ...prevState,
                      run: true,
                      selected: true,
                    }));
                  }
                  if (e.value >= 15) {
                    tourCommands("serviceSelection");
                  }
                  if (e.value >= 18) {
                    tourCommands("addonSelection");
                  }
                  setState((prevState) => ({
                    ...prevState,
                    run: true,
                    stepIndex: e.value,
                  }));
                }}
                placeholder={t("JumpToTopic")}
              />
            </Row>
          </div>
        ) : (
          ""
        )}
      </div>

      <Row className="tour-footer">
        <Col>
          {!isLastStep && (
            <button className="tour-skip" {...skipProps}>
              {t("skipTour")}
            </button>
          )}
        </Col>
        <Col>
          <Row>
            <Col>
              {index > 0 && (
                <button
                  className="tour-back"
                  {...backProps}
                  onClick={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      run: true,
                      stepIndex: prevState.stepIndex - 1,
                    }));
                  }}
                >
                  <ChevronIcon
                    title=""
                    className="ChevronIcon"
                    key="ChevronIcon"
                  />
                  <div className="tour-back-txt">{t("Back")}</div>
                </button>
              )}
            </Col>
            <Col>
              {continuous && !isLastStep && (
                <button
                  className="tour-next"
                  {...primaryProps}
                  onClick={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      run: true,
                      stepIndex: prevState.stepIndex + 1,
                    }))
                  }
                >
                  <div className="tour-next-txt">{t("Next")}</div>
                  <ChevronIcon
                    title=""
                    className="ChevronIcon"
                    key="ChevronIcon"
                  />
                </button>
              )}
              {continuous && isLastStep && (
                <button className="tour-next" {...skipProps}>
                  <div className="tour-next-txt">{t("Close")}</div>
                </button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

  const test = (data: any) => {
    const { action, index, status, type } = data;
    console.log(index, action);
    if (index === 1 && action === "next") {
      tourCommands("reset");
      setState((prevState) => ({
        ...prevState,
        run: true,
      }));
    } else if (index === 1 && action !== "next") {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (
      index === 6 &&
      action === "next" &&
      !state.filterOpen &&
      !state.selected
    ) {
      tourCommands("filterOpen");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          filterOpen: true,
        }));
      }, 400);
    } else if (
      index === 6 &&
      action === "prev" &&
      state.filterOpen &&
      !state.selected
    ) {
      tourCommands("filterClose");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          filterOpen: false,
        }));
      }, 400);
    } else if (
      index === 7 &&
      action === "next" &&
      state.filterOpen &&
      !state.selected
    ) {
      tourCommands("filterClose");
      tourCommands("setSelected");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          filterOpen: false,
          selected: true,
        }));
      }, 400);
    } else if (
      index === 6 &&
      action === "prev" &&
      !state.filterOpen &&
      state.selected
    ) {
      tourCommands("filterOpen");
      tourCommands("unsetSelected");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          filterOpen: true,
          selected: false,
        }));
      }, 400);
    } else if (index === 8 && !state.selected) {
      tourCommands("setSelected");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          filterOpen: false,
          selected: true,
        }));
      }, 400);
    } else if (index === 13 && action === "next" && !state.serviceModal) {
      tourCommands("openModalService");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          serviceModal: true,
        }));
      }, 400);
    } else if (index === 13 && action === "prev" && state.serviceModal) {
      tourCommands("closeModal");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          serviceModal: false,
        }));
      }, 400);
    } else if (
      index === 15 &&
      action === "next" &&
      state.serviceModal &&
      !state.serviceSelection
    ) {
      tourCommands("closeModal");
      tourCommands("serviceSelection");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          serviceModal: false,
          serviceSelection: true,
        }));
      }, 400);
    } else if (
      index === 15 &&
      action === "next" &&
      state.serviceModal &&
      state.serviceSelection
    ) {
      tourCommands("closeModal");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          serviceModal: false,
          serviceSelection: true,
        }));
      }, 400);
    } else if (index === 14 && action === "prev") {
      tourCommands("openModalService");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          serviceModal: true,
        }));
      }, 400);
    } else if (index === 17 && action === "next" && !state.addonSelection) {
      tourCommands("addonSelection");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          addonSelection: true,
        }));
      }, 400);
    } else if (index === 17 && action === "prev" && state.addonSelection) {
      tourCommands("addonUnselection");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          addonSelection: false,
        }));
      }, 400);
    } else if (index === 19 && action === "next" && !state.addonModal) {
      tourCommands("openModalAddon");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          addonModal: true,
        }));
      }, 400);
    } else if (index === 19 && action === "prev" && state.addonModal) {
      tourCommands("closeModal");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          addonModal: false,
        }));
      }, 400);
    } else if (index === 21 && action === "next" && state.addonModal) {
      tourCommands("closeModal");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          addonModal: false,
        }));
      }, 400);
    } else if (index === 20 && action === "prev" && !state.addonModal) {
      tourCommands("openModalAddon");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          addonModal: true,
        }));
      }, 400);
    } else if (index === 22 && action === "next" && !state.offCanvas) {
      tourCommands("openOffCanvas");
      tourCommands("offCanvasTabLabel");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          offCanvas: true,
        }));
      }, 400);
    } else if (index === 21 && action === "prev" && state.offCanvas) {
      tourCommands("closeOffCanvas");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          offCanvas: false,
        }));
      }, 400);
    } else if (index === 22 && action === "prev") {
      tourCommands("offCanvasTabLabel");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 23) {
      tourCommands("offCanvasTabPostra");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 24 && action === "next" && !state.fileFormats) {
      tourCommands("fileFormats");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          fileFormats: true,
        }));
      }, 400);
    } else if (index === 24 && action === "prev" && state.fileFormats) {
      tourCommands("serviceMatrix");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          fileFormats: false,
        }));
      }, 400);
    } else if (index === 26 && action === "next" && !state.formatSelected) {
      tourCommands("formatSelected");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          formatSelected: true,
        }));
      }, 400);
    } else if (index === 26 && action === "prev" && state.formatSelected) {
      tourCommands("formatUnselected");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          formatSelected: false,
        }));
      }, 400);
    } else if (index === 28 && action === "next" && !state.formatFilter) {
      tourCommands("setFormatFilter");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          formatFilter: true,
        }));
      }, 400);
    } else if (index === 27 && action === "prev" && state.formatFilter) {
      tourCommands("unsetFormatFilter");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
          formatFilter: false,
        }));
      }, 400);
    }
    if (index > 0 && action === "skip") {
      tourCommands("reset");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          filterOpen: false,
          selected: false,
          serviceModal: false,
          serviceSelection: false,
          addonSelection: false,
          addonModal: false,
          offCanvas: false,
          fileFormats: false,
          formatSelected: false,
          formatFilter: false,
          stepIndex: 0,
        }));
      }, 400);
    } else if (index === 0 && action === "skip") {
      tourCommands("skip");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          filterOpen: false,
          selected: false,
          serviceModal: false,
          serviceSelection: false,
          addonSelection: false,
          addonModal: false,
          offCanvas: false,
          fileFormats: false,
          formatSelected: false,
          formatFilter: false,
          stepIndex: 0,
        }));
      }, 400);
    }
  };

  return (
    <>
      <JoyRide
        callback={test}
        steps={state.steps}
        stepIndex={state.stepIndex}
        continuous={true}
        disableOverlayClose={true}
        showSkipButton
        run={state.run}
        tooltipComponent={Tooltip}
        styles={{
          options: {
            zIndex: 1000,
          },
        }}
      />
    </>
  );
};
export default Tour;
