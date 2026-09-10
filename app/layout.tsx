import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { I18nProvider } from "./i18n/I18nProvider";
import { createTranslator, localeFromCookie, HTML_LANG } from "./i18n/core";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const { tr } = createTranslator(localeFromCookie(requestHeaders.get("cookie")));
  const title = tr("圣休亚瑞秘典｜暗黑破坏神 III 单人攻略站");
  const description = tr("Nintendo Switch 第39赛季全职业单人BD、开荒流程、剧情路线和暴雪官方元素资料库。");

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
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
      locale: HTML_LANG[localeFromCookie(requestHeaders.get("cookie"))].replace("-", "_"),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = localeFromCookie((await headers()).get("cookie"));
  return (
    <html lang={HTML_LANG[locale]}>
      <body><I18nProvider initialLocale={locale}>{children}</I18nProvider></body>
    </html>
  );
}
