import * as React from "react";
import { DecorationType, BlockType, ContentValueType } from "./types";
import Asset from "./components/asset";
import Code from "./components/code";

export const renderChildText = (properties: DecorationType[]) => {
  if (!properties) return null;
  return properties.map(([text, decorations], i) => {
    if (!decorations) {
      return text;
    }

    return decorations.reduce((element, decorator) => {
      switch (decorator[0]) {
        case "h":
          return (
            <span key={i} className={`notion-${decorator[1]}`}>
              {element}
            </span>
          );
        case "c":
          return (
            <code key={i} className="notion-inline-code">
              {element}
            </code>
          );
        case "b":
          return <b key={i}>{element}</b>;
        case "i":
          return <em key={i}>{element}</em>;
        case "s":
          return <s key={i}>{element}</s>;
        case "a":
          return (
            <a className="notion-link" href={decorator[1]} key={i}>
              {element}
            </a>
          );

        default:
          return <React.Fragment key={i}>{element}</React.Fragment>;
      }
    }, <>{text}</>);
  });
};

interface Block {
  block: BlockType;
  parentBlock: BlockType;
  level: number;
}

export const Block: React.FC<Block> = props => {
  const { block, parentBlock, children } = props;
  const blockValue = block?.value;
  switch (blockValue.type) {
    case "page":
      return <div className="notion">{children}</div>;
    case "header":
      if (!blockValue.properties) return null;
      return (
        <h1 className="notion-h1">
          {renderChildText(blockValue.properties.title)}
        </h1>
      );
    case "sub_header":
      if (!blockValue.properties) return null;
      return (
        <h2 className="notion-h2">
          {renderChildText(blockValue.properties.title)}
        </h2>
      );
    case "sub_sub_header":
      if (!blockValue.properties) return null;
      return (
        <h3 className="notion-h3">
          {renderChildText(blockValue.properties.title)}
        </h3>
      );
    case "divider":
      return <hr />;
    case "text":
      if (!blockValue.properties) {
        return <p style={{ height: "1rem" }}> </p>;
      }
      return (
        <p className={`notion-text`}>
          {renderChildText(blockValue.properties.title)}
        </p>
      );
    case "bulleted_list":
    case "numbered_list":
      const isTopLevel = block.value.type !== parentBlock.value.type;

      const wrapList = (content: React.ReactNode) =>
        blockValue.type === "bulleted_list" ? (
          <ul className="notion-list notion-list-disc">{content}</ul>
        ) : (
          <ol className="notion-list notion-list-numbered">{content}</ol>
        );

      let output: JSX.Element | null = null;

      if (blockValue.content) {
        output = (
          <>
            {blockValue.properties && (
              <li>{renderChildText(blockValue.properties.title)}</li>
            )}
            {wrapList(children)}
          </>
        );
      } else {
        output = blockValue.properties ? (
          <li>{renderChildText(blockValue.properties.title)}</li>
        ) : null;
      }

      return isTopLevel ? wrapList(output) : output;

    case "image":
    case "embed":
    case "video":
      const value = block.value as ContentValueType;

      return (
        <div className="notion-asset-wrapper">
          <Asset block={block} />
          {value.properties.caption && (
            <div className="notion-image-caption">
              {renderChildText(value.properties.caption)}
            </div>
          )}
        </div>
      );
    case "code": {
      if (blockValue.properties.title) {
        const content = blockValue.properties.title[0][0];
        const language = blockValue.properties.language[0][0];
        return (
          <Code key={blockValue.id} language={language || ""} code={content} />
        );
      }
      break;
    }
    case "column_list":
      return <div className="notion-row">{children}</div>;
    case "column":
      const spacerWith = 46;
      const ratio = blockValue.format.column_ratio;
      const columns = Number((1 / ratio).toFixed(0));
      const spacerTotalWith = (columns - 1) * spacerWith;
      const width = `calc((100% - ${spacerTotalWith}px) * ${ratio})`;
      return (
        <>
          <div className="notion-column" style={{ width }}>
            {children}
          </div>
          <div className="notion-spacer" style={{ width: spacerWith }} />
        </>
      );
    case "quote":
      if (!blockValue.properties) return null;
      return (
        <blockquote className="notion-quote">
          {renderChildText(blockValue.properties.title)}
        </blockquote>
      );
    case "callout":
      return (
        <div
          className={`notion-callout notion-${blockValue.format.block_color}_co`}
        >
          <div>{blockValue.format.page_icon}</div>
          <div className="notion-callout-text">
            {renderChildText(blockValue.properties.title)}
          </div>
        </div>
      );
    default:
      if (process.env.NODE_ENV !== "production") {
        console.log("Unsupported type " + block?.value?.type);
      }
      return <div />;
  }
  return null;
};
