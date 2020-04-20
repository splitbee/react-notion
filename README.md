![react-notion](https://user-images.githubusercontent.com/1440854/79684011-6c948280-822e-11ea-9e23-1644903796fb.png)

A renderer for Notion pages. It is written in TypeScript. Use Notion as CMS for your blog, documentation or personal site, while we wait for the official API.

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

// Load Notion Data from JSON file. Can be replaced with API call.
import response from "./load-page-chunk-response.json";
const blockMap = response.recordMap.block;

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
- [x] Code Blocks

Missing

- [ ] Checkboxes
- [ ] Toggle Lists
- [ ] Tables

## Sites using react-notion

- [PS Tunnel](https://pstunnel.com/blog)
- [Splitbee](https://splitbee.io/blog)

## Credits

- [Timo Lins](https://timo.sh) – Helped building this package
- [samwightt](https://github.com/samwightt) – Inspiration & API Typings
