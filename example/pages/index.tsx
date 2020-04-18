import { NotionRenderer, LoadPageChunkData } from "react-notion";
import pageData from "../mock/page.json";

const {
  recordMap: { block: blockMap }
} = pageData as LoadPageChunkData;

const Home = () => (
  <div style={{ maxWidth: 760, margin: "0 auto" }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);

export default Home;
