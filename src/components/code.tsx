import * as React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

const Code: React.FC<{ code: string; language: string }> = ({
  code,
  language = "javascript"
}) => {
  return (
    <>
      <pre>
        <code
          className="rounded"
          style={{
            padding: "30px 16px 30px 20px",
            tabSize: 2,
            fontSize: "85%",
            display: "block",
            background: "rgb(247, 246, 243)",
            fontFamily:
              'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace'
          }}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              code,
              Prism.languages[language.toLowerCase()] ||
                Prism.languages.javascript,
              language
            )
          }}
        />
      </pre>
    </>
  );
};

export default Code;
