import data from "./data/data";

export default async function Home() {
  const testContent = await data();
  console.log(testContent);
  return (
    <main>
      {process.env.CONTENTFUL_SPACE_ID}
    </main>
  );
}
