import { createClient } from "contentful";

export default async function data() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })
  const res = await client.getEntries({ content_type: "testContent" });
  const testContent = res.items;
  return testContent;
}