![react-notion](https://user-images.githubusercontent.com/1440854/79684011-6c948280-822e-11ea-9e23-1644903796fb.png)

![npm version](https://badgen.net/npm/v/react-notion) ![npm version](https://badgen.net/david/dep/splitbee/react-notion) ![minzipped sized](https://badgen.net/bundlephobia/minzip/react-notion)

A React renderer for Notion pages.
Use Notion as CMS for your blog, documentation or personal site.

_This packages doesn't handle the communication with the API. Check out [notion-api-worker](https://github.com/splitbee/notion-api-worker) for an easy solution_.

<sub>Created by <a href="https://twitter.com/timolins">Timo Lins</a> & <a href="https://twitter.com/linstobias">Tobias Lins</a> with the help of all <a href="https://github.com/splitbee/react-notion/graphs/contributors">contributors</a> ❤️</sub>

## Features

⚡️ **Fast** – Up to 10x faster than Notion\*

🎯 **Accurate** – Results are _almost_ identical

🔮 **Code Highlighting** – Automatic code highlighting with [prismjs](https://prismjs.com/)

🎨 **Custom Styles** – Styles are easily adaptable. Optional styles included

_\* First Meaningful Paint compared to a [hosted example](http://react-notion-example.now.sh/) on [Vercel](https://vercel.com)._

## Install

```bash
npm install react-notion
```

## How to use

### Minimal Example

We can store the API response in a `.json` file and import it.

```js
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
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

### Next.js Example

In this example we use [Next.js](https://github.com/zeit/next.js) for SSG. We use [notion-api-worker](https://github.com/splitbee/notion-api-worker) to fetch data from the API.

`/pages/my-post.jsx`

```js
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/<NOTION_PAGE_ID>"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
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
- [timo.sh](https://timo.sh) – _[Source](https://github.com/timolins/timo-sh)_

## Supported Blocks

Most common block types are supported. We happily accept pull requests to add support for the missing blocks.

| Block Type        | Supported  | Notes                  |
| ----------------- | ---------- | ---------------------- |
| Text              | ✅ Yes     |                        |
| Heading           | ✅ Yes     |                        |
| Image             | ✅ Yes     |                        |
| Image Caption     | ✅ Yes     |                        |
| Bulleted List     | ✅ Yes     |                        |
| Numbered List     | ✅ Yes     |                        |
| Quote             | ✅ Yes     |                        |
| Callout           | ✅ Yes     |                        |
| Column            | ✅ Yes     |                        |
| iframe            | ✅ Yes     |                        |
| Video             | ✅ Yes     | Only embedded videos   |
| Divider           | ✅ Yes     |                        |
| Link              | ✅ Yes     |                        |
| Code              | ✅ Yes     |                        |
| Web Bookmark      | ✅ Yes     |                        |
| Toggle List       | ✅ Yes     |                        |
| Page Links        | ✅ Yes     |                        |
| Header            | ✅ Yes     | Enable with `fullPage` |
| Databases         | ❌ Missing |                        |
| Checkbox          | ❌ Missing |                        |
| Table Of Contents | ❌ Missing |                        |

## Block Type Specific Caveats

When using a code block in your Notion page, `NotionRenderer` will use `prismjs` to detect the language of the code block.
By default in most project, `prismjs` won't include all language packages in the minified build of your project.
This tends to be an issue for those using `react-notion` in a `next.js` project.
To ensure the programming language is correctly highlighted in production builds, one should explicitly imported into the project.

```jsx
import 'prismjs/components/prism-{language}';
```

## Credits

- [Tobias Lins](https://tobi.sh) – Idea, Code
- [Timo Lins](https://timo.sh) – Code, Documentation
- [samwightt](https://github.com/samwightt) – Inspiration & API Typings
- [All people that contributed 💕](https://github.com/splitbee/react-notion/graphs/contributors)
