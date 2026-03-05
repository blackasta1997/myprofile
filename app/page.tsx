import data from "./data/data";

export default async function Home() {
  const testContent = await data();
  return (
    <main>
      <div className="container">
        {testContent.map((content) => (
          <div key={content.sys.id}>
            <h2>{content.fields.title}</h2>
            <p>{content.fields.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
