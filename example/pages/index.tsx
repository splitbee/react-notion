import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import Link from "next/link";
import fetch from "node-fetch";

export async function getStaticProps() {
  const data: BlockMapType = await fetch(
    "https://notion-api.splitbee.io/v1/page/2e22de6b770e4166be301490f6ffd420"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    },
    revalidate: 1
  };
}

const Home = ({ blockMap }) => (
  <div>
    <Head>
      <style>{`body { margin: 0;}`}</style>
      <title>react-notion example</title>
    </Head>
    <NotionRenderer
      blockMap={blockMap}
      fullPage
      hideHeader
      customBlockComponents={{
        page: ({ blockValue, renderComponent }) => (
          <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
        )
      }}
    />
  </div>
);

export default Home;
