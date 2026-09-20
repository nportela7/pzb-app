import { searchMembers } from "@/lib/members";
import { listUpcomingEvents } from "@/lib/events";
import { toEventBanner } from "@/lib/event-banner";
import { LandingPage } from "./LandingPage";

export default async function Home() {
  const members = await searchMembers("");
  const reelMembers = members
    .filter((m) => !!m.profession)
    .slice(0, 8)
    .map((m) => ({ name: m.name, profession: m.profession! }));

  // The banner carousel is the only event surface on this page now. Dates are
  // formatted here, on the server, so the client component never has to touch
  // a Date across the boundary.
  const events = await listUpcomingEvents();
  const eventBanners = events.slice(0, 6).map(toEventBanner);

  return <LandingPage members={reelMembers} eventBanners={eventBanners} />;
}
