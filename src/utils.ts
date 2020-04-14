import { BaseTextValueType, LoadPageChunkData, DecorationType } from "./types";

const getTextContent = (text: DecorationType[]) => {
  return text.reduce((prev, current) => prev + current[0], "");
};

export const getTitle = (
  blockMap: LoadPageChunkData["recordMap"]["block"],
  id: string
) => {
  const currentBlock = blockMap[id];
  if (currentBlock.value.type === "page" && currentBlock.value.properties) {
    return currentBlock.value.properties.title[0][0];
  } else return "";
};

export const getDescription = (
  blockMap: LoadPageChunkData["recordMap"]["block"],
  id: string,
  level: number
): string | false => {
  const currentBlock = blockMap[id];
  const type = currentBlock.value.type;
  if (
    type === "bulleted_list" ||
    type === "text" ||
    type === "quote" ||
    type === "numbered_list"
  ) {
    const value = currentBlock.value as BaseTextValueType;
    if (value.properties?.title) return getTextContent(value.properties.title);
  }

  if (
    currentBlock.value.content &&
    currentBlock.value.content.length > 0 &&
    !(currentBlock.value.type === "page" && level > 0)
  ) {
    for (let i = 0; i < currentBlock.value.content.length; i++) {
      const value = getDescription(
        blockMap,
        currentBlock.value.content[i],
        level + 1
      );
      if (value) return value;
    }
  }

  return false;
};
