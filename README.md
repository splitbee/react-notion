# react-notion

Renders your Notion blocks with ease.

## Install

```bash
npm install react-notion

// if you use code blocks with syntax highlighting
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
      <NotionRenderer
        level={0}
        blockMap={page.blocks || []}
        currentID={page.id}
      />
    </div>
  );
};
export default Page;
```

## Currently supported block types:

- [x] Text
- [x] Headings
- [x] Images
- [x] Quotes
- [x] Bulleted Lists
- [x] Links
- [x] Columns
- [x] iFrames
- [x] Videos
- [x] Divider

Missing

- [ ] Checkboxes
- [ ] Callouts
- [ ] Image Captions
- [ ] Numbered Lists
- [ ] Toggle Lists


Thanks for the prior of work by ![samwightt](https://github.com/samwightt) (child rendering algorithm)
