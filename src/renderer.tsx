import React from "react";
import { BlockMapType } from "./types";
import { Block, MapPageUrl } from "./block";

export interface NotionRendererProps {
  blockMap: BlockMapType;
  mapPageUrl?: MapPageUrl;
  fullPage?: boolean;

  currentId?: string;
  level?: number;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
  currentId,
  ...props
}) => {
  const { blockMap } = props;
  const id = currentId || Object.keys(blockMap)[0];
  const currentBlock = blockMap[id];

  if (!currentBlock) return null;

  return (
    <Block key={id} level={level} block={currentBlock} {...props}>
      {currentBlock?.value?.content?.map(contentId => (
        <NotionRenderer
          key={contentId}
          currentId={contentId}
          level={level + 1}
          {...props}
        />
      ))}
    </Block>
  );
};
