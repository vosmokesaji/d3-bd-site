import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "圣休亚瑞秘典｜暗黑破坏神 III 单人攻略站";
  const description = "Nintendo Switch 第39赛季全职业单人BD、开荒流程、剧情路线和暴雪官方元素资料库。";

  return {
    metadataBase,
    title,
    description,
    icons: {
      icon: "/d3/death-nova.png",
      shortcut: "/d3/death-nova.png",
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "圣休亚瑞秘典：暗黑破坏神 III 单人攻略站" }],
      locale: "zh_CN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
