import type { Metadata } from "next";
import { Jost, Cormorant, Cedarville_Cursive } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import "./globals.css";

// Jost stands in for Futura (paragraphs, subtitles) and Cormorant for The
// Seasons / Ivy Ora (titles) until the commercial fonts are licensed.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  // 700 is kept for large display text; without it the browser fakes the bold.
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    colorPrimary: "#0e627f",
    colorBackground: "#f7f0e5",
    colorForeground: "#0e627f",
    colorMutedForeground: "#5b5b5b",
    colorInput: "#ffffff",
    colorInputForeground: "#0e627f",
    colorNeutral: "#0e627f",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-jost), ui-sans-serif, sans-serif",
  },
  elements: {
    cardBox: {
      boxShadow: "none",
      border: "1px solid #9bc7ec",
    },
    card: {
      backgroundColor: "#f7f0e5",
    },
    headerTitle: {
      fontFamily: "var(--font-cormorant), Georgia, serif",
      fontWeight: 400,
      color: "#0e627f",
    },
    headerSubtitle: {
      color: "#5b5b5b",
    },
    formButtonPrimary: {
      fontFamily: "var(--font-jost), ui-sans-serif, sans-serif",
      textTransform: "none",
      fontSize: "0.875rem",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#0e627f",
      },
    },
    footer: {
      backgroundColor: "#f7f0e5",
    },
    footerActionLink: {
      color: "#0e627f",
    },
    dividerLine: {
      backgroundColor: "#9bc7ec",
    },
    formFieldInput: {
      borderColor: "#9bc7ec",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={clerkAppearance} localization={esMX}>
      <html
        lang="es"
        className={`${cormorant.variable} ${jost.variable} ${cedarville.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
