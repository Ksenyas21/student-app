"use client"
import {useTranslations} from "use-intl";

const MainPage = () => {
    const t = useTranslations()
    return (
        <div>
        <h1>{t('label')}</h1>
        </div>
    );
}
export default MainPage;
