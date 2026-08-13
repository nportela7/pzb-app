import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, Cedarville_Cursive } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cedarville = Cedarville_Cursive({
  variable: "--font-cedarville",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pilar Zambrano B.",
  description: "Styling your life. Your own way.",
};

const clerkAppearance = {
  variables: {
    colorPrimary: "#594434",
    colorBackground: "#F9F7F2",
    colorForeground: "#363636",
    colorMutedForeground: "#64747D",
    colorInput: "#FFFFFF",
    colorInputForeground: "#363636",
    colorNeutral: "#363636",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-source-sans), ui-sans-serif, sans-serif",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html
        lang="es"
        className={`${fraunces.variable} ${sourceSans.variable} ${cedarville.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
