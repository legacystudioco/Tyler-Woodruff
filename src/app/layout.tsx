import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Anton } from "next/font/google";
import { MotionConfig } from "motion/react";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Tyler Woodruff — Creative Technologist",
  description:
    "I design and build digital products, intelligent systems, brands, and experiences—taking ideas from concept to working reality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} ${anton.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-paper antialiased">
        <MotionConfig reducedMotion="user">
          <Navigation />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
