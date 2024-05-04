"use client"

import {useTranslations} from "use-intl";

const Home = () => {
    const t = useTranslations();
    return (
        <div>{t('label')}</div>
    )
}
export default Home;
