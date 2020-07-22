import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import fetch from "node-fetch";

export async function getServerSideProps(context) {
  const pageId = context.params?.pageId;

  if (!pageId) {
    return;
  }

  const data: BlockMapType = await fetch(
    `https://notion-api.splitbee.io/v1/page/${pageId}`
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    }
  };
}

const NotionPage = ({ blockMap }) => {
  if (!blockMap || Object.keys(blockMap).length === 0) {
    return (
      <div>
        <h3>No data found.</h3>
        <div> Make sure the pageId is valid.</div>
        <div>Only public pages are supported in this example.</div>
      </div>
    );
  }

  const title =
    blockMap[Object.keys(blockMap)[0]]?.value.properties.title[0][0];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <NotionRenderer blockMap={blockMap} fullPage />
    </>
  );
};

export default NotionPage;
