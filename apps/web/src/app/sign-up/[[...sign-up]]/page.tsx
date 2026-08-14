import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-cream px-6 py-16">
      <p className="font-script text-3xl text-earth-brown">PZB.</p>
      <SignUp />
    </div>
  );
}
