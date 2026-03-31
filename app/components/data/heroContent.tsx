import { contentfulClient } from "@/lib/contentful";

export default async function heroContent(contentType = "", limit = 0) {
  const client = contentfulClient;
  
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