import "./styles/ServiceDimensions_styles.css";
import { ReactComponent as SmallParcel } from "./icons/SmallParcel.svg";
import { ReactComponent as PostalParcel } from "./icons/PostalParcel.svg";
import { ReactComponent as HomeParcel } from "./icons/HomeParcel.svg";
import { ReactComponent as ExpressParcel } from "./icons/ExpressParcel.svg";
import { ReactComponent as ExpressFreight } from "./icons/ExpressFreight.svg";

const ServiceDimensions = ({ service, dimensions }) => {
  const renderSwitch = (param) => {
    if (param === "2461") {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <SmallParcel
              title="SmallParcel"
              className="SmallParcel"
              key="SmallParcel"
            />
            {dimensions
              ? dimensions.map((dimension) => (
                  <>
                    <div className="sp_height">
                      {dimension.MinHeight_cm +
                        " - " +
                        dimension.MaxHeight_cm +
                        " cm"}
                    </div>
                    <div className="sp_width">
                      {dimension.MinWidth_cm +
                        " - " +
                        dimension.MaxWidth_cm +
                        " cm"}
                    </div>
                    <div className="sp_depth">
                      {dimension.MinDepth_cm +
                        " - " +
                        dimension.MaxDepth_cm +
                        " cm"}
                    </div>
                    <div className="sp_weight">
                      {dimension.MinWeight_kg +
                        " - " +
                        dimension.MaxWeight_kg +
                        " kg"}
                    </div>
                  </>
                ))
              : ""}
          </div>
        </div>
      );
    } else if (param === "2101" || param === "2102" || param === "2124") {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <ExpressParcel
              title="ExpressParcel"
              className="ExpressParcel"
              key="ExpressParcel"
            />
            {dimensions
              ? dimensions.map((dimension) => (
                  <>
                    <div className="ep_height">
                      {dimension.MinHeight_cm +
                        " - " +
                        dimension.MaxHeight_cm +
                        " cm"}
                    </div>
                    <div className="ep_width">
                      {dimension.MinWidth_cm +
                        " - " +
                        dimension.MaxWidth_cm +
                        " cm"}
                    </div>
                    <div className="ep_depth">
                      {dimension.MinDepth_cm +
                        " - " +
                        dimension.MaxDepth_cm +
                        " cm"}
                    </div>
                    <div className="ep_weight">
                      {dimension.MinWeight_kg +
                        " - " +
                        dimension.MaxWeight_kg +
                        " kg"}
                    </div>
                    <div className="ep_circum">
                      {dimension.Circumference_cm + " cm"}
                    </div>
                  </>
                ))
              : ""}
          </div>
        </div>
      );
    } else if (
      param === "2004" ||
      param === "2142" ||
      param === "2143" ||
      param === "2144" ||
      param === "2145"
    ) {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <ExpressFreight
              title="ExpressFreight"
              className="ExpressFreight"
              key="ExpressFreight"
            />
            {dimensions
              ? dimensions.map((dimension) => (
                  <>
                    {dimension.MinHeight_cm !== null &&
                    dimension.MessageFormat.substring(0, 6) === "POSTRA" ? (
                      <>
                        <div
                          className={"ef_" + dimension.PackageType + "_height"}
                        >
                          {dimension.MinHeight_cm +
                            " - " +
                            dimension.MaxHeight_cm +
                            " cm"}
                        </div>
                        <div
                          className={"ef_" + dimension.PackageType + "_width"}
                        >
                          {dimension.MinWidth_cm +
                            " - " +
                            dimension.MaxWidth_cm +
                            " cm"}
                        </div>
                        <div
                          className={"ef_" + dimension.PackageType + "_depth"}
                        >
                          {dimension.MinDepth_cm +
                            " - " +
                            dimension.MaxDepth_cm +
                            " cm"}
                        </div>
                        <div
                          className={"ef_" + dimension.PackageType + "_weight"}
                        >
                          {dimension.MinWeight_kg +
                            " - " +
                            dimension.MaxWeight_kg +
                            " kg"}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ))
              : ""}
          </div>
        </div>
      );
    }
  };

  return <>{renderSwitch(service)}</>;
};

export default ServiceDimensions;
