![react-notion](https://user-images.githubusercontent.com/1440854/79683820-e4fa4400-822c-11ea-9ffb-f4d185b57ca8.png)

An (unofficial) React renderer for Notion pages. It is written in TypeScript. Use it for blogs, documentations or personal sites, while we wait for the official API.

This packages does not include an API wrapper. You can find some interesting projects here: [notionapi-agent](https://github.com/dragonman225/notionapi-agent)

## Install

```bash
npm install react-notion
```

## How to use

```js
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";

import "prismjs/themes/prism-tomorrow.css"; // only needed if you use Code Blocks

export default () => (
  <div style={{ maxWidth: 768 }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);
```

A working example, built with Next.js, can be found inside the `example` directory.

## Currently supported block types:

- [x] Text
- [x] Headings
- [x] Images
- [x] Quotes
- [x] Bulleted Lists
- [x] Numbered Lists
- [x] Links
- [x] Columns
- [x] iFrames
- [x] Videos
- [x] Divider
- [x] Callout
- [x] Image Captions

Missing

- [ ] Checkboxes
- [ ] Toggle Lists

## Detailed Guide

Can be found on the Splitbee Blog - [Notion as a CMS using Next.JS](https://splitbee.io/blog/notion-as-cms-using-nextjs)

## Credits

- [Timo Lins](https://timo.sh) – Helped building this package
- [samwightt](https://github.com/samwightt) – Inspiration & API Typings
