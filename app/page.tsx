import data from "./data/data";

export default async function Home() {
  const testContent = await data();
  return (
    <main>
      <div className="container">
        {testContent.map((content) => (
          <div key={content.sys.id}>
            <h2>{String(content.fields.title)}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
