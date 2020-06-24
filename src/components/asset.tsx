import * as React from "react";
import { BlockType, ContentValueType } from "../types";
import { toNotionImageUrl } from "../utils";

const types = ["video", "image", "embed"];

const Asset: React.FC<{ block: BlockType; zoom?: any }> = ({ block, zoom }) => {
  const zoomRef = React.useRef(zoom ? zoom.clone() : null);
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

  if (type === "embed" || type === "video") {
    return (
      <div
        style={{
          paddingBottom: `${aspectRatio * 100}%`,
          position: "relative"
        }}
      >
        <iframe className="notion-image-inset" src={display_source} />
      </div>
    );
  }

  const src = toNotionImageUrl(value.properties.source[0][0]);

  function attachZoom(image: any) {
    if (zoomRef.current) {
      (zoomRef.current as any).attach(image);
    }
  }

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
            ref={attachZoom}
          />
        </div>
      );
    } else {
      return <img alt={caption} src={src} ref={attachZoom} />;
    }
  }

  return null;
};

export default Asset;
