import type { Metadata } from "next";
import "./globals.css";
import { ProjectProvider } from "@/context/ProjectContext";
import { ToastProvider } from "@/components/ToastNotifications";
import { Space_Grotesk, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "DoodleDirector",
  description: "Doodle your scenes, direct the vibes."
};

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} min-h-screen bg-velvetNavy text-offWhite antialiased`}>
        <ProjectProvider>
          <ToastProvider>{children}</ToastProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
