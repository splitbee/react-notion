import React from "react";
import { BlockMapType } from "./types";
import { Block, MapPageUrl } from "./block";

export interface NotionRendererProps {
  blockMap: BlockMapType;
  currentId?: string;
  level?: number;
  mapPageUrl?: MapPageUrl;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
  currentId,
  blockMap,
  mapPageUrl
}) => {
  const id = currentId || Object.keys(blockMap)[0];
  const currentBlock = blockMap[id];
  if (!currentBlock) return null;
  const parentBlock = blockMap[currentBlock.value.parent_id];
  return (
    <Block
      key={id}
      level={level}
      block={currentBlock}
      parentBlock={parentBlock}
      mapPageUrl={mapPageUrl}
    >
      {currentBlock?.value?.content?.map(contentId => (
        <NotionRenderer
          key={contentId}
          currentId={contentId}
          blockMap={blockMap}
          level={level + 1}
          mapPageUrl={mapPageUrl}
        />
      ))}
    </Block>
  );
};
