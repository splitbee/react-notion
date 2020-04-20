import * as React from "react";
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
    display_source,
    block_aspect_ratio,
    block_height,
    block_width
  } = format;

  if (type === "embed" || type === "video") {
    return (
      <div
        style={{
          paddingBottom: `${(block_aspect_ratio || block_height / block_width) *
            100}%`,
          position: "relative"
        }}
      >
        <iframe className="notion-image-inset" src={display_source} />
      </div>
    );
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
            paddingBottom: `${block_aspect_ratio * 100}%`,
            position: "relative"
          }}
        >
          <img className="notion-image-inset" alt={caption} src={src} />
        </div>
      );
    } else {
      return <img alt={caption} src={src} />;
    }
  }

  return null;
};

export default Asset;
