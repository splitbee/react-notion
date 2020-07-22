import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import fetch from "node-fetch";

export async function getStaticProps() {
  const data: BlockMapType = await fetch(
    "https://notion-api.splitbee.io/v1/page/2e22de6b770e4166be301490f6ffd420"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    }
  };
}

const fullPage = false;
const style = fullPage
  ? undefined
  : {
      maxWidth: 720,
      margin: "0 auto"
    };

const Home = ({ blockMap }) => (
  <div style={style}>
    <Head>
      <title>react-notion example</title>
    </Head>

    <NotionRenderer blockMap={blockMap} fullPage={fullPage} />

    {/* Alternative example of testing darkMode with fullPage */}
    {/* <NotionRenderer blockMap={blockMap} fullPage={fullPage} darkMode /> */}
  </div>
);

export default Home;
