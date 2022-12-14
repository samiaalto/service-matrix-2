import JoyRide, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
  TooltipRenderProps,
} from "react-joyride";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./styles/Tour_styles.css";
import { ReactComponent as ChevronIcon } from "./icons/ChevronIcon.svg";
import Select from "./Select";

// Tour component
const Tour = ({ startTour, t, tourCommands }) => {
  // Tour steps
  const TOUR_STEPS: any = [
    {
      target: ".navbar",
      title: "Welcome",
      content: "Welcome_txt",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".navbar",
      title: "Navigation",
      content: "Navbar_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".ServiceMatrix_tab",
      title: "Navigation",
      content: "Navbar_Matrix_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".FileFormats_tab",
      title: "Navigation",
      content: "Navbar_FileFormats_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".nav-item.dropdown",
      title: "Navigation",
      content: "Navbar_Language_txt",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__control",
      title: "Filtering",
      content:
        "Here's a filter to filter services by service attributes like departure country or weight of a colli in the shipment. You can start typing to search attributes in all supported languages or open up the menu and scrolling the options. The filter will automatically refresh after each selection to match the service offering.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__menu",
      title: "Filtering",
      content:
        "Here are the filtering options: Departure Country, Destination Country, Weight per colli, Longest side of the colli, Delivery Location, Service Group, Service and Additional Service",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__multi-value",
      title: "Filtering",
      content:
        "Selected options can be found here and cleared by clicking on the clear button one by one found on each selection.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".lp-copy-sel__clear-indicator",
      title: "Filtering",
      content:
        "All the selected options can be removed by clicking on the global clear button.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".MatrixContainer",
      title: "Service Matrix",
      content:
        "This is the Service Matrix. In service matrix you can see which additional services are available for each service. The interactive service Matrix filters out the excluded additional services by clicking checkboxes. There is also additional information about the additional services and services by clicking on the service name.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".pickupOptions",
      title: "Service Matrix",
      content: "You can filter out installation services using this switch.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".resetButton",
      title: "Service Matrix",
      content:
        "Reset button will reset the choices made in the Service Matrix but leave the filtering choises intact.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".service2102",
      title: "Services",
      content:
        "Services are located on the left hand side bar of the Service Matrix. You can click on the service name to get more information about the service.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".modal-dialog",
      title: "Services",
      content:
        "On the popup you can see more detailed information about the additional service in case. The description, availability, routes and colli dimensions. Also technical integration instructions can be found on each service.",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".modal-tech-table",
      title: "Services",
      content:
        "On the technical instructions table you can see the mandatory fields needed in the integration message in order to use this service.",
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
      title: "Services",
      content:
        "Service button allows you to deactivate other services and filter out the additional services not applicable to the selected service.",
      disableBeacon: true,
      placement: "top",
    },
    {
      target: ".service2102 .badge",
      title: "Services",
      content:
        "In some cases you might expreience a warning. In this case to be able to send collis which weight more than 25 kg activating an additional service is required.",
      disableBeacon: true,
      placement: "top",
    },
    {
      target: ".checkbox21023174",
      title: "Services",
      content:
        "By activating the required additional service the warning is removed.",
      disableBeacon: true,
      placement: "top",
    },
    {
      target: ".headerTitle3101",
      title: "Additional Services",
      content:
        "Additional Services are located in the top bar of the Service Matrix. You can click the additional service to see more information on it.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".modal-dialog",
      title: "Additional Services",
      content:
        "On the popup you can see more detailed information about the additional service in case. The description, availability, available countries and mandatory information. Also technical integration instructions can be found on each additional service.",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".modal-tech-table",
      title: "Additional Services",
      content:
        "On the technical instructions table you can see the mandatory fields needed in the integration message in order to use this additional service.",
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
      title: "Samples",
      content:
        "In the samples section you can see how choices are affecting the messages and label.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".offcanvas",
      title: "Samples",
      content:
        "Here you can see the label. Hovering your mouse on top of the items on the label you can see the item specifications ie. barcode specifications.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".offcanvas",
      title: "Samples",
      content:
        "By choosing other tabs you can see the example message generated based on your service and additional service choices in the Service Matrix section. The mandatory changes are highlighted in message.",
      disableBeacon: true,
      placement: "auto",
    },
    {
      target: ".navbar",
      title: "Thank you",
      content: "Hope you enjoy using Posti Service Matrix!",
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
      value: 5,
      title: "fileFormats",
      subTitle: "fileFormats_desc",
      keyWords: "",
    },
  ];

  const [state, setState] = useState({
    run: false,
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
              {"(" + (index + 1) + "/" + size + ")"}
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
                    tourCommands("filterClose");
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
                placeholder={t("Jump to a topic")}
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
              {t("Skip tour")}
            </button>
          )}
        </Col>
        <Col>
          <Row>
            <Col>
              {index > 0 && !isLastStep && (
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
    if (index === 6) {
      tourCommands("filterOpen");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 7 && action !== "update") {
      tourCommands("filterClose");
    } else if (index === 7 && action === "update") {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 13) {
      tourCommands("openModalService");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 15) {
      tourCommands("closeModal");
      tourCommands("serviceSelection");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 17 && action !== "update") {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 17 && action === "update") {
      tourCommands("addonSelection");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 19) {
      tourCommands("openModalAddon");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 21) {
      tourCommands("closeModal");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 22) {
      tourCommands("openOffCanvas");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 23) {
      tourCommands("offCanvasTab");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    } else if (index === 24 && action !== "update") {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: true,
        }));
      }, 400);
    }
    if (action === "skip") {
      tourCommands("reset");
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          run: false,
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
