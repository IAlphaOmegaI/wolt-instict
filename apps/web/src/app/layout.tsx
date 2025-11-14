import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zenncore",
  description: "A modern React UI library with Tailwind CSS support",
};

export default ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className={`${geist.variable} bg-background font-body antialiased`}>
        <div className="isolate">{children}</div>
      </body>
    </html>
  );
};
