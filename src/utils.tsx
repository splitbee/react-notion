import { DecorationType, BlockValueType, BlockMapType } from "./types";
import React, { ComponentType } from "react";

export const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(a => !!a).join(" ");

export const getTextContent = (text: DecorationType[]) => {
  return text.reduce((prev, current) => prev + current[0], "");
};

export interface BlockGroup {
  type: BlockValueType["type"];
  wrapper: string | ComponentType;
  blockIds: string[];
  level: number;
}

const groupedTypes = ["bulleted_list", "numbered_list"];
export const reduceBlockGroups = (blockMap: BlockMapType, level: number) => (
  contentIdList: Array<string | BlockGroup>,
  currentId: string
) => {
  const currentType = blockMap[currentId]?.value?.type;
  if (!groupedTypes.includes(currentType)) {
    contentIdList.push(currentId);
    return contentIdList;
  }
  let wrapper: ComponentType;
  switch (currentType) {
    case "numbered_list":
      wrapper = (props: any) => (
        <ol className="notion-list notion-list-numbered" {...props} />
      );
      break;
    case "bulleted_list":
      wrapper = (props: any) => (
        <ul className="notion-list notion-list-disc" {...props} />
      );
      break;
    default:
      throw new Error(`Type ${currentType} has no specified wrapper`);
  }

  const lastIdIndex = contentIdList.length - 1;
  if (lastIdIndex < 0 || typeof contentIdList[lastIdIndex] === "string") {
    contentIdList.push({
      type: currentType,
      wrapper,
      blockIds: [currentId],
      level
    });
    return contentIdList;
  }
  const lastContentIdListItem = contentIdList[lastIdIndex] as BlockGroup;

  if (
    lastContentIdListItem.type === currentType &&
    lastContentIdListItem.level === level
  ) {
    lastContentIdListItem.blockIds.push(currentId);
  } else {
    contentIdList.push({
      type: currentType,
      wrapper,
      blockIds: [currentId],
      level
    });
  }
  return contentIdList;
};
