/**
 *
 * Copyright (c) 2020, Sam Wight
 * https://github.com/samwightt/chorale-renderer/blob/1e2c1415166e298c1ce72a1a15db927bebf2b5c8/types/notion.ts
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

import { FC } from "react";

/**
 * Base properties that all blocks share.
 */
interface BaseValueType {
  id: string;
  version: number;
  created_time: number;
  last_edited_time: number;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  created_by_table: string;
  created_by_id: string;
  last_edited_by_table: string;
  last_edited_by_id: string;
  space_id?: string;
  properties?: any;
  content?: string[];
}

/**
 * Colors and backgrounds a given block can have in Notion.
 */
export type ColorType =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "teal"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "teal_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";

type BoldFormatType = ["b"];
type ItalicFormatType = ["i"];
type StrikeFormatType = ["s"];
type CodeFormatType = ["c"];
type LinkFormatType = ["a", string];
type ColorFormatType = ["h", ColorType];
type DateFormatType = [
  "d",
  {
    type: "date";
    start_date: string;
    date_format: string;
  }
];
type UserFormatType = ["u", string];
type PageFormatType = ["p", string];
type SubDecorationType =
  | BoldFormatType
  | ItalicFormatType
  | StrikeFormatType
  | CodeFormatType
  | LinkFormatType
  | ColorFormatType
  | DateFormatType
  | UserFormatType
  | PageFormatType;
type BaseDecorationType = [string];
type AdditionalDecorationType = [string, SubDecorationType[]];
export type DecorationType = BaseDecorationType | AdditionalDecorationType;

export interface PageValueType extends BaseValueType {
  type: "page";
  properties?: {
    title: DecorationType[];
  };
  format: {
    page_full_width?: boolean;
    page_small_text?: boolean;
    page_cover_position?: number;
    block_locked?: boolean;
    block_locked_by?: string;
    page_cover?: string;
    page_icon?: string;
  };
  permissions: { role: string; type: string }[];
  file_ids?: string[];
}

export interface BaseTextValueType extends BaseValueType {
  properties?: {
    title: DecorationType[];
  };
  format?: {
    block_color: ColorType;
  };
}

interface BookmarkValueType extends BaseValueType {
  type: "bookmark";
  properties: {
    link: DecorationType[];
    title?: DecorationType[];
    description?: DecorationType[];
  };
  format?: {
    block_color?: string;
    bookmark_icon: string;
    bookmark_cover: string;
  };
}

interface TextValueType extends BaseTextValueType {
  type: "text";
}

interface BulletedListValueType extends BaseTextValueType {
  type: "bulleted_list";
}

interface NumberedListValueType extends BaseTextValueType {
  type: "numbered_list";
}

interface HeaderValueType extends BaseTextValueType {
  type: "header";
}

interface SubHeaderValueType extends BaseTextValueType {
  type: "sub_header";
}

interface SubSubHeaderValueType extends BaseTextValueType {
  type: "sub_sub_header";
}

interface QuoteValueType extends BaseTextValueType {
  type: "quote";
}

interface TodoValueType extends BaseTextValueType {
  type: "to_do";
  properties: {
    title: DecorationType[];
    checked: (["Yes"] | ["No"])[];
  };
}

interface DividerValueType extends BaseValueType {
  type: "divider";
}

interface ColumnListValueType extends BaseValueType {
  type: "column_list";
}

interface ColumnValueType extends BaseValueType {
  type: "column";
  format: {
    column_ratio: number;
  };
}

export interface CalloutValueType extends BaseValueType {
  type: "callout";
  format: {
    page_icon: string;
    block_color: ColorType;
  };
  properties: {
    title: DecorationType[];
  };
}

interface ToggleValueType extends BaseValueType {
  type: "toggle";
  properties: {
    title: DecorationType[];
  };
}

export interface ContentValueType extends BaseValueType {
  properties: {
    source: string[][];
    caption?: DecorationType[];
  };
  format?: {
    block_width: number;
    block_height: number;
    display_source: string;
    block_full_width: boolean;
    block_page_width: boolean;
    block_aspect_ratio: number;
    block_preserve_scale: boolean;
  };
  file_ids?: string[];
}

