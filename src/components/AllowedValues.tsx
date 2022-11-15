import { useState } from "react";
//import Button from "./Button";
import Button from "react-bootstrap/Button";

const AllowedValues = ({ data, t }) => {
  const [listItems, setListItems] = useState(data);
  const [showAll, setShowAll] = useState(false);
  const [showItem, setShowItem] = useState(4);

  const loadCount = showAll ? listItems.length : showItem;
  return (
    <>
      <div className="value-list">
        <div className="value-header">Allowed values:</div>
        <ul>
          {listItems.slice(0, loadCount).map((item, i) => (
            <li key={i} className="list-item">
              {item.substring(0, item.indexOf("-")) +
                " (" +
                t(item.substring(item.indexOf("-") + 1, item.length)) +
                ")"}
            </li>
          ))}
        </ul>
        {listItems.length > showItem ? (
          <Button
            className="ff-showlist"
            title="Show list"
            onClick={() => setShowAll(!showAll)}
          >
            {t("showAll")}
          </Button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AllowedValues;
