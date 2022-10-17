import Redo from "./icons/Redo.svg";
import Clipboard from "./icons/Clipboard.svg";
import Select from "./icons/Select.svg";
import Samples from "./icons/Samples.svg";
import Location from "./icons/Location.svg";
import More from "./icons/More.svg";
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
        return <Samples />;
      case "clipboard":
        return <Clipboard />;
      case "select":
        return <Select />;
      case "selected":
        return <Select />;
      case "location":
        return <Location />;
      case "more":
        return <More />;
      default:
        return <Redo />;
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
