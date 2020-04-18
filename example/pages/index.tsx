import { NotionRenderer } from "react-notion";
import pageData from "../mock/page.json";
const Home = () => (
  <div style={{ maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
    <NotionRenderer
      level={0}
      blockMap={(pageData.recordMap.block as any) || []}
      currentID={"79c956db-2466-4214-8f15-fcfbf12b14d3"}
    />
  </div>
);

export default Home;
