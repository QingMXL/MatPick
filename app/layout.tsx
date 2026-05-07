import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "拾材集 MatPick",
  description: "面向酒店与商业空间设计师的材料协同平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
