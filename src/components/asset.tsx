import * as React from "react";
import { BlockType, ContentValueType, MapImageUrl } from "../types";

const types = ["video", "image", "embed", "figma"];

const Asset: React.FC<{
  block: BlockType;
  mapImageUrl: MapImageUrl;
}> = ({ block, mapImageUrl }) => {
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

  const aspectRatio = block_aspect_ratio || block_height / block_width;

  if (type === "embed" || type === "video" || type === "figma") {
    return (
      <div
        style={{
          paddingBottom: `${aspectRatio * 100}%`,
          position: "relative"
        }}
      >
        <iframe
          className="notion-image-inset"
          src={type === "figma" ? value.properties.source[0][0] : display_source}
        />
      </div>
    );
  }

  const src = mapImageUrl(value.properties.source[0][0]);

  if (type === "image") {
    const caption = value.properties.caption?.[0][0];

    if (block_aspect_ratio) {
      return (
        <div
          style={{
            paddingBottom: `${aspectRatio * 100}%`,
            position: "relative"
          }}
        >
          <img
            className="notion-image-inset"
            alt={caption || "notion image"}
            src={src}
          />
        </div>
      );
    } else {
      return <img alt={caption} src={src} />;
    }
  }

  return null;
};

export default Asset;
