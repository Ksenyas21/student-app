import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import React from 'react';
import {notFound} from 'next/navigation';
import Layout from '@/app/[locale]/components/Layout';
import {Providers} from "@/app/lib/provider";

const inter = Inter({subsets: ['latin']});

const locales = ['en', 'ru'];

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

export default async function LocaleLayout({
                                               children,
                                               params: {locale},
                                           }: LocaleLayoutProps) {
    // Validate that the incoming `locale` parameter is a valid locale
    const isValidLocale = locales.some(cur => cur === locale);
    if (!isValidLocale) {
        notFound();
    }

    //unstable_setRequestLocale(locale);

    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html className="h-full" lang={locale}>
            <body className={`'relative h-full font-sans antialiased bg-white dark:bg-black ${inter.className}`}>
            <Providers>
                <NextIntlClientProvider locale={locale} messages={messages}>
                        <Layout>{children}</Layout>
                </NextIntlClientProvider>
            </Providers>
            </body>
        </html>
    );
}
export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "ru" }];
}
