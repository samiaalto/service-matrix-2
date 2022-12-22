import "./styles/ServiceDimensions_styles.css";
import { ReactComponent as SmallParcel } from "./icons/SmallParcel.svg";
import { ReactComponent as PostalParcel } from "./icons/PostalParcel.svg";
import { ReactComponent as HomeParcel } from "./icons/HomeParcel.svg";
import { ReactComponent as EmptyParcel } from "./icons/EmptyParcel.svg";
import { ReactComponent as IntPallet } from "./icons/IntPallet.svg";
import { ReactComponent as ExpressParcel } from "./icons/ExpressParcel.svg";
import { ReactComponent as ExpressFreight } from "./icons/ExpressFreight.svg";
import { ReactComponent as PickupLogo } from "./icons/Pickup_logo.svg";
import { ReactComponent as DestinationLogo } from "./icons/Destination_logo.svg";

interface Dimension {
  MinHeight_cm: number;
  MaxHeight_cm: number;
  MinWidth_cm: number;
  MaxWidth_cm: number;
  MinDepth_cm: number;
  MaxDepth_cm: number;
  MinWeight_kg: number;
  MaxWeight_kg: number;
  Circumference_cm: number;
  MessageFormat: string;
  PackageType: string;
  DimensionName: string;
  AdditionalServiceCode: any;
  DisplayNameEN: string;
  DeliveryLocation: string;
}

