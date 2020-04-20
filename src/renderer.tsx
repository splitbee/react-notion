/**
 * Chorale: A blazing fast Notion page renderer.
 * Copyright (C) 2020 Sam Wight
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from "react";
import { BlockMapType } from "./types";
import { Block } from "./block";

interface NotionRendererProps {
  blockMap: BlockMapType;
  currentId?: string;
  level?: number;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
  currentId,
  blockMap,
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
      {currentBlock?.value?.content?.map((contentId) => (
        <NotionRenderer
          key={contentId}
          currentId={contentId}
          blockMap={blockMap}
          level={level + 1}
        />
      ))}
    </Block>
  );
};
