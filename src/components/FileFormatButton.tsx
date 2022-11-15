import { useState } from "react";
//import Button from "./Button";
import Button from "react-bootstrap/Button";

const FileFormatButton = ({ data, t }) => {
  const [listItems, setListItems] = useState(data);
  const [showAll, setShowAll] = useState(false);
  const [showItem, setShowItem] = useState(4);

  const loadCount = showAll ? listItems.length : showItem;
  return (
    <>
      <div className="value-list">
        <div>Allowed values:</div>
        <ul>
          {listItems.slice(0, loadCount).map((item, i) => (
            <li key={i} className="list-item">
              {item + " (" + t(item) + ")"}
            </li>
          ))}
        </ul>
      </div>
      {listItems.length > showItem ? (
        <Button
          className="ff-showlist"
          title="Show list"
          onClick={() => setShowAll(!showAll)}
        >
          Show all
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default FileFormatButton;
