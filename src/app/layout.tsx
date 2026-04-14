import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solaris Shop — Flutter App Showcase",
  description:
    "A Material Design 3 mobile e-commerce app inside a phone frame. Built with Flutter 3 + Dart.",
  openGraph: {
    title: "Solaris Shop — Flutter App Showcase",
    description: "Flutter mobile app preview.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
