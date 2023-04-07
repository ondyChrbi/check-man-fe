import {useTranslation} from "react-i18next";
import React from "react";

const Logo = () => {
    const {t} = useTranslation();

    return <div className="flex flex-col items-start justify-center">
        <div className="flex flex-row">
            <object className="w-8 h-8 fill-white mr-2" data="/pages/fingerprint.svg" type="image/svg+xml"/>
            <h1 className="font-roboto text-teal-600 text-2xl uppercase font-bold text-center">{t('application.name')}</h1>
        </div>
    </div>
}

export default Logo;