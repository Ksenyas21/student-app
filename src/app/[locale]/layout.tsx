import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { notFound } from "next/navigation";
import { Providers } from "@/app/lib/provider";
import "../styles/globals.css";
import "../styles/layout.scss";
import Header from "@/app/[locale]/components/Header";
import { Toaster } from "@/components/ui/toaster";

const locales = ["en", "ru"];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html className="h-full">
      <body>
        <main className="relative flex flex-col min-h-screen background">
          <Providers>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />
              {children}
            </NextIntlClientProvider>
          </Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}
