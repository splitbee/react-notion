import * as React from "react";
import {
  BlockType,
  PageValueType,
  BlockValueType,
  CalloutValueType
} from "../types";
import { toNotionImageUrl, getTextContent, classNames } from "../utils";

const isIconBlock = (
  value: BlockValueType
): value is PageValueType | CalloutValueType => {
  return value.type === "page" || value.type === "callout";
};

interface AssetProps {
  block: BlockType;
  big?: boolean;
  className?: string;
}

const PageIcon: React.FC<AssetProps> = ({ block, className, big }) => {
  if (!isIconBlock(block.value)) {
    return null;
  }
  const icon = block.value.format.page_icon;
  const title = block.value.properties?.title;

  if (icon?.includes("http")) {
    return (
      <img
        className={classNames(
          className,
          big ? "notion-page-icon-cover" : "notion-page-icon"
        )}
        src={toNotionImageUrl(icon)}
        alt={title ? getTextContent(title) : "Icon"}
      />
    );
  } else {
    return (
      <span
        className={classNames(
          className,
          big ? "notion-page-icon-cover" : "notion-page-icon"
        )}
        role="image"
        aria-label={icon}
      >
        {icon}
      </span>
    );
  }
};

export default PageIcon;
