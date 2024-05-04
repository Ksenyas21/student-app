import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'ru'];

export default createIntlMiddleware({
    locales,
    defaultLocale: 'en',
    localePrefix: 'always',
});

export const config = {
    matcher: ['/', '/(en|ru)/:path*']
};
