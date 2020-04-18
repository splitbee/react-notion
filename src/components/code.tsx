import * as React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

const Code: React.FC<{ code: string; language: string }> = ({
  code,
  language = "javascript"
}) => {
  return (
    <pre>
      <code
        className="notion-code"
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
  );
};

export default Code;
