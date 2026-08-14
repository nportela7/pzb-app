import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, Cedarville_Cursive } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
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
  elements: {
    cardBox: {
      boxShadow: "none",
      border: "1px solid #DAD2C1",
    },
    card: {
      backgroundColor: "#F9F7F2",
    },
    headerTitle: {
      fontFamily: "var(--font-fraunces), Georgia, serif",
      fontWeight: 400,
      color: "#594434",
    },
    headerSubtitle: {
      color: "#64747D",
    },
    formButtonPrimary: {
      fontFamily: "var(--font-source-sans), ui-sans-serif, sans-serif",
      textTransform: "none",
      fontSize: "0.875rem",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#363636",
      },
    },
    footer: {
      backgroundColor: "#F9F7F2",
    },
    footerActionLink: {
      color: "#594434",
    },
    dividerLine: {
      backgroundColor: "#DAD2C1",
    },
    formFieldInput: {
      borderColor: "#DAD2C1",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={clerkAppearance} localization={esMX}>
      <html
        lang="es"
        className={`${fraunces.variable} ${sourceSans.variable} ${cedarville.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
