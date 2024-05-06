"use client"

import {useLocale} from "use-intl";
import {usePathname} from "next/navigation";
import {createSharedPathnamesNavigation} from "next-intl/navigation";

interface Language {
    label: string;
    value: string;
}

export const LANGUAGES: Language[] = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' }
];


export const { useRouter } = createSharedPathnamesNavigation({ locales: ['en', 'ru'] });

const LanguageSelect = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();

    const setLocale = (newLocale: string) => {
        router.push(pathName.split(locale)[0], {locale: newLocale});
    }

    return (
        <header>
            {LANGUAGES.map((language) => (
                <button
                    onClick={() => setLocale(language.value)}
                    key={language.value}
                >
                    {/*<Image*/}
                    {/*    src={"/svgs/flags/" + language.value + ".svg"}*/}
                    {/*    width={24}*/}
                    {/*    height={24}*/}
                    {/*    alt="language"*/}
                    {/*/>*/}

                    {language.label}
                </button>
            ))}
        </header>
    );
}
export default LanguageSelect;
