import React from "react";
import { BlockMapType, MapPageUrl, MapImageUrl } from "./types";
import { Block } from "./block";
import { defaultMapImageUrl, defaultMapPageUrl } from "./utils";

export interface NotionRendererProps {
  blockMap: BlockMapType;

  mapPageUrl?: MapPageUrl;
  mapImageUrl?: MapImageUrl;

  fullPage?: boolean;
  hideHeader?: boolean;
  darkMode?: boolean;

  className?: string;
  bodyClassName?: string;

  currentId?: string;
  level?: number;
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

  return (
    <Block
      key={id}
      level={level}
      block={currentBlock}
      mapPageUrl={mapPageUrl}
      mapImageUrl={mapImageUrl}
      {...props}
    >
      {currentBlock?.value?.content?.map(contentId => (
        <NotionRenderer
          key={contentId}
          currentId={contentId}
          level={level + 1}
          mapPageUrl={mapPageUrl}
          mapImageUrl={mapImageUrl}
          {...props}
        />
      ))}
    </Block>
  );
};
