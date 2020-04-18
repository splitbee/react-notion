# react-notion

Renders your Notion blocks with ease.

## Install

```bash
npm install react-notion
```

If you use code blocks and want syntax highlighting, install `primsjs`.

```bash
npm install prismjs
```

## How to use

```js
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";

import "prismjs/themes/prism-tomorrow.css"; // only needed if you use Code Blocks
```

### Example

```js
const Page = ({ page }) => {
  if (!page) return null;

  return (
    <div className="notion" style={{ maxWidth: 768, color: "rgb(55, 53, 47)" }}>
      <NotionRenderer blockMap={blockMap} />
    </div>
  );
};
export default Page;
```

Example Next.JS using react-notion can be found in folder `/example`

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
- [x] Callouts
- [x] Image Captions

Missing

- [ ] Checkboxes
- [ ] Toggle Lists
