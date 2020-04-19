import * as React from "react";
import { CSSProperties } from "react";
import { BlockType, ContentValueType } from "../types";

const types = ["video", "image", "embed"];

const Asset: React.FC<{ block: BlockType }> = ({ block }) => {
  const value = block.value as ContentValueType;
  const type = block.value.type;

  if (!types.includes(type)) {
    return null;
  }

  const format = value.format;
  const {
    block_width,
    block_height,
    display_source,
    block_aspect_ratio
  } = format;

  const isImage = type === "image";

  const style: CSSProperties = {
    maxWidth: "100%",
    border: "none",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: block_width,
    ...(!isImage && { height: block_height })
  };

  if (type === "embed") {
    return <iframe style={style} src={display_source} />;
  }

  const src = `https://notion.so/image/${encodeURIComponent(
    value.properties.source[0][0]
  )}`;

  if (type === "image") {
    const caption = value.properties.caption?.[0][0];
    if (block_aspect_ratio) {
      return (
        <div
          style={{
            ...style,
            paddingBottom: `${block_aspect_ratio * 100}%`,
            position: "relative"
          }}
        >
          <img className="notion-image-inset" alt={caption} src={src} />
        </div>
      );
    } else {
      return <img style={style} alt={caption} src={src} />;
    }
  }

  if (type === "video") {
    return <video style={style} src={src} />;
  }

  return null;
};

export default Asset;
