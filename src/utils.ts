import { DecorationType, BlockMapType, LinkTargetType } from "./types";

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
      const blockType = blockMap[blockId]?.value.type;

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

export const toNotionImageUrl = (url: string) => {
  return `https://notion.so${
    url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
  }`;
};

export const getLinkTargetProps = (
  link: string,
  linkTarget: LinkTargetType = "_self"
) => {
  const targetBlank = {
    target: "_blank"
  };

  if (linkTarget === "_blank") {
    return targetBlank;
  }

  if (linkTarget === "_self" || !linkTarget.host) {
    return;
  }

  const parsedLink = new URL(link);

  if (linkTarget.host !== parsedLink.host) {
    return targetBlank;
  }

  return;
};
