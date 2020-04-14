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

interface PageValueType extends BaseValueType {
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

export interface ContentValueType extends BaseValueType {
  properties: {
    source: string[][];
  };
  format: {
    block_width: number;
    block_height: number;
    display_source: string;
    block_full_width: boolean;
    block_page_width: boolean;
    block_aspect_ratio: number;
    block_preserve_scale: boolean;
  };
  file_ids: string[];
}

interface ImageValueType extends ContentValueType {
  type: "image";
}
interface EmbedValueType extends ContentValueType {
  type: "embed";
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
  | ImageValueType
  | CodeValueType
  | VideoValueType
  | EmbedValueType;

export interface BlockType {
  role: string;
  value: BlockValueType;
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
    onboarding_complete: boolean;
    mobile_onboarding_complete: boolean;
    clipper_onboarding_complete: boolean;
  };
}

export interface RecordMapType {
  block: {
    [key: string]: BlockType;
  };
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
