import { useState } from "react";
//import Button from "./Button";
import Button from "react-bootstrap/Button";

const FileFormatButton = ({ data, t }) => {
  const [listItems, setListItems] = useState(data);
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        className="ff-showlist"
        title="Show list"
        onClick={() => setShow(!show)}
      >
        Show list
      </Button>
      <div className="value-list">
        <ul>
          {show
            ? listItems.map((item, i) => (
                <li key={i} className="list-item">
                  {item + " (" + t(item) + ")"}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </>
  );
};

export default FileFormatButton;
