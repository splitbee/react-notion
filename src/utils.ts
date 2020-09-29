import { DecorationType, BlockMapType, MapImageUrl } from "./types";

export const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(a => !!a).join(" ");

export const getTextContent = (text: DecorationType[]) => {
  return text.reduce((prev, current) => prev + current[0], "");
};

const groupBlockContent = (blockMap: BlockMapType): string[][] => {
  const output: string[][] = [];

  let lastType: string | undefined = undefined;
  let index = -1;

  Object.keys(blockMap).forEach(id => {
    blockMap[id].value.content?.forEach(blockId => {
      const blockType = blockMap[blockId]?.value?.type;

      if (blockType && blockType !== lastType) {
        index++;
        lastType = blockType;
        output[index] = [];
      }

      output[index].push(blockId);
    });

    lastType = undefined;
  });

  return output;
};

export const getListNumber = (blockId: string, blockMap: BlockMapType) => {
  const groups = groupBlockContent(blockMap);
  const group = groups.find(g => g.includes(blockId));

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
};

export const defaultMapImageUrl: MapImageUrl = (image = "", block) => {
  const url = new URL(
    `https://www.notion.so${
      image.startsWith("/image") ? image : `/image/${encodeURIComponent(image)}`
    }`
  );

  if (block && !image.includes("/images/page-cover/")) {
    const table =
      block.value.parent_table === "space" ? "block" : block.value.parent_table;
    url.searchParams.set("table", table);
    url.searchParams.set("id", block.value.id);
    url.searchParams.set("cache", "v2");
  }

  return url.toString();
};

export const defaultMapPageUrl = (pageId: string = "") => {
  pageId = pageId.replace(/-/g, "");

  return `/${pageId}`;
};
