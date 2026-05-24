import type { Metadata } from "next";
import { Toaster } from "sonner";

import { APP_NAME } from "@/lib/constants/app";

import "./globals.css";
import "yet-another-react-lightbox/styles.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "记录两个朋友一起去过的地方和经历过的事情"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
