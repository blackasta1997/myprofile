import HeroContentDisplay from "./components/display/heroContentdisplay";
import SmallFeature from "./components/display/smallFeature";
import MeetSpecialists from "./components/display/meetSpecialists";
import AppointmentCTA from "./components/display/AppointmentCTA";

export default function Home() {
  return (
    <main>
      <HeroContentDisplay />
      <SmallFeature />
      <MeetSpecialists />
      <AppointmentCTA />
    </main>
  );
}
