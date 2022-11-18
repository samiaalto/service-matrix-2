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
        <div className="list-header-code">Value</div>
        <div className="list-header-desc">Description</div>
        {listItems.slice(0, loadCount).map((item, i) => (
          <div key={i} className="list-item">
            <div className="item-code">
              {item.substring(0, item.indexOf("-"))}
            </div>
            <div className="item-desc">
              {t(item.substring(item.indexOf("-") + 1, item.length))}
            </div>
          </div>
        ))}

        {listItems.length > showItem ? (
          <Button
            className="ff-showlist"
            title="Show list"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? t("hideAll") : t("showAll")}
          </Button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AllowedValues;
