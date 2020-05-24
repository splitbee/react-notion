import React from "react";
import { BlockMapType } from "./types";
import { Block, MapPageUrl } from "./block";

import { getListNumber } from "./utils";

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
  const parentBlock = blockMap[currentBlock.value.parent_id];

  if (!currentBlock) return null;

  const listNumber =
    currentBlock.value.type === "numbered_list" &&
    parentBlock.value.type !== "numbered_list"
      ? getListNumber(id, blockMap)
      : undefined;

  return (
    <Block
      key={id}
      level={level}
      block={currentBlock}
      listNumber={listNumber}
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
