![react-notion](https://user-images.githubusercontent.com/1440854/79684011-6c948280-822e-11ea-9e23-1644903796fb.png)

![npm version](https://badgen.net/npm/v/react-notion) ![npm version](https://badgen.net/david/dep/splitbee/react-notion) ![minzipped sized](https://badgen.net/bundlephobia/minzip/react-notion)

A React renderer for Notion pages.
Use Notion as CMS for your blog, documentation or personal site.

_This packages doesn't handle the communication with the API._

## Features

⚡️ **Fast** – Up to 10x faster than Notion\*
🎯 **Precise** – Results are _almost_ identical
🔮 **Code Highlighting** – Automatic code highlighting with [prismjs](https://prismjs.com/)
🎨 **Custom Styles** – Styles are easily adaptable. Optional styles included

_\* First Meaningful Paint compared to an example hosted on [ZEIT now](https://zeit.co/now)._

## Install

```bash
npm install react-notion
```

## How to use

#### Minimal Example

We can store the API response in a `.json` file and import it.

```js
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // only needed if you use Code Blocks
import { NotionRenderer } from "react-notion";

import response from "./load-page-chunk-response.json"; // https://www.notion.so/api/v3/loadPageChunk

const blockMap = response.recordMap.block;

export default () => (
  <div style={{ maxWidth: 768 }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);
```

A working example can be found inside the `example` directory.

#### Next.js Example

In this example we use [Next.js](https://github.com/zeit/next.js) for SSG. We use [notionapi-agent](https://github.com/dragonman225/notionapi-agent) to fetch data from the API.

To get your `pageId`, inspect network requests while visiting a public Notion page. It is included in the body of the `POST /api/v3/loadPageChunk` request.

`/pages/my-post.jsx`

```js
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from "react-notion";
import { createAgent } from "notionapi-agent";

const agent = createAgent();

export async function getStaticProps() {
  const pageId = "2e22de6b-770e-4166-be30-1490f6ffd420"; // Your Notion Page ID
  const pageChunk = await agent.loadPageChunk({
    pageId,
    limit: 999,
    chunkNumber: 0,
    cursor: { stack: [] },
    verticalColumns: false
  });

  return {
    props: {
      blockMap: pageChunk.recordMap.block
    }
  };
}

export default ({ blockMap }) => (
  <div style={{ maxWidth: 768 }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);
```

## Sites using react-notion

List of pages that implement this library.

- [PS Tunnel](https://pstunnel.com/blog)
- [Splitbee](https://splitbee.io/blog)

## Supported Blocks

Most common block types are supported. We happily accept new pull requests to add support for the missing blocks.

| Block Type    | Supported  | Notes             |
| ------------- | ---------- | ----------------- |
| Text          | ✅ Yes     |                   |
| Heading       | ✅ Yes     |                   |
| Image         | ✅ Yes     |                   |
| Image Caption | ✅ Yes     |                   |
| Bulleted List | ✅ Yes     |                   |
| Numbered List | ✅ Yes     |                   |
| Quote         | ✅ Yes     |                   |
| Callout       | ✅ Yes     |                   |
| Column        | ✅ Yes     |                   |
| iframe        | ✅ Yes     |                   |
| Video         | ✅ Yes     | Only embed videos |
| Divider       | ✅ Yes     |                   |
| Link          | ✅ Yes     |                   |
| Code          | ✅ Yes     |                   |
| Databases     | ❌ Missing |                   |
| Checkbox      | ❌ Missing |                   |
| Toggle List   | ❌ Missing |                   |
| Web Bookmark  | ❌ Missing |                   |

## Credits

- [Tobias Lins](https://tobi.sh) – Idea, Code
- [Timo Lins](https://timo.sh) – Code, Documentation
- [samwightt](https://github.com/samwightt) – Inspiration & API Typings
