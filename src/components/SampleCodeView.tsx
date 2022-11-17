import "./styles/SampleCodeView_styles.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import monokai from "react-syntax-highlighter/dist/esm/styles/hljs/monokai";
import monokaiSublime from "react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";

const SampleCodeView = ({ data, type, lines }) => {
  SyntaxHighlighter.registerLanguage("json", json);
  SyntaxHighlighter.registerLanguage("xml", xml);

  return (
    <>
      <div className="codePreview">
        <SyntaxHighlighter
          language={type}
          style={
            type === "xml" ? monokai : type === "json" ? monokaiSublime : ""
          }
          showLineNumbers={true}
          lineNumberStyle={{
            color: "#9f9f9f",
            borderRight: "1px solid #474747",
            marginRight: "10px",
            minWidth: "2.75em",
          }}
          wrapLines={true}
          lineProps={(lineNumber) => {
            let className = "";
            let style = {
              display: "block",
              backgroundColor: "#272822",
            };

            if (lines.includes(lineNumber)) {
              style.backgroundColor = "rgba(51,51,51,0.8)";
              className = "highlighted";
            }
            return { style, class: className };
          }}
        >
          {Object.entries(data).length > 0 ? data : ""}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default SampleCodeView;
