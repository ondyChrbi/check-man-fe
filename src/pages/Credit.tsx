import React from "react";
import {useTranslation} from "react-i18next";

const Credit = () => {
    const {t} = useTranslation();

    return <div className="flex flex-col w-full p-5">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('credit.title')}</h1>
        <a href="https://www.flaticon.com/free-icons/fingerprint" title="fingerprint icons">Fingerprint icons created by Google - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/finish" title="finish icons">Finish icons created by yut1655 - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/kick" title="kick icons">Kick icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/test" title="test icons">Test icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/steam" title="steam icons">Steam icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/3d-cube" title="3d cube icons">3d cube icons created by Freepik - Flaticon</a>
    </div>
};

export default Credit;