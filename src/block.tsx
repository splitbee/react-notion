import * as React from "react";
import {
  DecorationType,
  BlockType,
  ContentValueType,
  BlockMapType,
  MapPageUrl,
  MapImageUrl
} from "./types";
import Asset from "./components/asset";
import Code from "./components/code";
import PageIcon from "./components/page-icon";
import PageHeader from "./components/page-header";
import { classNames, getTextContent, getListNumber } from "./utils";

export const renderChildText = (properties: DecorationType[]) => {
  return properties?.map(([text, decorations], i) => {
    if (!decorations) {
      return <React.Fragment key={i}>{text}</React.Fragment>;
    }

    return decorations.reduceRight((element, decorator) => {
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
  level: number;
  blockMap: BlockMapType;

  mapPageUrl: MapPageUrl;
  mapImageUrl: MapImageUrl;

  fullPage?: boolean;
  hideHeader?: boolean;
  darkMode?: boolean;

  className?: string;
  bodyClassName?: string;
}

export const Block: React.FC<Block> = props => {
  const {
    block,
    children,
    level,
    fullPage,
    hideHeader,
    darkMode,
    blockMap,
    mapPageUrl,
    mapImageUrl,
    className,
    bodyClassName
  } = props;
  const blockValue = block?.value;

  switch (blockValue?.type) {
    case "page":
      if (level === 0) {
        if (fullPage) {
          if (!blockValue.properties) {
            return null;
          }

          const {
            page_icon,
            page_cover,
            page_cover_position,
            page_full_width,
            page_small_text
          } = blockValue.format || {};

          const coverPosition = (1 - (page_cover_position || 0.5)) * 100;

          return (
            <div
              className={classNames(
                "notion",
                "notion-app",
                darkMode && "notion-dark",
                className
              )}
            >
              <div className="notion-cursor-listener">
                <div className="notion-frame">
                  {!hideHeader && (
                    <PageHeader
                      blockMap={blockMap}
                      mapPageUrl={mapPageUrl}
                      mapImageUrl={mapImageUrl}
                    />
                  )}

                  <div className="notion-scroller">
                    {page_cover && (
                      <img
                        src={mapImageUrl(page_cover)}
                        alt={getTextContent(blockValue.properties.title)}
                        className="notion-page-cover"
                        style={{
                          objectPosition: `center ${coverPosition}%`
                        }}
                      />
                    )}
                    <main
                      className={classNames(
                        "notion-page",
                        !page_cover && "notion-page-offset",
                        page_full_width && "notion-full-width",
                        page_small_text && "notion-small-text",
                        bodyClassName
                      )}
                    >
                      {page_icon && (
                        <PageIcon
                          className={
                            page_cover ? "notion-page-icon-offset" : undefined
                          }
                          block={block}
                          big
                          mapImageUrl={mapImageUrl}
                        />
                      )}

                      <div className="notion-title">
                        {renderChildText(blockValue.properties.title)}
                      </div>

                      {children}
                    </main>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <main
              className={classNames(
                "notion",
                darkMode && "notion-dark",
                className,
                bodyClassName
              )}
            >
              {children}
            </main>
          );
        }
      } else {
        if (!blockValue.properties) return null;
        return (
          <a className="notion-page-link" href={mapPageUrl(blockValue.id)}>
            {blockValue.format && (
              <div className="notion-page-icon">
                <PageIcon block={block} mapImageUrl={mapImageUrl} />
              </div>
            )}
            <div className="notion-page-text">
              {renderChildText(blockValue.properties.title)}
            </div>
          </a>
        );
      }
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
      return <hr className="notion-hr" />;
    case "text":
      if (!blockValue.properties) {
        return <div className="notion-blank">&nbsp;</div>;
      }
      const blockColor = blockValue.format?.block_color;
      return (
        <p
          className={classNames(
            `notion-text`,
            blockColor && `notion-${blockColor}`
          )}
        >
          {renderChildText(blockValue.properties.title)}
        </p>
      );
    case "bulleted_list":
    case "numbered_list":
      const wrapList = (content: React.ReactNode, start?: number) =>
        blockValue.type === "bulleted_list" ? (
          <ul className="notion-list notion-list-disc">{content}</ul>
        ) : (
          <ol start={start} className="notion-list notion-list-numbered">
            {content}
          </ol>
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

      const isTopLevel =
        block.value.type !== blockMap[block.value.parent_id].value.type;
      const start = getListNumber(blockValue.id, blockMap);

      return isTopLevel ? wrapList(output, start) : output;

    case "image":
    case "embed":
    case "video":
      const value = block.value as ContentValueType;

      return (
        <figure
          className="notion-asset-wrapper"
          style={{ width: value.format.block_width }}
        >
          <Asset block={block} mapImageUrl={mapImageUrl} />

          {value.properties.caption && (
            <figcaption className="notion-image-caption">
              {renderChildText(value.properties.caption)}
            </figcaption>
          )}
        </figure>
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
    case "collection_view":
      if (!block) return null;

      const collectionView = block?.collection?.types[0];

      return (
        <div>
          <h3 className="notion-h3">
            {renderChildText(block.collection?.title!)}
          </h3>

          {collectionView?.type === "table" && (
            <div style={{ maxWidth: "100%", marginTop: 5 }}>
              <table className="notion-table">
                <thead>
                  <tr className="notion-tr">
                    {collectionView.format?.table_properties
                      ?.filter(p => p.visible)
                      .map((gp, index) => (
                        <th
                          className="notion-th"
                          key={index}
                          style={{ minWidth: gp.width }}
                        >
                          {block.collection?.schema[gp.property]?.name}
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody>
                  {block?.collection?.data.map((row, index) => (
                    <tr className="notion-tr" key={index}>
                      {collectionView.format?.table_properties
                        ?.filter(p => p.visible)
                        .map((gp, index) => (
                          <td
                            key={index}
                            className={
                              "notion-td " +
                              (gp.property === "title" ? "notion-bold" : "")
                            }
                          >
                            {
                              renderChildText(
                                row[
                                  block.collection?.schema[gp.property]?.name!
                                ]
                              )!
                            }
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {collectionView?.type === "gallery" && (
            <div className="notion-gallery">
              {block.collection?.data.map((row, i) => (
                <div key={`col-${i}`} className="notion-gallery-card">
                  <div className="notion-gallery-content">
                    {collectionView.format?.gallery_properties
                      ?.filter(p => p.visible)
                      .map((gp, idx) => (
                        <p
                          key={idx + "item"}
                          className={
                            "notion-gallery-data " +
                            (idx === 0 ? "is-first" : "")
                          }
                        >
                          {getTextContent(
                            row[block.collection?.schema[gp.property].name!]
                          )}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    case "callout":
      return (
        <div
          className={classNames(
            "notion-callout",
            blockValue.format.block_color &&
              `notion-${blockValue.format.block_color}_co`
          )}
        >
          <div>
            <PageIcon block={block} mapImageUrl={mapImageUrl} />
          </div>
          <div className="notion-callout-text">
            {renderChildText(blockValue.properties.title)}
          </div>
        </div>
      );
    case "bookmark":
      const link = blockValue.properties.link;
      const title = blockValue.properties.title ?? link;
      const description = blockValue.properties.description;
      const block_color = blockValue.format?.block_color;
      const bookmark_icon = blockValue.format?.bookmark_icon;
      const bookmark_cover = blockValue.format?.bookmark_cover;

      return (
        <div className="notion-row">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              "notion-bookmark",
              block_color && `notion-${block_color}`
            )}
            href={link[0][0]}
          >
            <div>
              <div className="notion-bookmark-title">
                {renderChildText(title)}
              </div>
              {description && (
                <div className="notion-bookmark-description">
                  {renderChildText(description)}
                </div>
              )}

              <div className="notion-bookmark-link">
                {bookmark_icon && (
                  <img src={bookmark_icon} alt={getTextContent(title)} />
                )}
                <div>{renderChildText(link)}</div>
              </div>
            </div>
            {bookmark_cover && (
              <div className="notion-bookmark-image">
                <img src={bookmark_cover} alt={getTextContent(title)} />
              </div>
            )}
          </a>
        </div>
      );
    case "toggle":
      return (
        <details className="notion-toggle">
          <summary>{renderChildText(blockValue.properties.title)}</summary>
          <div>{children}</div>
        </details>
      );
    default:
      if (process.env.NODE_ENV !== "production") {
        console.log("Unsupported type " + block?.value?.type);
      }
      return <div />;
  }
  return null;
};
