import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-arena px-6 py-16">
      <p className="font-script text-3xl text-medianoche">PZB.</p>
      <SignIn />
    </div>
  );
}
