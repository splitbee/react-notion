import { NotionRenderer, LoadPageChunkData } from "react-notion";
import pageData from "../mock/page.json";

const {
  recordMap: { block: blockMap }
} = pageData as LoadPageChunkData;

const Home = () => (
  <div
    style={{
      maxWidth: 708,
      margin: "0 auto",
      color: "rgb(55, 53, 47)",
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`
    }}
  >
    <NotionRenderer blockMap={blockMap} />
  </div>
);

export default Home;
