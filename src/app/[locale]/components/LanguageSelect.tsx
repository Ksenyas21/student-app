"use client"

import {useLocale} from "use-intl";
import {usePathname} from "next/navigation";
import {createSharedPathnamesNavigation} from "next-intl/navigation";

export const LANGUAGES: Language[] = [
    { value: 'en', label: 'EN' },
    { value: 'ru', label: 'RU' }
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
            <div className="grid grid-cols-2 divide-x font-mono text-sm text-center font-bold leading-6 rounded-lg shadow-lg overflow-hidden">
            {LANGUAGES.map((language) => (
                <h4 className="py-2 px-4 text-black bg-yellow-400 cursor-pointer hover:bg-yellow-100 transition-colors"
                    onClick={() => setLocale(language.value)}
                    key={language.value} >
                    {language.label}
                </h4>
            ))}
            </div>
        </header>
    );
}
export default LanguageSelect;
