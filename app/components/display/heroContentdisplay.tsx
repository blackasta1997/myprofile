import Image from "next/image";
import heroContent from "../data/heroContent";
import SignUpButton from "./SignUpButton";

const HeroContentDisplay = async () => {
  const heroValues = await heroContent("heroContent", 1);
  const heroValue = heroValues && heroValues.length > 0 ? heroValues[0] : null;
  
  if (!heroValue) {
    return <section className="relative h-screen bg-gray-50 overflow-hidden"></section>;
  }

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
  }
  const heroImage = heroImageUrl;
  
  return (
    <section className="relative h-screen bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 hidden lg:block">
        <Image src={`https:${heroImage}`} alt={String(description)} fill className="object-cover object-right" priority sizes="100vw" />
        <svg viewBox="0 0 1962 178" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="absolute inset-0 w-full h-full opacity-75" preserveAspectRatio="none">
          <path fill="#FFFFFF" d="M 0 0 H 629 C 1213 35 1033 212 708 253 H 1 L 0 186 Z" strokeWidth="0"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl px-6 sm:px-12 lg:px-16 h-screen flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="uppercase leading-snug text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-gray-900 animate-fadeInUp">{String(title)}</h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-sm leading-relaxed animate-fadeInUp">{String(heroTextH2)}</p>
          {displayAppointButton && (
            <div className="animate-fadeInUp">
              <SignUpButton label={String(displayAppointButton)} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroContentDisplay
