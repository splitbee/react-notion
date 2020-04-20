import { NotionRenderer, BlockMapType } from "react-notion";
import pageData from "../mock/page.json";

const blockMap = pageData.recordMap.block as BlockMapType;

const Home = () => (
  <div
    style={{
      maxWidth: 708,
      margin: "0 auto",
      padding: "0 8px",
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`
    }}
  >
    <NotionRenderer blockMap={blockMap} />
  </div>
);

export default Home;
