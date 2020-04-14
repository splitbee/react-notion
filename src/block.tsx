import * as React from "react";
import { LoadPageChunkData, DecorationType } from "./types";
import Asset from "./components/asset";
import Code from "./components/code";

// import './styles.css';

export const applyDecorator = (properties: DecorationType[]) => {
  return properties.map((item, index) => {
    let newItem: JSX.Element = <>{item[0]}</>;
    if (item.length !== 1) {
      item[1].forEach(item => {
        switch (item[0]) {
          case "b":
            newItem = <b key={index}>{newItem}</b>;
            break;
          case "i":
            newItem = <em key={index}>{newItem}</em>;
            break;
          case "s":
            newItem = <s key={index}>{newItem}</s>;
            break;
          case "a":
            newItem = (
              <a className="notion-link" href={item[1]} key={index}>
                {newItem}
              </a>
            );
            break;
          case "c":
            newItem = (
              <code className="notion-inline-code" key={index}>
                {newItem}
              </code>
            );
            break;
          case "h":
            newItem = <span className={item[1]}>{newItem}</span>;
        }
      });
    }
    return newItem;
  });
};

interface BlockRenderer {
  block: LoadPageChunkData["recordMap"]["block"][""];
  level: number;
}

export const BlockRenderer: React.FC<BlockRenderer> = props => {
  const { block } = props;
  switch (block.value.type) {
    case "page":
      return null;
    case "header":
      if (!block.value.properties) return null;
      return (
        <h1 className="notion-h1">
          <>{applyDecorator(block.value.properties.title)}</>
        </h1>
      );
    case "sub_header":
      if (!block.value.properties) return null;
      return (
        <h2 className="notion-h2">
          <>{applyDecorator(block.value.properties.title)}</>
        </h2>
      );
    case "sub_sub_header":
      if (!block.value.properties) return null;
      return (
        <h3 className="notion-h3">
          <>{applyDecorator(block.value.properties.title)}</>
        </h3>
      );
    case "column_list":
      return null;
    case "quote":
      if (!block.value.properties) return null;
      return (
        <blockquote className="notion-quote">
          <>{applyDecorator(block.value.properties.title)}</>
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
          <>{applyDecorator(block.value.properties.title)}</>
        </p>
      );
    case "bulleted_list":
    case "numbered_list":
      if (!block.value.properties) return null;
      return (
        <li className={``}>
          <>{applyDecorator(block.value.properties.title)}</>
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
      console.log("Unsupported type " + block.value.type);
      return <div />;
  }
  return null;
};

interface ChildRendererProps {
  blockMap: LoadPageChunkData["recordMap"]["block"];
  level: number;
  ids: string[];
}

export const ChildRenderer: React.FC<ChildRendererProps> = props => {
  const { ids, blockMap } = props;

  let idArray = [];
  let bulletArray = [];
  let orderedArray = [];

  for (let i = 0; i < ids.length; i++) {
    const currentId = ids[i];
    if (!(currentId in blockMap)) continue;
    const currentBlock = blockMap[currentId];
    if (currentBlock.value.type === "bulleted_list") {
      bulletArray.push(
        <NotionRenderer
          level={props.level + 1}
          currentID={ids[i]}
          blockMap={blockMap}
        />
      );
    } else if (currentBlock.value.type === "numbered_list") {
      orderedArray.push(
        <NotionRenderer
          level={props.level + 1}
          currentID={ids[i]}
          blockMap={blockMap}
        />
      );
    } else if (currentBlock.value.type === "column_list") {
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
      const spacerTotalWith = (idArray.length - 1) * spacerWith;
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
    currentBlock.value.type === "page" && props.level > 0
  );

  return (
    <>
      <BlockRenderer level={props.level} block={currentBlock} />
      {currentBlock.value.content && renderChildren && (
        <ChildRenderer
          level={props.level}
          ids={currentBlock.value.content}
          blockMap={props.blockMap}
        />
      )}
    </>
  );
};
