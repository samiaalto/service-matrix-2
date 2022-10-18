import { ReactComponent as Redo } from "./icons/Redo.svg";
import { ReactComponent as Clipboard } from "./icons/Clipboard.svg";
import { ReactComponent as Select } from "./icons/Select.svg";
import { ReactComponent as Samples } from "./icons/Samples.svg";
import { ReactComponent as Location } from "./icons/Location.svg";
import { ReactComponent as More } from "./icons/More.svg";
import "./styles/Button_styles.css";

interface buttonProps {
  title: string;
  type: string;
  onClick: (el) => void;
}

function ResetButton({ title, type, onClick }: buttonProps) {
  function handleOnClick(el) {
    onClick(el);
    //console.log('CLICKED');
  }

  function renderSwitch(param) {
    switch (param) {
      case "samples":
        return <Samples title="Samples" className="Samples" key="Samples" />;
      case "clipboard":
        return (
          <Clipboard title="Clipboard" className="Clipboard" key="Clipboard" />
        );
      case "select":
        return <Select title="Select" className="Select" key="Select" />;
      case "selected":
        return <Select title="Select" className="Select" key="Select" />;
      case "location":
        return (
          <Location title="Location" className="Location" key="Location" />
        );
      case "more":
        return <More title="More" className="More" key="More" />;
      default:
        return <Redo title="Redo" className="Redo" key="Redo" />;
    }
  }

  return (
    <div className={"btn-wrapper " + type}>
      <div
        tabIndex={0}
        className="btn-header"
        role="button"
        onKeyPress={(el) => handleOnClick(el)}
        onClick={(el) => handleOnClick(el)}
      >
        <div className="btn-header_title">
          <p className="btn-header_title--bold">{title}</p>
        </div>
        <div className="btn-header_icon">{renderSwitch(type)}</div>
      </div>
    </div>
  );
}

export default ResetButton;