interface ImageValueType extends ContentValueType {
  type: "image";
}
interface EmbedValueType extends ContentValueType {
  type: "embed";
}

interface FigmaValueType extends ContentValueType {
  type: "figma";
}

interface VideoValueType extends ContentValueType {
  type: "video";
}

interface CodeValueType extends BaseValueType {
  type: "code";
  properties: {
    title: DecorationType[];
    language: DecorationType[];
  };
}
interface CollectionValueType extends ContentValueType {
  type: "collection_view";
}

interface TableGalleryType extends BaseValueType {
  type: "gallery";
  format: {
    gallery_cover: {
      type: "page_cover";
    };
    gallery_cover_aspect: "cover";
    gallery_properties: Array<{ visible: boolean; property: string }>;
  };
}
interface TableCollectionType extends BaseValueType {
  type: "table";
  format: {
    table_wrap: boolean;
    table_properties: Array<{
      visible: boolean;
      property: string;
      width: number;
    }>;
  };
}

export interface TweetType extends BaseValueType {
  type: "tweet";
  properties: {
    source: [string[]];
  };
}

export type CollectionViewType = TableGalleryType | TableCollectionType;

/**
 * The different block values a block can have.
 */
export type BlockValueType =
  | TextValueType
  | PageValueType
  | BulletedListValueType
  | NumberedListValueType
  | HeaderValueType
  | SubHeaderValueType
  | SubSubHeaderValueType
  | TodoValueType
  | DividerValueType
  | ColumnListValueType
  | ColumnValueType
  | QuoteValueType
  | CodeValueType
  | ImageValueType
  | VideoValueType
  | EmbedValueType
  | FigmaValueType
  | CalloutValueType
  | BookmarkValueType
  | ToggleValueType
  | CollectionValueType
  | TweetType;

export type BlockValueTypeKeys = BlockValueType["type"];

export interface BlockType {
  role: string;
  value: BlockValueType;
  collection?: {
    title: DecorationType[];
    types: CollectionViewType[];
    data: Array<{ [key: string]: DecorationType[] }>;
    schema: { [key: string]: { name: string; type: string } };
  };
}

export interface NotionUserType {
  role: string;
  value: {
    id: string;
    version: number;
    email: string;
    given_name: string;
    family_name: string;
    profile_photo: string;
    onboarding_completed: boolean;
    mobile_onboarding_completed: boolean;
  };
}

export type BlockMapType = {
  [key: string]: BlockType;
};

export interface RecordMapType {
  block: BlockMapType;
  notion_user: {
    [key: string]: NotionUserType;
  };
}

export interface LoadPageChunkData {
  recordMap: RecordMapType;
  cursor: {
    stack: any[];
  };
}

export type MapPageUrl = (pageId: string) => string;
export type MapImageUrl = (image: string, block?: BlockType) => string;

export type BlockValueProp<T> = Extract<BlockValueType, { type: T }>;

export interface CustomBlockComponentProps<T extends BlockValueTypeKeys> {
  renderComponent: () => JSX.Element | null;
  blockMap: BlockMapType;
  blockValue: T extends BlockValueType ? BlockValueProp<T> : BaseValueType;
  level: number;
}

export type CustomBlockComponents = {
  [K in BlockValueTypeKeys]?: FC<CustomBlockComponentProps<K>>;
};

type SubDecorationSymbol = SubDecorationType[0];
type SubDecorationValue<T extends SubDecorationSymbol> = Extract<
  SubDecorationType,
  [T, any]
>[1];

export type CustomDecoratorComponentProps<
  T extends SubDecorationSymbol
> = (SubDecorationValue<T> extends never
  ? {}
  : {
      decoratorValue: SubDecorationValue<T>;
    }) & {
  renderComponent: () => JSX.Element | null;
};

export type CustomDecoratorComponents = {
  [K in SubDecorationSymbol]?: FC<CustomDecoratorComponentProps<K>>;
};
