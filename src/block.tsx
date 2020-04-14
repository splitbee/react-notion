import * as React from "react";
import { LoadPageChunkData, DecorationType } from "./types";
import Asset from "./components/asset";
import Code from "./components/code";

export const renderChildText = (properties: DecorationType[]) => {
  if (!properties) return null;
  return properties.map((item, index) => {
    let el: JSX.Element = <>{item[0]}</>;
    if (item.length !== 1) {
      item[1].forEach(item => {
        switch (item[0]) {
          case "b":
            el = <b key={index}>{el}</b>;
            break;
          case "i":
            el = <em key={index}>{el}</em>;
            break;
          case "s":
            el = <s key={index}>{el}</s>;
            break;
          case "a":
            el = (
              <a className="notion-link" href={item[1]} key={index}>
                {el}
              </a>
            );
            break;
          case "c":
            el = (
              <code className="notion-inline-code" key={index}>
                {el}
              </code>
            );
            break;
          case "h":
            el = <span className={`notion-${item[1]}`}>{el}</span>;
        }
      });
    }
    return el;
  });
};

interface Block {
  block: LoadPageChunkData["recordMap"]["block"][""];
  level: number;
}

export const Block: React.FC<Block> = props => {
  const { block } = props;

  switch (block?.value?.type) {
    case "page":
      return null;
    case "header":
      if (!block.value.properties) return null;
      return (
        <h1 className="notion-h1">
          <>{renderChildText(block.value.properties.title)}</>
        </h1>
      );
    case "sub_header":
      if (!block.value.properties) return null;
      return (
        <h2 className="notion-h2">
          <>{renderChildText(block.value.properties.title)}</>
        </h2>
      );
    case "sub_sub_header":
      if (!block.value.properties) return null;
      return (
        <h3 className="notion-h3">
          <>{renderChildText(block.value.properties.title)}</>
        </h3>
      );
    case "column_list":
      return null;
    case "quote":
      if (!block.value.properties) return null;
      return (
        <blockquote className="notion-quote">
          <>{renderChildText(block.value.properties.title)}</>
        </blockquote>
      );
    case "column":
      return null;
    case "divider":
      return <hr />;
    case "text":
      if (!block.value.properties) {
        return <p style={{ height: "1rem" }}> </p>;
      }
      return (
        <p className={`notion-text`}>
          <>{renderChildText(block.value.properties.title)}</>
        </p>
      );
    case "bulleted_list":
    case "numbered_list":
      if (!block.value.properties) return null;
      return (
        <li className={``}>
          <>{renderChildText(block.value.properties.title)}</>
        </li>
      );
    case "image":
    case "embed":
    case "video":
      return (
        <div className="notion-asset-wrapper">
          <Asset block={block} />
        </div>
      );
    case "code": {
      if (block.value.properties.title) {
        const content = block.value.properties.title[0][0];
        const language = block.value.properties.language[0][0];
        return (
          <Code key={block.value.id} language={language || ""} code={content} />
        );
      }
      break;
    }
    default:
      console.log("Unsupported type " + block?.value?.type);
      return <div />;
  }
  return null;
};

interface ChildProps {
  blockMap: LoadPageChunkData["recordMap"]["block"];
  level: number;
  ids: string[];
}

export const Child: React.FC<ChildProps> = props => {
  const { ids, blockMap } = props;

  let idArray = [];
  let bulletArray = [];
  let orderedArray = [];

  for (let i = 0; i < ids.length; i++) {
    const currentId = ids[i];
    if (!(currentId in blockMap)) continue;
    const currentBlock = blockMap[currentId];

    if (currentBlock?.value.type === "bulleted_list") {
      bulletArray.push(
        <NotionRenderer
          level={props.level + 1}
          currentID={ids[i]}
          blockMap={blockMap}
        />
      );
    } else if (currentBlock?.value.type === "numbered_list") {
      orderedArray.push(
        <NotionRenderer
          level={props.level + 1}
          currentID={ids[i]}
          blockMap={blockMap}
        />
      );
    } else if (currentBlock?.value.type === "column_list") {
      idArray.push(
        <div className="notion-row">
          <NotionRenderer
            level={props.level + 1}
            currentID={currentId}
            blockMap={blockMap}
          />
        </div>
      );
    } else if (currentBlock.value.type === "column") {
      const spacerWith = 46;
      const spacerTotalWith = idArray.length * spacerWith;
      const width = `calc((100% - ${spacerTotalWith}px) * ${currentBlock.value.format.column_ratio})`;
      idArray.push(
        <>
          <div className="notion-column" style={{ width }}>
            <NotionRenderer
              level={props.level + 1}
              currentID={ids[i]}
              blockMap={blockMap}
            />
          </div>
          {idArray.length !== ids.length - 1 && <div style={{ width: 46 }} />}
        </>
      );
    } else {
      if (bulletArray.length > 0) {
        idArray.push(
          <ul className="notion-list notion-list-disc">{bulletArray}</ul>
        );
        bulletArray = [];
      }
      if (orderedArray.length > 0) {
        idArray.push(
          <ol className="notion-list notion-list-numbered" key={i}>
            {orderedArray}
          </ol>
        );
        orderedArray = [];
      }

      idArray.push(
        <div className="notion-block" key={i}>
          <NotionRenderer
            level={props.level + 1}
            currentID={ids[i]}
            blockMap={blockMap}
          />
        </div>
      );
    }
  }

  if (bulletArray.length > 0) {
    idArray.push(
      <ul className="notion-list notion-list-disc" key={idArray.length}>
        {bulletArray}
      </ul>
    );
  }
  if (orderedArray.length > 0) {
    idArray.push(
      <ol className="notion-list notion-list-numbered " key={idArray.length}>
        {orderedArray}
      </ol>
    );
  }
  return <>{idArray}</>;
};

interface NotionProps {
  blockMap: LoadPageChunkData["recordMap"]["block"];
  currentID: string;
  level: number;
}

export const NotionRenderer: React.FC<NotionProps> = props => {
  const currentBlock = props.blockMap[props.currentID];

  const renderChildren = !(
    currentBlock?.value?.type === "page" && props.level > 0
  );

  return (
    <>
      <Block level={props.level} block={currentBlock} />
      {currentBlock?.value?.content && renderChildren && (
        <Child
          level={props.level}
          ids={currentBlock?.value?.content}
          blockMap={props.blockMap}
        />
      )}
    </>
  );
};
