import Image from "next/image";
import heroContent from "../data/heroContent"

const HeroContentDisplay = async () => {
  const heroValue = await heroContent();
  const title = heroValue?.fields?.title;
  const heroTextH2 = heroValue?.fields?.heroTextH2;
  const displayAppointButton = heroValue?.fields?.displayAppointButton ? "SCHEDULE APPOINTMENT" : null;
  
  let heroImageUrl = "";
  let description = "";
  const heroImageField = heroValue?.fields?.heroImage;
  if (typeof heroImageField === "string") {
    heroImageUrl = heroImageField;
  } else if (heroImageField && typeof heroImageField === "object" && "fields" in heroImageField) {
    heroImageUrl = (heroImageField as any)?.fields?.file?.url || heroImageUrl;
    description = (heroImageField as any)?.fields?.description || "";
    console.log(heroImageField);
  }
  console.log("Hero Image URL:", description);
  const heroImage = heroImageUrl;

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden pt-20">
      <div className="absolute inset-0 hidden lg:block">
        <Image src={`https:${heroImage}`} alt={ String(description)} fill className="object-cover object-right" priority sizes="100vw"/>
      </div>
      <div className="relative z-10 max-w-7xl px-6 sm:px-12 lg:px-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-9xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-gray-900">{String(title)}</h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-sm leading-relaxed">{String(heroTextH2)}</p>
          {displayAppointButton && (
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:shadow-lg uppercase text-sm tracking-wider">
                {String(displayAppointButton)}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroContentDisplay
