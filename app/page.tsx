import Image from "next/image";
import Link from "next/link";
import ProductCards from "./components/ProductCards";

export default function Home() {
  return (
    <main>
      <h1>Hello, World!</h1>
      <Link href="/users">Go to Users Page</Link>
      <ProductCards />
    </main>
  );
}
