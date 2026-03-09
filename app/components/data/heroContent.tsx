import { createClient } from "contentful";

export default async function heroContent(contentType = "", limit = 0) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })
  
  try {
    const query: any = { content_type: contentType };
    if (limit > 0) {
      query.limit = limit;
    }
    const res = await client.getEntries(query);
    return res.items || [];
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}