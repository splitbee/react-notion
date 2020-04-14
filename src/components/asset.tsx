import * as React from "react";
import { CSSProperties } from "react";
import { BlockType, ContentValueType } from "../types";

const types = ["video", "image", "embed"];

const Asset: React.FC<{ block: BlockType }> = ({ block }) => {
  const value = block.value as ContentValueType;
  const type = block.value.type;
  if (types.includes(type)) {
    const { id } = value;
    const format = (block.value as any).format;
    const {
      block_width,
      block_height,
      display_source,
      block_aspect_ratio
    } = format;

    const isImage = type === "image";
    const Comp = isImage ? "img" : "video";

    const useWrapper = block_aspect_ratio && !block_height;

    const childStyle: CSSProperties = {
      maxWidth: "100%",
      width: block_width,
      ...(!isImage && { height: block_height }),
      border: "none",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    };

    let child = null;

    if (!isImage) {
      child = (
        <iframe
          style={childStyle}
          src={display_source}
          key={!useWrapper ? id : undefined}
          className={!useWrapper ? "asset-wrapper" : undefined}
        />
      );
    } else {
      child = (
        <Comp
          key={!useWrapper ? id : undefined}
          src={`https://notion.so/image/${encodeURIComponent(
            value.properties.source[0][0]
          )}`}
          controls={!isImage}
          alt={`An ${isImage ? "image" : "video"} from Splitbee`}
          loop={!isImage}
          muted={!isImage}
          autoPlay={!isImage}
          style={childStyle}
        />
      );
    }
    return child;
  }
  return null;
};

export default Asset;
