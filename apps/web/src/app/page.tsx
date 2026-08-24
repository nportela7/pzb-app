import { searchMembers } from "@/lib/members";
import { LandingPage } from "./LandingPage";

export default async function Home() {
  const members = await searchMembers("");
  const reelMembers = members
    .filter((m) => !!m.profession)
    .slice(0, 8)
    .map((m) => ({ name: m.name, profession: m.profession! }));

  return <LandingPage members={reelMembers} />;
}