const ServiceDimensions = ({ service, dimensions, t }) => {
  const renderSwitch = (param: string) => {
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
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    <span
                      key={"field_dimension_height_" + i}
                      className="sp_height"
                    >
                      {dimension.MinHeight_cm +
                        " - " +
                        dimension.MaxHeight_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_width_" + i}
                      className="sp_width"
                    >
                      {dimension.MinWidth_cm +
                        " - " +
                        dimension.MaxWidth_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_depth_" + i}
                      className="sp_depth"
                    >
                      {dimension.MinDepth_cm +
                        " - " +
                        dimension.MaxDepth_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_weight_" + i}
                      className="sp_weight"
                    >
                      {dimension.MinWeight_kg +
                        " - " +
                        dimension.MaxWeight_kg +
                        " kg"}
                    </span>
                  </>
                ))
              : ""}
          </div>
        </div>
      );
    } else if (
      param === "2101" ||
      param === "2102" ||
      param === "2124" ||
      param === "2711" ||
      param === "2718"
    ) {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <ExpressParcel
              title=""
              className="ExpressParcel"
              key="ExpressParcel"
            />
            {dimensions
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_height_" + i}
                        className="ep_height"
                      >
                        {dimension.MinHeight_cm +
                          " - " +
                          dimension.MaxHeight_cm +
                          " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_width_" + i}
                        className="ep_width"
                      >
                        {dimension.MinWidth_cm +
                          " - " +
                          dimension.MaxWidth_cm +
                          " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_depth_" + i}
                        className="ep_depth"
                      >
                        {dimension.MinDepth_cm +
                          " - " +
                          dimension.MaxDepth_cm +
                          " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_weight_" + i}
                        className="ep_weight"
                      >
                        {dimension.MinWeight_kg +
                          " - " +
                          dimension.MaxWeight_kg +
                          " kg"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_circumference_" + i}
                        className="ep_circum"
                      >
                        {dimension.Circumference_cm + " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode !== null ? (
                      <span key={"field_bulky" + i} className="field_bulky">
                        {"NOTE! With additional service " +
                          t(dimension.AdditionalServiceCode.Addon) +
                          " max. width " +
                          dimension.MaxWidth_cm +
                          " cm and max. weight " +
                          dimension.MaxWeight_kg +
                          " kg"}
                      </span>
                    ) : (
                      ""
                    )}
                  </>
                ))
              : ""}
          </div>
        </div>
      );
    } else if (param === "2103" || param === "2331" || param === "2351") {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <PostalParcel
              title=""
              className="PostalParcel"
              key="PostalParcel"
            />
            {dimensions
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_height_" + i}
                        className={
                          dimension.DeliveryLocation === "LOCKER"
                            ? "pp_apt_height"
                            : "pp_height"
                        }
                      >
                        {dimension.MinHeight_cm +
                          " - " +
                          dimension.MaxHeight_cm +
                          " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_width_" + i}
                        className={
                          dimension.DeliveryLocation === "LOCKER"
                            ? "pp_apt_width"
                            : "pp_width"
                        }
                      >
                        {dimension.MinWidth_cm +
                          " - " +
                          dimension.MaxWidth_cm +
                          " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_depth_" + i}
                        className={
                          dimension.DeliveryLocation === "LOCKER"
                            ? "pp_apt_depth"
                            : "pp_depth"
                        }
                      >
                        {dimension.MinDepth_cm +
                          " - " +
                          dimension.MaxDepth_cm +
                          " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_weight_" + i}
                        className={
                          dimension.DeliveryLocation === "LOCKER"
                            ? "pp_apt_weight"
                            : "pp_weight"
                        }
                      >
                        {dimension.MinWeight_kg +
                          " - " +
                          dimension.MaxWeight_kg +
                          " kg"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode === null ? (
                      <span
                        key={"field_dimension_circumference_" + i}
                        className={
                          dimension.DeliveryLocation === "LOCKER"
                            ? "pp_apt_circum"
                            : "pp_circum"
                        }
                      >
                        {dimension.Circumference_cm + " cm"}
                      </span>
                    ) : (
                      ""
                    )}
                    {dimension.AdditionalServiceCode !== null ? (
                      <>
                        <span
                          key={"field_bulky" + i}
                          className="field_bulky_2103"
                        >
                          {"NOTE! With additional service " +
                            t(dimension.AdditionalServiceCode.Addon) +
                            " max. width " +
                            dimension.MaxWidth_cm +
                            " cm"}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ))
              : ""}
            <PickupLogo
              title=""
              className={
                param === "2103" ? "sd_PickupLogo" : "sd_PickupLogo_pb"
              }
              key="PickupLogo"
            />
            <span
              className={
                param === "2103" ? "sd_PickupLogo_txt" : "sd_PickupLogo_pb_txt"
              }
            >
              To a parcel locker
            </span>
            <DestinationLogo
              title=""
              className={
                param === "2103"
                  ? "sd_DestinationLogo"
                  : "sd_DestinationLogo_pb"
              }
              key="DestinationLogo"
            />
            <span
              className={
                param === "2103"
                  ? "sd_DestinationLogo_txt"
                  : "sd_DestinationLogo_pb_txt"
              }
            >
              Picked up or to a service point
            </span>
          </div>
        </div>
      );
    } else if (param === "2104" || param === "2352") {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <HomeParcel
              title="HomeParcel"
              className="HomeParcel"
              key="HomeParcel"
            />
            {dimensions
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    <span
                      key={"field_dimension_height_" + i}
                      className="ep_height"
                    >
                      {dimension.MinHeight_cm +
                        " - " +
                        dimension.MaxHeight_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_width_" + i}
                      className="ep_width"
                    >
                      {dimension.MinWidth_cm +
                        " - " +
                        dimension.MaxWidth_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_depth_" + i}
                      className="ep_depth"
                    >
                      {dimension.MinDepth_cm +
                        " - " +
                        dimension.MaxDepth_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_weight_" + i}
                      className="ep_weight"
                    >
                      {dimension.MinWeight_kg +
                        " - " +
                        dimension.MaxWeight_kg +
                        " kg"}
                    </span>
                    <span
                      key={"field_dimension_circumference_" + i}
                      className="ep_circum"
                    >
                      {dimension.Circumference_cm + " cm"}
                    </span>
                  </>
                ))
              : ""}
          </div>
        </div>
      );
    } else if (
      param === "2017" ||
      param === "2015" ||
      param === "2108" ||
      param === "2317"
    ) {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <EmptyParcel title="" className="EmptyParcel" key="EmptyParcel" />
            {dimensions
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    <span
                      key={"field_dimension_height_" + i}
                      className="ems_height"
                    >
                      {dimension.MinHeight_cm +
                        " - " +
                        dimension.MaxHeight_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_width_" + i}
                      className="ems_width"
                    >
                      {dimension.MinWidth_cm +
                        " - " +
                        dimension.MaxWidth_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_depth_" + i}
                      className="ems_depth"
                    >
                      {dimension.MinDepth_cm +
                        " - " +
                        dimension.MaxDepth_cm +
                        " cm"}
                    </span>
                    <span
                      key={"field_dimension_weight_" + i}
                      className="ems_weight"
                    >
                      {dimension.MinWeight_kg +
                        " - " +
                        dimension.MaxWeight_kg +
                        " kg"}
                    </span>
                    <span
                      key={"field_dimension_circumference_" + i}
                      className="ems_circum"
                    >
                      {dimension.Circumference_cm + " cm"}
                    </span>
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
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    {dimension.MinHeight_cm !== null &&
                    dimension.MessageFormat.substring(0, 6) === "POSTRA" ? (
                      <>
                        <span
                          key={"field_dimension_height_" + i}
                          className={"ef_" + dimension.PackageType + "_height"}
                        >
                          {dimension.MinHeight_cm +
                            " - " +
                            dimension.MaxHeight_cm +
                            " cm"}
                        </span>
                        <span
                          key={"field_dimension_width_" + i}
                          className={"ef_" + dimension.PackageType + "_width"}
                        >
                          {dimension.MinWidth_cm +
                            " - " +
                            dimension.MaxWidth_cm +
                            " cm"}
                        </span>
                        <span
                          key={"field_dimension_depth_" + i}
                          className={"ef_" + dimension.PackageType + "_depth"}
                        >
                          {dimension.MinDepth_cm +
                            " - " +
                            dimension.MaxDepth_cm +
                            " cm"}
                        </span>
                        <span
                          key={"field_dimension_weight_" + i}
                          className={"ef_" + dimension.PackageType + "_weight"}
                        >
                          {dimension.MinWeight_kg +
                            " - " +
                            dimension.MaxWeight_kg +
                            " kg"}
                        </span>
                        <span
                          key={"field_dimension_type_" + i}
                          className={"ef_" + dimension.PackageType + "_type"}
                        >
                          {dimension.DisplayNameEN}
                        </span>
                        {dimension.AdditionalServiceCode !== null ? (
                          <span
                            key={"field_bulky" + i}
                            className="field_bulky_2004"
                          >
                            {"NOTE! With additional service " +
                              t(dimension.AdditionalServiceCode.Addon) +
                              " max. length " +
                              dimension.MaxWidth_cm +
                              " cm. Separate agreement is required when colli length exceeds  " +
                              dimension.MaxWidth_cm +
                              " cm."}
                          </span>
                        ) : (
                          ""
                        )}
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
    } else if (
      param === "2354" ||
      param === "2318" ||
      param === "2329" ||
      param === "2330" ||
      param === "2331" ||
      param === "2341" ||
      param === "2359"
    ) {
      return (
        <div className="dimensions-container">
          <div className="dimensions-div">
            <IntPallet title="" className="IntPallet" key="IntPallet" />
            {dimensions
              ? dimensions.map((dimension: Dimension, i: number) => (
                  <>
                    {dimension.MinHeight_cm !== null &&
                    dimension.MessageFormat.substring(0, 6) === "POSTRA" ? (
                      <>
                        <span
                          key={"field_dimension_height_" + i}
                          className={"if_" + dimension.PackageType + "_height"}
                        >
                          {dimension.MinHeight_cm +
                            " - " +
                            dimension.MaxHeight_cm +
                            " cm"}
                        </span>
                        <span
                          key={"field_dimension_width_" + i}
                          className={"if_" + dimension.PackageType + "_width"}
                        >
                          {dimension.MinWidth_cm +
                            " - " +
                            dimension.MaxWidth_cm +
                            " cm"}
                        </span>
                        <span
                          key={"field_dimension_depth_" + i}
                          className={"if_" + dimension.PackageType + "_depth"}
                        >
                          {dimension.MinDepth_cm +
                            " - " +
                            dimension.MaxDepth_cm +
                            " cm"}
                        </span>
                        <span
                          key={"field_dimension_weight_" + i}
                          className={"if_" + dimension.PackageType + "_weight"}
                        >
                          {dimension.MinWeight_kg +
                            " - " +
                            dimension.MaxWeight_kg +
                            " kg"}
                        </span>
                        <span
                          key={"field_dimension_type_" + i}
                          className={"if_" + dimension.PackageType + "_type"}
                        >
                          {dimension.DisplayNameEN}
                        </span>
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
