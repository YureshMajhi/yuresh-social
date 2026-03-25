import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuresh-Social",
  description: "yuresh social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{
            backgroundImage: "url('/login-bg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <div className="z-10">{children}</div>
      </body>
    </html>
  );
}

