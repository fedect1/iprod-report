import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iprod",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` h-screen  ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
            <AppSidebar/>
          <div className="flex-1 w-full text-black">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
