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
          }}
          wrapLines={true}
          lineProps={(lineNumber) => {
            let style = {
              display: "block",
              backgroundColor: "#272822",
            };
            if (lines.includes(lineNumber)) {
              style.backgroundColor = "#333333";
            }
            return { style };
          }}
        >
          {Object.entries(data).length > 0 ? data : ""}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default SampleCodeView;
