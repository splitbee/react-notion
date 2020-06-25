import React from "react";
import mediumZoom from "medium-zoom";
import { BlockMapType, MapPageUrl, MapImageUrl } from "./types";
import { Block } from "./block";
import { defaultMapImageUrl, defaultMapPageUrl } from "utils";

export interface NotionRendererProps {
  blockMap: BlockMapType;
  fullPage?: boolean;
  mapPageUrl?: MapPageUrl;
  mapImageUrl?: MapImageUrl;

  currentId?: string;
  level?: number;
  zoom?: any;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
  currentId,
  mapPageUrl = defaultMapPageUrl,
  mapImageUrl = defaultMapImageUrl,
  ...props
}) => {
  const { blockMap } = props;
  const id = currentId || Object.keys(blockMap)[0];
  const currentBlock = blockMap[id];

  if (!currentBlock) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("error rendering block", currentId);
    }
    return null;
  }

  const zoom =
    props.zoom ||
    (typeof window !== "undefined" &&
      mediumZoom({
        container: ".notion",
        background: "rgba(0, 0, 0, 0.8)",
        margin: getMediumZoomMargin()
      }));

  return (
    <Block
      key={id}
      level={level}
      block={currentBlock}
      zoom={zoom}
      mapPageUrl={mapPageUrl}
      mapImageUrl={mapImageUrl}
      {...props}
    >
      {currentBlock?.value?.content?.map(contentId => (
        <NotionRenderer
          key={contentId}
          currentId={contentId}
          level={level + 1}
          zoom={zoom}
          mapPageUrl={mapPageUrl}
          mapImageUrl={mapImageUrl}
          {...props}
        />
      ))}
    </Block>
  );
};

function getMediumZoomMargin() {
  const width = window.innerWidth;

  if (width < 500) {
    return 8;
  } else if (width < 800) {
    return 20;
  } else if (width < 1280) {
    return 30;
  } else if (width < 1600) {
    return 40;
  } else if (width < 1920) {
    return 48;
  } else {
    return 72;
  }
}
