import { createClient } from "contentful";

export default async function heroContent() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })
  
  try {
    const res = await client.getEntries({ content_type: "heroContent", limit: 1 });
    return res.items[0] || null;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}