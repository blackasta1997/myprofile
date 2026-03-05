import Image from "next/image";
import heroContent from "../data/heroContent"

const HeroContentDisplay = async () => {
  const heroValue = await heroContent();
  console.log("Fetched Hero Content:", heroValue);
  
  const title = heroValue?.fields?.title || "WE SPECIALIZE IN COMPASSIONATE PRIMARY & SPECIALIZED MEDICAL CARE.";
  const description = heroValue?.fields?.description || "Lumina Health: Your trusted partner for modern healthcare. Schedule your visit today.";
  const ctaText = heroValue?.fields?.ctaText || "SCHEDULE APPOINTMENT";
  
  let heroImageUrl = "/images/landingPage/heroImage.png";
  const heroImageField = heroValue?.fields?.heroImage;
  if (typeof heroImageField === "string") {
    heroImageUrl = heroImageField;
  } else if (heroImageField && typeof heroImageField === "object" && "fields" in heroImageField) {
    heroImageUrl = (heroImageField as any)?.fields?.file?.url || heroImageUrl;
  }
  const heroImage = heroImageUrl;

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden pt-20">
      <div className="absolute inset-0 hidden lg:block">
        <Image src={`https:${heroImage}`} alt="Healthcare professionals" fill className="object-cover object-right" priority sizes="100vw"/>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            {String(title)}
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-sm leading-relaxed">
            {String(description)}
          </p>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:shadow-lg uppercase text-sm tracking-wider">
              {String(ctaText)}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroContentDisplay
