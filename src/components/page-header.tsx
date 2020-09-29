import * as React from "react";

import { BlockMapType, MapPageUrl, MapImageUrl } from "../types";
import PageIcon from "./page-icon";

interface PageHeaderProps {
  blockMap: BlockMapType;
  mapPageUrl: MapPageUrl;
  mapImageUrl: MapImageUrl;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  blockMap,
  mapPageUrl,
  mapImageUrl
}) => {
  const blockIds = Object.keys(blockMap);
  const activePageId = blockIds[0];

  if (!activePageId) {
    return null;
  }

  const breadcrumbs = [];
  let currentPageId = activePageId;

  do {
    const block = blockMap[currentPageId];
    if (!block || !block.value) {
      break;
    }

    const title = block.value.properties?.title[0][0];
    const icon = (block.value as any).format?.page_icon;

    if (!(title || icon)) {
      break;
    }

    breadcrumbs.push({
      block,
      active: currentPageId === activePageId,
      pageId: currentPageId,
      title,
      icon
    });

    const parentId = block.value.parent_id;

    if (!parentId) {
      break;
    }

    currentPageId = parentId;
  } while (true);

  breadcrumbs.reverse();

  return (
    <header className="notion-page-header">
      <div className="notion-nav-breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.pageId}>
            <a
              className={`notion-nav-breadcrumb ${
                breadcrumb.active ? "notion-nav-breadcrumb-active" : ""
              }`}
              href={
                breadcrumb.active ? undefined : mapPageUrl(breadcrumb.pageId)
              }
            >
              {breadcrumb.icon && (
                <PageIcon
                  className="notion-nav-icon"
                  block={breadcrumb.block}
                  mapImageUrl={mapImageUrl}
                />
              )}

              {breadcrumb.title && (
                <span className="notion-nav-title">{breadcrumb.title}</span>
              )}
            </a>

            {index < breadcrumbs.length - 1 && (
              <span className="notion-nav-spacer">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default PageHeader;
