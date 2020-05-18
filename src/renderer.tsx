import React from "react";
import { BlockMapType } from "./types";
import { Block } from "./block";
import { reduceBlockGroups, BlockGroup } from "./utils";

interface NotionRendererProps {
  blockMap: BlockMapType;
  currentId?: string;
  level?: number;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
  currentId,
  blockMap
}) => {
  const id = currentId || Object.keys(blockMap)[0];
  const currentBlock = blockMap[id];
  const parentBlock = blockMap[currentBlock.value.parent_id];

  return (
    <Block
      key={id}
      level={level}
      block={currentBlock}
      parentBlock={parentBlock}
    >
      {currentBlock?.value?.content
        ?.reduce<Array<string | BlockGroup>>(
          reduceBlockGroups(blockMap, level),
          []
        )
        .map(contentIdOrGroup =>
          typeof contentIdOrGroup === "string" ? (
            <NotionRenderer
              key={contentIdOrGroup}
              currentId={contentIdOrGroup}
              blockMap={blockMap}
              level={level + 1}
            />
          ) : (
            <contentIdOrGroup.wrapper>
              {contentIdOrGroup.blockIds.map(contentId => (
                <NotionRenderer
                  key={contentId}
                  currentId={contentId}
                  blockMap={blockMap}
                  level={level + 1}
                />
              ))}
            </contentIdOrGroup.wrapper>
          )
        )}
    </Block>
  );
};
