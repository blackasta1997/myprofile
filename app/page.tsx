import HeroContentDisplay from "./components/display/heroContentdisplay";
import SmallFeature from "./components/display/smallFeature";
import MeetSpecialists from "./components/display/meetSpecialists";
// import SpecialistDisplay from "./components/display/specialistDisplay";

export default function Home() {
  return (
    <main>
      <HeroContentDisplay />
      <SmallFeature />
      <MeetSpecialists />
      {/* <SpecialistDisplay /> */}
    </main>
  );
}
