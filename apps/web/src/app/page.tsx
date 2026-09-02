import { searchMembers } from "@/lib/members";
import { listUpcomingEvents } from "@/lib/events";
import { EVENT_TYPE_LABELS } from "@/models/event";
import { LandingPage } from "./LandingPage";

export default async function Home() {
  const members = await searchMembers("");
  const reelMembers = members
    .filter((m) => !!m.profession)
    .slice(0, 8)
    .map((m) => ({ name: m.name, profession: m.profession! }));

  // The next real date on the calendar is the only honest urgency this page
  // has. Nothing is rendered when there isn't one.
  const [nextEvent] = await listUpcomingEvents();

  return (
    <LandingPage
      members={reelMembers}
      nextEvent={
        nextEvent
          ? {
              title: nextEvent.title,
              // ObjectId and Date don't cross into a client component.
              startsAt: nextEvent.startsAt.toISOString(),
              typeLabel: EVENT_TYPE_LABELS[nextEvent.type],
              location: nextEvent.location ?? null,
              isOnline: nextEvent.isOnline,
            }
          : null
      }
    />
  );
}
